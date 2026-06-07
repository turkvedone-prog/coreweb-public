import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';

export default function BurobigHome() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

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

  // Safe header scroll event listener with animation frames and cleanup
  useEffect(() => {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          header.classList.toggle('scrolled', currentScrollY > 50);

          if (currentScrollY > lastScrollY && currentScrollY > 150) {
            header.classList.add('hidden');
          } else if (currentScrollY < lastScrollY) {
            header.classList.remove('hidden');
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Skip to Content (Accessibility) */}
      <a href="#main-content" className="skip-link">İçeriğe Atla</a>

      {/* Header: 3-Column - Logo | Center Nav | Utility */}
      <header className="site-header" id="site-header">
        <div className="header-container">
          {/* LOGO */}
          <div className="logo">
            <a href="/" aria-label="Ana Sayfa — Bürobig">
              <img
                src="/assets/burobig/images/burobig-logo-dark%201.png"
                alt="Bürobig"
                width="130"
                height="44"
                className="logo__img"
                loading="eager"
                decoding="async"
              />
            </a>
          </div>

          {/* MAIN NAV: Center aligned */}
          <nav className="main-nav" aria-label="Ana Menü">
            <ul role="list">
              <li className="has-dropdown">
                <Link to={getLocalizedPath('/urunler')} id="nav-urunler" aria-haspopup="true" aria-expanded="false">
                  Ürünler
                  <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                {/* Mega Menu */}
                <div className="mega-menu" aria-label="Ürün Kategorileri">
                  <div className="mega-menu__container">
                    {/* Masalar */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">MASALAR</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/urunler?cat=masalar&sub=ust-yonetici')}>Üst Yönetici</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=masalar&sub=yonetici')}>Yönetici</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=masalar&sub=calisma')}>Çalışma</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=masalar&sub=operasyonel')}>Operasyonel</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=masalar&sub=toplanti')}>Toplantı</Link></li>
                      </ul>
                    </div>
                    {/* Ofis Koltukları */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">OFİS KOLTUKLARI</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/urunler?cat=ofis-koltuklari')}>Yönetici Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=ofis-koltuklari')}>Çalışma Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=ofis-koltuklari')}>Misafir ve Bekleme Koltukları</Link></li>
                      </ul>
                    </div>
                    {/* Koltuklar / Kanepeler */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">KOLTUKLAR / KANEPELER</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/urunler')}>Koltuklar</Link></li>
                        <li><Link to={getLocalizedPath('/urunler')}>Kanepeler</Link></li>
                        <li><Link to={getLocalizedPath('/urunler')}>Sandalyeler</Link></li>
                        <li><Link to={getLocalizedPath('/urunler')}>Bekleme Alanları</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li><a href="#kurumsal" id="nav-kurumsal">Kurumsal</a></li>
              <li><a href="#tasarimcilar" id="nav-tasarimcilar">Tasarımcılar</a></li>
              <li><a href="#blog" id="nav-blog">Blog</a></li>
              <li><a href="#iletisim" id="nav-iletisim">İletişim</a></li>
            </ul>
          </nav>

          {/* UTILITY: Right side */}
          <div className="header-utility">
            <a href="#shop" className="utility-link" id="util-shop">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Shop
            </a>
            <a href="#portal" className="utility-link utility-link--has-line" id="util-portal">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="3" y="3" width="7" height="9" rx="1"></rect>
                <rect x="14" y="3" width="7" height="5" rx="1"></rect>
                <rect x="14" y="12" width="7" height="9" rx="1"></rect>
                <rect x="3" y="16" width="7" height="5" rx="1"></rect>
              </svg>
              Big<span style={{ fontSize: '1.8em', verticalAlign: 'middle', lineHeight: 0, display: 'inline-block', margin: '0 -0.25em', transform: 'translateY(-1px)' }}>&bull;</span>Portal
            </a>
            <a href="#pay" className="utility-link utility-link--has-line" id="util-pay">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              Pay
            </a>

            <div className="utility-dropdown">
              <button className="utility-link utility-lang" id="util-lang" aria-label="Dil seç">
                TR
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="lang-dropdown-menu">
                <a href="#en">EN</a>
                <a href="#ar">AR</a>
                <a href="#ru">RU</a>
              </div>
            </div>
            <button className="icon-btn" id="btn-search" aria-label="Arama Yap">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Hero Slider */}
        <section className="hero-section" aria-labelledby="hero-heading" id="hero">
          <div className="hero-slider" id="hero-slider">
            {/* Slide 1 */}
            <div className={`hero-slide ${activeSlide === 0 ? 'active' : ''}`}>
              <div className="hero-slide-bg" style={{ backgroundImage: "url('/assets/burobig/images/inka_yonetici_slider_bg.png')" }}></div>
              <div className="hero-content">
                <span className="hero-subtitle" style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-accent)', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>Yeni Koleksiyon</span>
                <h1 id="hero-heading">İnka Yönetici<br />Serisi</h1>
                <p>Prestijli detaylar ve modern çizgilerle üst yönetici alanlarında yeni bir standart.</p>
                <Link to={getLocalizedPath('/urunler?cat=masalar&sub=ust-yonetici')} className="btn-primary" id="hero-cta-1">Koleksiyonu Keşfet</Link>
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
                <Link to={getLocalizedPath('/urunler?cat=masalar&sub=ust-yonetici')} className="collection-card__link" id="card-makam" aria-label="Makam Takımları koleksiyonunu keşfet">
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
                <Link to={getLocalizedPath('/urunler?cat=masalar&sub=operasyonel')} className="collection-card__link" id="card-operasyonel" aria-label="Operasyonel Masalar koleksiyonunu keşfet">
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
                <Link to={getLocalizedPath('/urunler?cat=masalar&sub=toplanti')} className="collection-card__link" id="card-toplanti" aria-label="Toplantı Masaları koleksiyonunu keşfet">
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
                <Link to={getLocalizedPath('/urunler?cat=ofis-koltuklari')} className="collection-card__link" id="card-koltuklar" aria-label="Çalışma Koltukları koleksiyonunu keşfet">
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
                <Link to={getLocalizedPath('/blog')} className="blog-card__link">
                  <figure className="blog-card__figure">
                    <img src="/assets/burobig/images/blog-1.png" alt="Ergonomi Blog" className="blog-card__img" loading="lazy" />
                  </figure>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">Geleceğin Çalışma Alanları:<br />Hibrit Ofislerde Verimlilik Sırları</h3>
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
                <Link to={getLocalizedPath('/blog')} className="blog-card__link">
                  <figure className="blog-card__figure">
                    <img src="/assets/burobig/images/blog-2.png" alt="Estetik Blog" className="blog-card__img" loading="lazy" />
                  </figure>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">Yönetici Odalarında Yeni Dönem:<br />Konfor ve Prestiji Birleştiren Detaylar</h3>
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
                <Link to={getLocalizedPath('/blog')} className="blog-card__link">
                  <figure className="blog-card__figure">
                    <img src="/assets/burobig/images/blog-3.png" alt="Doku Blog" className="blog-card__img" loading="lazy" />
                  </figure>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">Kumaşın Dili:<br />Premium Ofis Mobilyalarında Doku Seçimi</h3>
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
        <section className="eco-section reveal-up" aria-label="Sürdürülebilirlik ve Çevre" id="eco-banner">
          <div className="eco-container">
            <div className="eco-card">
              <div className="eco-header">
                <h2 className="eco-title">Sürdürülebilir Üretim, Güvenilir Standartlar</h2>
                <p className="eco-subtitle">Doğaya duyarlı üretim anlayışımız, yeşil enerji kullanımı ve uluslararası kalite standartlarına uygun malzeme seçimimizle geleceğe değer katıyoruz.</p>
              </div>
              <div className="eco-grid">
                <div className="eco-item">
                  <div className="eco-icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 7a8 8 0 0 1-7.9 8.07c-.4 0-.75-.1-.75-.1a7 7 0 0 1-1.35 3.03z"></path>
                      <path d="M19 2c-3 4-8 5.5-10 11"></path>
                    </svg>
                  </div>
                  <h3 className="eco-item-title">Çevreye Duyarlı Üretim</h3>
                  <p className="eco-item-text">Üretim süreçlerimizde doğaya saygılı, kaynakları verimli kullanan ve sürdürülebilir yöntemleri benimsiyoruz.</p>
                </div>

                <div className="eco-item">
                  <div className="eco-icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="eco-item-title">Yeşil Enerji Yaklaşımı</h3>
                  <p className="eco-item-text">Enerji kullanımında çevresel etkiyi azaltan, yenilenebilir ve verimli çözümleri önceliklendiriyoruz.</p>
                </div>

                <div className="eco-item">
                  <div className="eco-icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <h3 className="eco-item-title">Kaliteli ve Güvenli Malzemeler</h3>
                  <p className="eco-item-text">Kullanılan malzemeler dayanıklılık, hijyen, güvenlik ve uzun ömür kriterlerine göre titizlikle seçilir.</p>
                </div>

                <div className="eco-item">
                  <div className="eco-icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <h3 className="eco-item-title">Uluslararası Standartlar</h3>
                  <p className="eco-item-text">Ürün ve hizmet süreçlerimizde global kalite anlayışına uygun, güven veren standartları esas alıyoruz.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer" aria-label="Site Footer">
        <div className="footer-wrapper">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <img src="/assets/burobig/images/burobig-logo-light.png" alt="Bürobig Logo" className="footer-logo" />
              <p>Doğadan ilham alan yenilikçi çizgilerle, geleceğin premium ofis ve yaşam alanlarını tasarlıyoruz. İhtiyacınıza göre şekillenen, kalite ve konforla buluşan özgün çözümler.</p>
              <div className="footer-socials">
                <a href="#tw" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#ig" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#fb" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#li" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Kurumsal</h4>
              <ul className="footer-links">
                <li><a href="#hakkimizda">Hakkımızda</a></li>
                <li><a href="#vizyon">Vizyon & Misyon</a></li>
                <li><a href="#kariyer">Kariyer</a></li>
                <li><a href="#surdurulebilirlik">Sürdürülebilirlik</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Koleksiyonlar</h4>
              <ul className="footer-links">
                <li><a href="#oturma">Oturma Grupları</a></li>
                <li><a href="#calisma">Çalışma Masaları</a></li>
                <li><a href="#toplanti">Toplantı Masaları</a></li>
                <li><a href="#bekleme">Bekleme Alanları</a></li>
              </ul>
            </div>

            <div className="footer-col contact-col">
              <h4>E-Bülten Kayıt</h4>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Yeniliklerden ve özel koleksiyonlarımızdan ilk siz haberdar olun.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="E-posta adresiniz" required aria-label="E-posta adresiniz" />
                <button type="submit" aria-label="Kayıt Ol">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <h4 style={{ marginTop: '2rem' }}>İletişim</h4>
              <a href="mailto:info@burobig.com" className="footer-contact-link">info@burobig.com</a>
              <a href="tel:+902120000000" className="footer-contact-link">+90 (212) 000 00 00</a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <span>© {new Date().getFullYear()} <strong>Bürobig Ofis Mobilyaları</strong>. Tüm Hakları Saklıdır.</span>
            </div>
            <div className="footer-bottom-right">
              <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Yukarı Git">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
              <img src="/assets/burobig/images/CoreWeb_Logo.svg" alt="CoreWeb Logo" className="footer-agency-logo" />
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Lead Widget */}
      <div className="wa-widget">
        <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp ile İletişime Geçin">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>
    </>
  );
}
