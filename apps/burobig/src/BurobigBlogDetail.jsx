import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSite } from './layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';
import { getPublishedBlogBySlug } from '../../services/publicContentService';
import { resolveField } from '@coreweb/shared-ui';
import { Calendar, ChevronLeft } from 'lucide-react';

export default function BurobigBlogDetail() {
  const { slug } = useParams();
  const { tenantMapping, activeLang, setActivePageTranslations } = useSite();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocalizedPath = (path) => `/${activeLang}${path}`;
  const translate = (tr, en) => (activeLang === 'tr' ? tr : en);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const ts = dateStr?.seconds ? dateStr.seconds * 1000 : new Date(dateStr).getTime();
    try {
      return new Date(ts).toLocaleDateString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return ''; }
  };

  useEffect(() => {
    const tenantId = tenantMapping?.tenantId || 'burobig';
    getPublishedBlogBySlug(tenantId, slug, activeLang)
      .then((data) => {
        if (data) {
          const localized = {
            ...data,
            title: resolveField(data, activeLang, 'title') || resolveField(data, activeLang, 'name') || '',
            summary: resolveField(data, activeLang, 'summary') || '',
            content: resolveField(data, activeLang, 'content') || '',
          };
          setBlog(localized);
        } else {
          setBlog(null);
        }
      })
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug, activeLang, tenantMapping]);

  useEffect(() => {
    if (blog) {
      updateSEOMeta({
        title: `${blog.title} | Bürobig Blog`,
        description: blog.summary || '',
        companyName: ''
      });

      // Set translations mapping for language switching
      const slugMap = {
        tr: resolveField(blog, 'tr', 'slug') || blog.slug || blog.id,
        en: resolveField(blog, 'en', 'slug') || blog.slug || blog.id,
        ar: resolveField(blog, 'ar', 'slug') || blog.slug || blog.id,
      };
      if (setActivePageTranslations) {
        setActivePageTranslations(slugMap);
      }
    }
  }, [blog, activeLang, setActivePageTranslations]);

  if (loading) {
    return (
      <main id="main-content" style={{ minHeight: '75vh' }} />
    );
  }

  if (!blog) {
    return (
      <main id="main-content" className="blog-detail-page">
        <div className="blog-detail-container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
          <h2 className="blog-detail-notfound-title">{translate('Yazı Bulunamadı', 'Article Not Found')}</h2>
          <p className="blog-detail-notfound-desc">{translate('Aradığınız blog yazısı mevcut değil veya yayından kaldırılmış.', 'The blog post you are looking for does not exist or has been unpublished.')}</p>
          <Link to={getLocalizedPath('/blog')} className="blog-detail-back-link" style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ChevronLeft size={16} />
            <span>{translate('Tüm Yazılara Dön', 'Back to All Articles')}</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="blog-detail-page">
      <div className="blog-detail-container">
        {/* Article Header */}
        <header className="blog-detail-header">
          {blog.category && <span className="blog-detail-meta-tag">{blog.category}</span>}
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <Calendar className="h-4 w-4" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            <span>{formatDate(blog.createdAt || blog.publishDate)}</span>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImageUrl && (
          <div className="blog-detail-cover-wrapper">
            <img src={blog.coverImageUrl} alt={blog.title} className="blog-detail-cover-img" />
          </div>
        )}

        {/* Article Content */}
        <article className="blog-detail-content-wrapper">
          <div 
            className="blog-detail-prose"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </main>
  );
}
