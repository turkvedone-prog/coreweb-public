import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublishedBlogBySlug } from '../services/publicContentService';
import { getLocalizedContent } from '../utils/i18nContent';
import { useSite } from '../layouts/SiteLayout';
import { Calendar, ChevronLeft, BookOpen, AlertCircle } from 'lucide-react';
import { updateSEOMeta } from '../utils/seo';
import ImageWithFallback from '../components/ImageWithFallback';
import themeRegistry from '../themes/themeRegistry';

export default function BlogDetail() {
  const { slug } = useParams();
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;

  const theme = themeRegistry[tenantSlug];

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(!theme?.BlogDetail);
  const [error, setError] = useState(null);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    if (!tenantId || !slug) return;
    if (theme?.BlogDetail) return;

    const fetchBlogDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await getPublishedBlogBySlug(tenantId, slug, activeLang);
        if (doc) {
          const localized = getLocalizedContent(doc, activeLang);
          setBlog(localized);
        } else {
          setError(activeLang === 'tr' ? 'Aradığınız blog yazısı bulunamadı.' : 'The blog post you are looking for could not be found.');
        }
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setError(activeLang === 'tr' ? 'Blog yazısı yüklenirken bir hata oluştu.' : 'An error occurred while loading the blog post.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [tenantId, slug, activeLang, tenantSlug, theme]);

  // SEO Update
  useEffect(() => {
    if (loading) return;

    if (error || !blog) {
      updateSEOMeta({
        title: activeLang === 'tr' ? 'İçerik Bulunamadı' : 'Content Not Found',
        description: activeLang === 'tr' ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.',
        image: '',
        companyName
      });
      return;
    }
    
    const cleanSummary = blog.summary || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
    updateSEOMeta({
      title: blog.title,
      description: cleanSummary,
      image: blog.coverImageUrl || '',
      companyName
    });
  }, [blog, loading, error, companyName, activeLang]);


  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const formatDate = (dateVal) => {
    if (!dateVal) return '';
    let dateObj;
    if (dateVal.seconds) {
      dateObj = new Date(dateVal.seconds * 1000);
    } else {
      dateObj = new Date(dateVal);
    }
    return dateObj.toLocaleDateString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-500 font-medium">{translate('Yazı yükleniyor...', 'Loading post...')}</p>
        </div>
      </div>
    );
  }


  if (theme?.BlogDetail) {
    const DynamicBlogDetail = theme.BlogDetail;
    return <DynamicBlogDetail />;
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-6">
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl inline-block">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{translate('İçerik Bulunamadı', 'Content Not Found')}</h3>
          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
            {error || translate('Aradığınız sayfa bulunamadı veya yayından kaldırılmış olabilir.', 'The page you are looking for does not exist or may have been unpublished.')}
          </p>
          <div className="pt-4">
            <Link 
              to={getLocalizedPath('/blog')} 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{translate('Blog Yazılarına Dön', 'Back to Blog')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to={getLocalizedPath('/blog')} 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
            <span>{translate('Blog Yazılarına Dön', 'Back to Blog')}</span>
          </Link>
        </div>

        {/* Article Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm p-6 sm:p-10 md:p-12 space-y-8">
          
          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            {blog.category && (
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider">
                {blog.category}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            {blog.isFallback && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg font-medium">
                {translate(`Sadece Türkçe`, `Turkish Only`)}
              </span>
            )}
          </div>

          {/* Title & Summary */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {blog.title}
            </h1>
            {blog.summary && (
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium border-l-4 border-indigo-500 pl-4">
                {blog.summary}
              </p>
            )}
          </div>

          {/* Cover Image */}
          {blog.coverImageUrl && (
            <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-100">
              <ImageWithFallback 
                src={blog.coverImageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover"
                fallbackIcon={BookOpen}
              />
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-indigo max-w-none text-slate-700 leading-relaxed sm:text-lg">
            {blog.content?.startsWith('<') ? (
              // HTML Content rendering safely
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }} 
                className="space-y-6"
              />
            ) : (
              // Plaintext Content rendering with line breaks preserved
              <div className="whitespace-pre-line space-y-6">
                {blog.content}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </article>
  );
}
