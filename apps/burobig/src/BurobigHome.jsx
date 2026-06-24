import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';
import BurobigEcoBanner from './BurobigEcoBanner';
import { getSliders, getActiveProducts } from '../../services/publicContentService';
import { updateSEOMeta } from '../../utils/seo';
import { resolveField } from '@coreweb/shared-ui';

const DEFAULT_SLIDES = [];

function normalizeSlide(slide, activeLang) {
  const getField = (fieldBase) => {
    if (activeLang === 'tr') {
      return slide[`${fieldBase}_tr`] || slide[fieldBase] || '';
    }
    return slide[`${fieldBase}_en`] || slide[`${fieldBase}_tr`] || slide[fieldBase] || '';
  };

  const title = getField('title') || getField('headline') || '';
  const description = getField('description') || getField('subtitle') || '';
  const image = slide.image || slide.imageUrl || slide.backgroundImage || '';
  const ctaLabel = getField('ctaLabel') || getField('buttonText') || (activeLang === 'tr' ? 'Keşfet' : 'Discover');
  const ctaHref = slide.ctaHref || slide.link || '#';
  const eyebrow = getField('eyebrow') || getField('category') || getField('tag') || '';
  const id = slide.id || Math.random().toString();
  const isInternalLink = ctaHref.startsWith('/') && !ctaHref.startsWith('http');
  
  return { id, eyebrow, title, description, image, ctaLabel, ctaHref, isInternalLink };
}

