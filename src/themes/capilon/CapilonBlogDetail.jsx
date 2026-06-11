import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';
import { capilonBlogData } from './capilonBlogData';

export default function CapilonBlogDetail() {
  const { slug } = useParams();
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const post = capilonBlogData.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      updateSEOMeta({
        title: `${activeLang === 'tr' ? post.titleTr : post.titleEn} | Capilon Mobilya Blog`,
        description: activeLang === 'tr' ? post.excerptTr : post.excerptEn,
        companyName: 'Capilon Mobilya'
      });
    }
  }, [post, activeLang]);

  if (!post) {
    return (
      <div className="blog-page-wrapper" style={{ padding: '80px 0', textDecoration: 'none' }}>
        <div className="blog-container" style={{ textAlign: 'center' }}>
          <h1 className="blog-hero-title" style={{ color: '#4a4541' }}>
            {translate('Yazı Bulunamadı', 'Post Not Found')}
          </h1>
          <p style={{ margin: '20px 0' }}>
            {translate('Aradığınız blog yazısı mevcut değil.', 'The blog post you are looking for does not exist.')}
          </p>
          <Link to={getLocalizedPath('/blog')} className="blog-back-btn" style={{ display: 'inline-flex', justifyContent: 'center' }}>
            {translate('Blog Listesine Dön', 'Back to Blog List')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page-wrapper">
      {/* Blog Hero Header */}
      <section className="blog-hero-section">
        <div className="blog-container">
          <div className="blog-hero-content">
            <span className="blog-meta-category">
              {translate(post.categoryTr, post.categoryEn)}
            </span>
            <h1 className="blog-hero-title">
              {translate(post.titleTr, post.titleEn)}
            </h1>
            <span className="blog-meta-date">
              {translate(post.dateTr, post.dateEn)}
            </span>
          </div>
        </div>
      </section>

      {/* Article Container */}
      <section className="blog-detail-container">
        <div className="blog-container">
          {/* Cover Image */}
          <div className="blog-detail-cover">
            <img
              src={post.image}
              alt={translate(post.titleTr, post.titleEn)}
              className="detail-cover-img"
            />
          </div>

          {/* Article Content Area */}
          <div className="blog-detail-content">
            <div
              className="blog-article-prose"
              dangerouslySetInnerHTML={{
                __html: translate(post.contentTr, post.contentEn)
              }}
            />
          </div>

          {/* Footer Back Button */}
          <div className="blog-detail-footer">
            <Link to={getLocalizedPath('/blog')} className="blog-back-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>{translate('Tüm Yazılara Dön', 'Back to All Posts')}</span>
            </Link>
          </div>
        </div>
      </section>
      <div style={{ height: '150px', backgroundColor: 'transparent', width: '100%' }}></div>
    </div>
  );
}
