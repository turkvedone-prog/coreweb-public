import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';
import BurobigEcoBanner from './BurobigEcoBanner';


export default function BurobigHome() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = 4;

  // Set custom document title and description
  useEffect(() => {
    document.title = "Premium Mobilya | Modern Ofis ve Yaşam Alanları";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Çalışma ve yaşam alanlarınız için ilham veren, zamansız dokunuşlar. Modern ofis ve ev mobilyaları koleksiyonunu keşfedin.');
  }, []);

  

  // Safe Hero Slider Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
  }, []);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };



  return (
    <main id="main-content">
        {/* Hero Slider */}
        <section className="hero-section" aria-labelledby="hero-heading" id="hero">
          <div className="hero-slider" id="hero-slider">
            {/* Slide 1 */}
            <div className={`hero-slide ${activeSlide === 0 ? 'active' : ''}`}>
              <img
                src="/assets/burobig/images/inka_yonetici_slider_bg.png"
                alt="İnka Yönetici Serisi"
                className="hero-slide-bg"
                width="1920"
                height="1080"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
              <div className="hero-content">
                <span className="hero-subtitle" style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-accent)', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>Yeni Koleksiyon</span>
                <h1 id="hero-heading">İnka Yönetici<br />Serisi</h1>
                <p>Prestijli detaylar ve modern çizgilerle üst yönetici alanlarında yeni bir standart.</p>
                <Link to={getLocalizedPath('/ust-yonetici')} className="btn-primary" id="hero-cta-1">Koleksiyonu Keşfet</Link>
              </div>
            </div>

            {/* Slide 2 */}
            <div className={`hero-slide ${activeSlide === 1 ? 'active' : ''}`}>
              <div className="hero-slide-bg" style={{ backgroundImage: "url('/assets/burobig/images/hero-office-1.png')" }}></div>
              <div className="hero-content">
                <h2>Tasarımda<br />Yeni Bir Boyut</h2>
                <p>Çalışma ve yaşam alanlarınız için ilham veren, zamansız dokunuşlar.</p>
                <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-2">Koleksiyonu Keşfet</a>
              </div>
            </div>

            {/* Slide 3 */}
            <div className={`hero-slide ${activeSlide === 2 ? 'active' : ''}`}>
              <div className="hero-slide-bg" style={{ backgroundImage: "url('/assets/burobig/images/hero-office-2.png')" }}></div>
              <div className="hero-content">
                <h2>Sakinliğin<br />Mimarisi</h2>
                <p>Soft tonlar ve minimalist çizgilerle ruhunuzu dinlendiren estetik alanlar.</p>
                <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-3">Koleksiyonu Keşfet</a>
              </div>
            </div>

            {/* Slide 4 */}
            <div className={`hero-slide ${activeSlide === 3 ? 'active' : ''}`}>
              <div className="hero-slide-bg" style={{ backgroundImage: "url('/assets/burobig/images/hero-office-3.png')" }}></div>
              <div className="hero-content">
                <h2>İlham Veren<br />Çalışma Alanları</h2>
                <p>Ergonomi ve estetiğin mükemmel uyumuyla çalışma verimliliğinizi artırın.</p>
                <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-4">Koleksiyonu Keşfet</a>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="slider-controls">
              <button className={`slider-dot ${activeSlide === 0 ? 'active' : ''}`} aria-label="Slayt 1" onClick={() => handleDotClick(0)}></button>
              <button className={`slider-dot ${activeSlide === 1 ? 'active' : ''}`} aria-label="Slayt 2" onClick={() => handleDotClick(1)}></button>
              <button className={`slider-dot ${activeSlide === 2 ? 'active' : ''}`} aria-label="Slayt 3" onClick={() => handleDotClick(2)}></button>
              <button className={`slider-dot ${activeSlide === 3 ? 'active' : ''}`} aria-label="Slayt 4" onClick={() => handleDotClick(3)}></button>
            </div>
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
                <Link to={getLocalizedPath('/ust-yonetici')} className="collection-card__link" id="card-makam" aria-label="Makam Takımları koleksiyonunu keşfet">
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
                      <h3 className="collection-card__title">Makam<br />Takımları</h3>
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
                <Link to={getLocalizedPath('/ofis-koltuklari')} className="collection-card__link" id="card-koltuklar" aria-label="Çalışma Koltukları koleksiyonunu keşfet">
                  <figure className="collection-card__figure">
                    <img
                      src="/assets/burobig/images/collection-koltuklar.png"
                      alt="Ergonomik çalışma koltukları"
                      width="700"
                      height="550"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="collection-card__overlay">
                    <div className="collection-card__info">
                      <h3 className="collection-card__title">Çalışma<br />Koltukları</h3>
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
              <h2 id="new-products-heading">Yeni Ürünlerimiz</h2>
            </header>

            <div className="products-grid">
              {/* Product 1: Elephant */}
              <article className="product-card reveal-up delay-100">
                <Link to={getLocalizedPath('/urunler/elephant')} className="product-card__link">
                  <figure className="product-card__figure">
                    <img src="/assets/burobig/images/product-elephant.png" alt="Elephant Koltuk" className="product-card__img" loading="lazy" />
                  </figure>
                  <div className="product-card__info">
                    <h3 className="product-card__title">Elephant</h3>
                    <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              </article>

              {/* Product 2: Vetra */}
              <article className="product-card reveal-up delay-200">
                <Link to={getLocalizedPath('/urunler/vetra')} className="product-card__link">
                  <figure className="product-card__figure">
                    <img src="/assets/burobig/images/product-vetra.png" alt="Vetra Koltuk" className="product-card__img" loading="lazy" />
                  </figure>
                  <div className="product-card__info">
                    <h3 className="product-card__title">Vetra</h3>
                    <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              </article>

              {/* Product 3: Luci */}
              <article className="product-card reveal-up delay-300">
                <Link to={getLocalizedPath('/urunler/luci')} className="product-card__link">
                  <figure className="product-card__figure">
                    <img src="/assets/burobig/images/product-luci.png" alt="Luci Koltuk" className="product-card__img" loading="lazy" />
                  </figure>
                  <div className="product-card__info">
                    <h3 className="product-card__title">Luci</h3>
                    <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Award Winning Products */}
        <section className="awards-section reveal-up" aria-labelledby="awards-heading" id="odullu-urunler">
          <div className="awards-container">
            <header className="awards-header">
              <h2 id="awards-heading" className="awards-section-title">Ödüllü Tasarımlar</h2>
            </header>

            <div className="awards-grid">
              {/* Award 1: Monolith */}
              <article className="award-card">
                <Link to={getLocalizedPath('/urunler/monolith')} className="award-card__link">
                  <div className="award-card__image-wrapper">
                    <figure className="award-card__figure">
                      <img src="/assets/burobig/images/award_monolith.png" alt="Monolith" loading="lazy" className="award-card__img" />
                    </figure>
                    <div className="award-card__badge">
                      <span className="award-badge-text">RED<br />DOT</span>
                    </div>
                  </div>
                  <div className="award-card__info">
                    <h3 className="award-card__title">Monolith</h3>
                    <p className="award-card__subtitle">Tasarım - A. Baki Çelik</p>
                  </div>
                </Link>
              </article>

              {/* Award 2: İnka */}
              <article className="award-card">
                <Link to={getLocalizedPath('/urunler/inka')} className="award-card__link">
                  <div className="award-card__image-wrapper">
                    <figure className="award-card__figure">
                      <img src="/assets/burobig/images/award_inka.png" alt="İnka" loading="lazy" className="award-card__img" />
                    </figure>
                    <div className="award-card__badge">
                      <span className="award-badge-text">GERMAN<br />AWARD</span>
                    </div>
                  </div>
                  <div className="award-card__info">
                    <h3 className="award-card__title">İnka</h3>
                    <p className="award-card__subtitle">Tasarım - Rıza Özdemir</p>
                  </div>
                </Link>
              </article>

              {/* Award 3: Vetra */}
              <article className="award-card">
                <Link to={getLocalizedPath('/urunler/vetra')} className="award-card__link">
                  <div className="award-card__image-wrapper">
                    <figure className="award-card__figure">
                      <img src="/assets/burobig/images/award_vetra.png" alt="Vetra" loading="lazy" className="award-card__img" />
                    </figure>
                    <div className="award-card__badge">
                      <span className="award-badge-text">GOOD<br />DESIGN</span>
                    </div>
                  </div>
                  <div className="award-card__info">
                    <h3 className="award-card__title">Vetra</h3>
                    <p className="award-card__subtitle">Tasarım - Y. Emre Pektaş</p>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="blog-section" id="blog" aria-label="Blog Yazıları">
          <div className="blog-wrapper">
            <header className="blog-header reveal-up">
              <h2 id="blog-heading">Blog Yazılarımız</h2>
            </header>

            <div className="blog-grid">
              {/* Blog 1 */}
              <article className="blog-card reveal-up delay-100">
                <Link to={getLocalizedPath('/blog/gelecegin-calisma-alanlari-hibrit-ofisler')} className="blog-card__link">
                  <figure className="blog-card__figure">
                    <img src="/assets/burobig/images/blog-1.png" alt="Geleceğin Çalışma Alanları: Hibrit Ofisler" className="blog-card__img" loading="lazy" />
                  </figure>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">Geleceğin Çalışma Alanları:<br />Hibrit Ofisler</h3>
                    <span className="blog-card__readmore">
                      Hemen İncele{' '}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>

              {/* Blog 2 */}
              <article className="blog-card reveal-up delay-200">
                <Link to={getLocalizedPath('/blog/ofislerde-isik-ve-ergonomi-yonetimi')} className="blog-card__link">
                  <figure className="blog-card__figure">
                    <img src="/assets/burobig/images/blog-2.png" alt="Ofislerde Işık ve Ergonomi Yönetimi" className="blog-card__img" loading="lazy" />
                  </figure>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">Ofislerde Işık ve<br />Ergonomi Yönetimi</h3>
                    <span className="blog-card__readmore">
                      Hemen İncele{' '}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>

              {/* Blog 3 */}
              <article className="blog-card reveal-up delay-300">
                <Link to={getLocalizedPath('/blog/sessiz-odaklanma-akustik-panel-cozumleri')} className="blog-card__link">
                  <figure className="blog-card__figure">
                    <img src="/assets/burobig/images/blog-3.png" alt="Sessiz Odaklanma: Akustik Panel Çözümleri" className="blog-card__img" loading="lazy" />
                  </figure>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">Sessiz Odaklanma:<br />Akustik Panel Çözümleri</h3>
                    <span className="blog-card__readmore">
                      Hemen İncele{' '}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Sustainability & Eco Section */}
        <BurobigEcoBanner />
      </main>
  );
}