export default function BurobigHome() {
  const { tenantMapping, activeLang, settings } = useSite();
  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [latestProducts, setLatestProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch latest products from Firestore
  useEffect(() => {
    getActiveProducts(tenantMapping.tenantId)
      .then((raw) => {
        if (raw && raw.length > 0) {
          const sorted = [...raw].sort((a, b) => {
            const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
            const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
            return timeB - timeA;
          });
          const latest = sorted.slice(0, 20).map(p => ({
            ...p,
            title: resolveField(p, activeLang, 'title') || resolveField(p, activeLang, 'name') || '',
            slug: resolveField(p, activeLang, 'slug') || p.slug || p.id,
          }));
          setLatestProducts(latest);
        } else {
          setLatestProducts([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching latest products:', err);
        setLatestProducts([]);
      });
  }, [tenantMapping.tenantId, activeLang]);

  // Handle responsiveness for visible product count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, latestProducts.length - visibleCount);

  // Clamping currentIndex on product list or visible count changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Auto-play product carousel
  useEffect(() => {
    if (latestProducts.length <= visibleCount || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, [latestProducts.length, visibleCount, maxIndex, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Fetch published blogs from Firestore
  useEffect(() => {
    import('./blogService').then(({ getPublishedBlogs }) => {
      getPublishedBlogs()
        .then(raw => {
          const localized = raw.map(b => ({
            ...b,
            title: resolveField(b, activeLang, 'title') || resolveField(b, activeLang, 'name') || '',
            summary: resolveField(b, activeLang, 'summary') || '',
            slug: resolveField(b, activeLang, 'slug') || b.slug || b.id,
          }));
          setBlogs(localized);
        })
        .catch(() => setBlogs([]));
    });
  }, [activeLang]);

  // Set custom document title and description using updateSEOMeta
  useEffect(() => {
    const seoTitle = settings?.seo?.title || (activeLang === 'tr' ? "Premium Mobilya | Modern Ofis ve Yaşam Alanları" : "Premium Furniture | Modern Office & Living Spaces");
    const seoDesc = settings?.seo?.description || (activeLang === 'tr' 
      ? 'Çalışma ve yaşam alanlarınız için ilham veren, zamansız dokunuşlar. Modern ofis ve ev mobilyaları koleksiyonunu keşfedin.'
      : 'Inspiring, timeless touches for your work and living spaces. Discover the modern office and home furniture collection.');
    
    const resolvedCompany = settings?.companyName || 'Bürobig';
    const hasCompany = seoTitle.toLowerCase().includes(resolvedCompany.toLowerCase()) || seoTitle.toLowerCase().includes('burobig');

    updateSEOMeta({
      title: seoTitle,
      description: seoDesc,
      companyName: hasCompany ? '' : resolvedCompany
    });
  }, [settings, activeLang]);

  // Fetch sliders from Firestore
  useEffect(() => {
    getSliders(tenantMapping.tenantId)
      .then((raw) => {
        if (raw && raw.length > 0) {
          // Sort order validation/fallback just in case
          const sorted = [...raw].sort((a, b) => {
            const orderA = typeof a.order === 'number' ? a.order : parseInt(a.order || 0, 10);
            const orderB = typeof b.order === 'number' ? b.order : parseInt(b.order || 0, 10);
            if (orderA !== orderB) return orderA - orderB;
            
            const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
            const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
            return timeA - timeB;
          });
          const normalized = sorted.map(slide => normalizeSlide(slide, activeLang));
          setSlides(normalized);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      })
      .catch(() => {
        setSlides(DEFAULT_SLIDES);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tenantMapping.tenantId, activeLang]);

  // Safe Hero Slider Auto-play
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Safe Intersection Observer for scroll animation reveal-up
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [blogs, slides]);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  const renderSlides = slides.length > 0 ? slides : DEFAULT_SLIDES;

  return (
    <main id="main-content">
        {/* Hero Slider */}
        <section className="hero-section" aria-labelledby="hero-heading" id="hero">
          <div className="hero-slider" id="hero-slider">
            {renderSlides.map((slide, index) => {
              const isActive = activeSlide === index;
              return (
                <div key={slide.id} className={`hero-slide ${isActive ? 'active' : ''}`}>
                  {index === 0 ? (
                    <img
                      src={slide.image}
                      alt={slide.title.replace(/\n/g, ' ')}
                      className="hero-slide-bg"
                      width="1920"
                      height="1080"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                    />
                  ) : (
                    <div
                      className="hero-slide-bg"
                      style={{ backgroundImage: `url('${slide.image}')` }}
                    ></div>
                  )}
                  <div className="hero-content">
                    {slide.eyebrow && (
                      <span
                        className="hero-subtitle"
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          color: 'var(--color-accent)',
                          letterSpacing: '2px',
                          display: 'block',
                          marginBottom: '1rem'
                        }}
                      >
                        {slide.eyebrow}
                      </span>
                    )}
                    {index === 0 ? (
                      <h1 id="hero-heading">
                        {slide.title.split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < slide.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h1>
                    ) : (
                      <h2>
                        {slide.title.split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < slide.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h2>
                    )}
                    <p>{slide.description}</p>
                    {slide.isInternalLink ? (
                      <Link
                        to={getLocalizedPath(slide.ctaHref)}
                        className="btn-primary"
                        id={`hero-cta-${index + 1}`}
                      >
                        {slide.ctaLabel}
                      </Link>
                    ) : (
                      <a
                        href={slide.ctaHref}
                        className="btn-primary"
                        id={`hero-cta-${index + 1}`}
                      >
                        {slide.ctaLabel}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Slider Controls */}
            {renderSlides.length > 1 && (
              <div className="slider-controls">
                {renderSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${activeSlide === index ? 'active' : ''}`}
                    aria-label={`Slayt ${index + 1}`}
                    onClick={() => handleDotClick(index)}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Collections */}
        <section className="collections-section" id="koleksiyonlar" aria-labelledby="collections-heading">
          <div className="collections-wrapper">
            <header className="section-header">
              <span className="section-label reveal-up">Koleksiyonlar</span>
              <h2 id="collections-heading" className="reveal-up delay-100">Her Alan İçin<br />Bir Vizyon</h2>
              <p className="reveal-up delay-200">İhtiyacınıza göre şekillenen, kaliteyle tasarlanan yaşam alanları.</p>
            </header>

            <div className="collections-grid" role="list">
              {/* FEATURED CARD */}
              <article className="collection-card collection-card--featured" role="listitem">
                <Link to={getLocalizedPath('/ust-yonetici-masalari')} className="collection-card__link" id="card-makam" aria-label="Üst Yönetici Masaları koleksiyonunu keşfet">
                  <figure className="collection-card__figure">
                    <img
                      src="/assets/burobig/images/collection-makam.png"
                      alt="Prestijli makam takımı ve yönetici ofisi"
                      width="900"
                      height="1100"
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                  <div className="collection-card__overlay">
                    <div className="collection-card__info">
                      <h3 className="collection-card__title">Üst Yönetici<br />Masaları</h3>
                      <span className="collection-card__cta">
                        Keşfet{' '}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              {/* CARD 2 */}
              <article className="collection-card" role="listitem">
                <Link to={getLocalizedPath('/operasyonel-masalar')} className="collection-card__link" id="card-operasyonel" aria-label="Operasyonel Masalar koleksiyonunu keşfet">
                  <figure className="collection-card__figure">
                    <img
                      src="/assets/burobig/images/collection-operasyonel.png"
                      alt="Modern operasyonel masalar ve açık ofis"
                      width="700"
                      height="550"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="collection-card__overlay">
                    <div className="collection-card__info">
                      <h3 className="collection-card__title">Operasyonel<br />Masalar</h3>
                      <span className="collection-card__cta">
                        Keşfet{' '}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              {/* CARD 3 */}
              <article className="collection-card" role="listitem">
                <Link to={getLocalizedPath('/toplanti-masalari')} className="collection-card__link" id="card-toplanti" aria-label="Toplantı Masaları koleksiyonunu keşfet">
                  <figure className="collection-card__figure">
                    <img
                      src="/assets/burobig/images/collection-toplanti.png"
                      alt="Şık toplantı odası masası"
                      width="700"
                      height="550"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="collection-card__overlay">
                    <div className="collection-card__info">
                      <h3 className="collection-card__title">Toplantı<br />Masaları</h3>
                      <span className="collection-card__cta">
                        Keşfet{' '}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              {/* CARD 4 */}
              <article className="collection-card" role="listitem">
                <Link to={getLocalizedPath('/yonetici-koltuklari')} className="collection-card__link" id="card-koltuklar" aria-label="Yönetici Koltukları koleksiyonunu keşfet">
                  <figure className="collection-card__figure">
                    <img
                      src="/assets/burobig/images/collection-koltuklar.png"
                      alt="Ergonomik yönetici koltukları"
                      width="700"
                      height="550"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="collection-card__overlay">
                    <div className="collection-card__info">
                      <h3 className="collection-card__title">Yönetici<br />Koltukları</h3>
                      <span className="collection-card__cta">
                        Keşfet{' '}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>

              {/* CARD 5 */}
              <article className="collection-card" role="listitem">
                <Link to={getLocalizedPath('/urunler')} className="collection-card__link" id="card-bekleme" aria-label="Bekleme Alanları koleksiyonunu keşfet">
                  <figure className="collection-card__figure">
                    <img
                      src="/assets/burobig/images/collection-bekleme.png"
                      alt="Lüks bekleme salonu ve lobi mobilyaları"
                      width="700"
                      height="550"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="collection-card__overlay">
                    <div className="collection-card__info">
                      <h3 className="collection-card__title">Bekleme<br />Alanları</h3>
                      <span className="collection-card__cta">
                        Keşfet{' '}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* New Products */}
        <section className="products-section" aria-labelledby="new-products-heading">
          <div className="products-wrapper">
            <header className="products-header reveal-up">
              <h2 id="new-products-heading">{activeLang === 'tr' ? 'Yeni Ürünlerimiz' : 'Our New Products'}</h2>
              {latestProducts.length > visibleCount && (
                <div className="carousel-controls">
                  <button className="control-btn prev-btn" onClick={handlePrev} aria-label={activeLang === 'tr' ? 'Önceki Ürün' : 'Previous Product'}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button className="control-btn next-btn" onClick={handleNext} aria-label={activeLang === 'tr' ? 'Sonraki Ürün' : 'Next Product'}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </header>

            {latestProducts.length > 0 ? (
              <div 
                className="products-slider-container reveal-up delay-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div 
                  className="products-slider-track"
                  style={{
                    transform: `translate3d(calc(-1 * ${currentIndex} * (100% + var(--slider-gap)) / ${visibleCount}), 0, 0)`
                  }}
                >
                  {latestProducts.map((product) => {
                    const fallbackImage = '/assets/burobig/images/INKA 01.jpg';
                    return (
                      <article 
                        key={product.id} 
                        className="product-slider-item"
                        style={{
                          flex: `0 0 calc((100% - (${visibleCount} - 1) * var(--slider-gap)) / ${visibleCount})`
                        }}
                      >
                        <Link to={getLocalizedPath(`/urunler/${product.slug}`)} className="product-card__link">
                          <figure className="product-card__figure">
                            <img 
                              src={product.coverImageUrl || fallbackImage} 
                              alt={product.title} 
                              className="product-card__img" 
                              loading="lazy" 
                            />
                          </figure>
                          <div className="product-card__info">
                            <h3 className="product-card__title">{product.title}</h3>
                            <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="no-products-message">
                <p>{activeLang === 'tr' ? 'Ürün bulunamadı.' : 'No products found.'}</p>
              </div>
            )}
          </div>
        </section>

        {/* Award Winning Products */}
        <section className="awards-section reveal-up" aria-labelledby="awards-heading" id="odullu-urunler">
          <div className="awards-container">
            <header className="awards-header">
              <h2 id="awards-heading" className="awards-section-title">{activeLang === 'tr' ? 'Ödüllü Tasarımlar' : 'Award Winning Designs'}</h2>
            </header>

            <div className="awards-grid">
              {/* Award 1: Duet */}
              <article className="award-card">
                <div className="award-card__link">
                  <div className="award-card__image-wrapper">
                    <figure className="award-card__figure">
                      <img src="/assets/burobig/images/award_product_1.jpg" alt="Duet" loading="lazy" className="award-card__img" style={{ '--default-pos': '10%', '--hover-pos': '90%' }} />
                    </figure>
                    <div className="award-card__badge-if">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="if-logo-svg" aria-hidden="true">
                        <rect x="4" y="9" width="3" height="11" fill="white"/>
                        <circle cx="5.5" cy="5" r="1.5" fill="white"/>
                        <rect x="9" y="5" width="3" height="15" fill="white"/>
                        <rect x="12" y="5" width="5" height="2.5" fill="white"/>
                        <rect x="12" y="10.5" width="4" height="2.5" fill="white"/>
                      </svg>
                      <div className="if-divider"></div>
                      <div className="if-award-text">
                        <span className="if-award-title">DESIGN AWARD</span>
                        <span className="if-award-year">2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="award-card__info">
                    <h3 className="award-card__title">Duet</h3>
                    <p className="award-card__subtitle">{activeLang === 'tr' ? 'Tasarım - Klan Studio' : 'Design - Klan Studio'}</p>
                  </div>
                </div>
              </article>

              {/* Award 2: Graf */}
              <article className="award-card">
                <div className="award-card__link">
                  <div className="award-card__image-wrapper">
                    <figure className="award-card__figure">
                      <img src="/assets/burobig/images/award_product_2.jpg" alt="Graf" loading="lazy" className="award-card__img" style={{ '--default-pos': '30%', '--hover-pos': '85%' }} />
                    </figure>
                    <div className="award-card__badge-if">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="if-logo-svg" aria-hidden="true">
                        <rect x="4" y="9" width="3" height="11" fill="white"/>
                        <circle cx="5.5" cy="5" r="1.5" fill="white"/>
                        <rect x="9" y="5" width="3" height="15" fill="white"/>
                        <rect x="12" y="5" width="5" height="2.5" fill="white"/>
                        <rect x="12" y="10.5" width="4" height="2.5" fill="white"/>
                      </svg>
                      <div className="if-divider"></div>
                      <div className="if-award-text">
                        <span className="if-award-title">DESIGN AWARD</span>
                        <span className="if-award-year">2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="award-card__info">
                    <h3 className="award-card__title">Graf</h3>
                    <p className="award-card__subtitle">{activeLang === 'tr' ? 'Tasarım - Klan Studio' : 'Design - Klan Studio'}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Blog */}
        {blogs.length > 0 && (
          <section className="blog-section" id="blog" aria-label="Blog Yazıları">
            <div className="blog-wrapper">
              <header className="blog-header reveal-up">
                <h2 id="blog-heading">Blog Yazılarımız</h2>
              </header>

              <div className="blog-grid">
                {blogs.slice(0, 3).map((blog, idx) => {
                  const detailPath = getLocalizedPath(`/blog/${blog.slug}`);
                  return (
                    <article key={blog.id} className={`blog-card reveal-up delay-${(idx + 1) * 100}`}>
                      <Link to={detailPath} className="blog-card__link">
                        <figure className="blog-card__figure">
                          {blog.coverImageUrl ? (
                            <img src={blog.coverImageUrl} alt={blog.title} className="blog-card__img" loading="lazy" />
                          ) : (
                            <div className="blog-card__placeholder">
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px', color: '#9ca3af' }}>
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                              </svg>
                            </div>
                          )}
                        </figure>
                        <div className="blog-card__content">
                          <h3 className="blog-card__title">{blog.title}</h3>
                          <span className="blog-card__readmore">
                            {activeLang === 'tr' ? 'Hemen İncele' : 'Read More'}{' '}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Sustainability & Eco Section */}
        <BurobigEcoBanner />
      </main>
  );
}
