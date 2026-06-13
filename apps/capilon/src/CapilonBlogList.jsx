import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';
import { capilonBlogData } from './capilonBlogData';

export default function CapilonBlogList() {
  const { tenantMapping, activeLang } = useSite();

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'İlham Veren Fikirler | Capilon Mobilya Blog' : 'Inspirational Ideas | Capilon Furniture Blog',
      description: activeLang === 'tr'
        ? 'Evinizi dönüştürecek minimalist dekorasyon fikirleri, 2026 renk trendleri ve koltuk seçim rehberleri ile ilham alın.'
        : 'Get inspired with minimalist decoration ideas, 2026 color trends, and sofa selection guides to transform your home.',
      companyName: 'Capilon Mobilya'
    });
  }, [activeLang]);

  const categories = [
    { key: 'ALL', label: translate('Tümü', 'All') },
    { key: 'DEKORASYON', label: translate('Dekorasyon', 'Decoration') },
    { key: 'TRENDLER', label: translate('Trendler', 'Trends') },
    { key: 'REHBER', label: translate('Rehber', 'Guide') },
  ];

  const filteredPosts = activeCategory === 'ALL'
    ? capilonBlogData
    : capilonBlogData.filter(post => post.category === activeCategory);

  return (
    <div className="blog-page-wrapper">
      {/* Blog Hero Header */}
      <section className="blog-hero-section">
        <div className="blog-container">
          <div className="blog-hero-content">
            <h1 className="blog-hero-title">{translate('İlham Veren Fikirler', 'Inspirational Ideas')}</h1>
            <p className="blog-hero-subtitle">
              {translate('Evinizi dönüştürecek dekorasyon ipuçları ve en yeni trendler.', 'Decoration tips and newest trends to transform your home.')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content Section */}
      <section className="blog-content-section">
        <div className="blog-container">
          {/* Category Filter Tabs */}
          <div className="blog-filters">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="blog-page-grid">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={getLocalizedPath(`/blog/${post.slug}`)}
                className="blog-grid-card"
              >
                <div className="card-image-wrapper">
                  <img
                    src={post.image}
                    alt={translate(post.titleTr, post.titleEn)}
                    className="card-image"
                    loading="lazy"
                  />
                  <span className="card-category-badge">
                    {translate(post.categoryTr, post.categoryEn)}
                  </span>
                </div>
                <div className="card-details">
                  <span className="card-date">{translate(post.dateTr, post.dateEn)}</span>
                  <h2 className="card-title">{translate(post.titleTr, post.titleEn)}</h2>
                  <p className="card-excerpt">{translate(post.excerptTr, post.excerptEn)}</p>
                  <div className="card-read-more">
                    <span>{translate('Devamını Oku', 'Read More')}</span>
                    <svg
                      className="read-more-arrow"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div style={{ height: '150px', backgroundColor: 'transparent', width: '100%' }}></div>
    </div>
  );
}
