import { useEffect, useState } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import { Phone, ArrowRight, Heart, ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import './capilon.css';

export default function CapilonHome() {
  const { activeLang } = useSite();

  // State Management
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mega menu image swap state
  const [megaFeaturedImg, setMegaFeaturedImg] = useState('/assets/capilon/images/hero_living_room_1779477814666.png');

  const slideCount = 2;

  // Set Document Title and Meta Description on Mount
  useEffect(() => {
    document.title = activeLang === 'tr'
      ? "Capilon Mobilya | Premium Ev Mobilyaları ve Yaşam Alanları"
      : "Capilon Furniture | Premium Home Furniture & Living Spaces";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }

    const descText = activeLang === 'tr'
      ? "Eviniz için ilham veren, sıcak ve zamansız dokunuşlar. Modern salon, yatak odası ve yemek odası mobilya koleksiyonunu keşfedin."
      : "Inspiring, warm and timeless touches for your home. Discover the modern living room, bedroom and dining room furniture collections.";
    
    metaDesc.setAttribute('content', descText);
  }, [activeLang]);

  // Header Scroll and Direction logic
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 50);

          if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setHeaderHidden(true);
          } else if (currentScrollY < lastScrollY) {
            setHeaderHidden(false);
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

  // Slider Auto Play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll reveal animations (.reveal-up)
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

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  // Mega Menu Items List
  const megaMenuItems = [
    { title: translate('Koltuk Takımları', 'Living Room Sets'), img: '/assets/capilon/images/menu 01.jpg', featured: '/assets/capilon/images/hero_living_room_1779477814666.png' },
    { title: translate('Köşe Koltuk', 'Corner Sofas'), img: '/assets/capilon/images/menu 02.jpg', featured: '/assets/capilon/images/beta-studio.png' },
    { title: translate('Kanepe / Koltuk', 'Sofas & Couches'), img: '/assets/capilon/images/menu 03.png', featured: '/assets/capilon/images/beta-studio-angle2.png' },
    { title: translate('Sleeper', 'Sleepers'), img: '/assets/capilon/images/menu 04.jpg', featured: '/assets/capilon/images/hero_bedroom_1779477829254.png' },
    { title: translate('Tekli Koltuk & Berjer', 'Armchairs & Recliners'), img: '/assets/capilon/images/menu 05.png', featured: '/assets/capilon/images/beta-main.png' },
    { title: translate('TV Koltuğu & Baba Koltuğu', 'TV & Lounge Chairs'), img: '/assets/capilon/images/menu 06.jpg', featured: '/assets/capilon/images/product_full_page_1779183314743.png' },
    { title: translate('TV Üniteleri & Tv Sehpaları', 'TV Units & TV Stands'), img: '/assets/capilon/images/menu 07.jpg', featured: '/assets/capilon/images/product_dining_1779477859352.png' },
    { title: translate('Sehpa & Sehpa Takımı', 'Coffee Tables & Sets'), img: '/assets/capilon/images/menu 08.jpg', featured: '/assets/capilon/images/beta_main.png' },
  ];

  return (
    <>
      {/* Skip to Content (Accessibility) */}
      <a href="#main-content" className="skip-link">
        {translate('İçeriğe Atla', 'Skip to Content')}
      </a>

      {/* 1. Kampanya Bantı */}
      <div className="campaign-top-bar">
        <div className="header-container campaign-flex">
          <span className="campaign-text">
            {translate('Yaşam Alanlarınıza Değer Katan Tasarımlar', 'Designs Adding Value to Your Living Spaces')}
          </span>
          <div className="top-socials">
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Utility Bar */}
      <div className="utility-bar">
        <div className="header-container utility-flex">
          <div className="utility-left">
            <a href="#magazalar">{translate('Mağazalarımız', 'Our Stores')}</a>
            <a href="#kampanyalar">{translate('Kampanyalar', 'Campaigns')}</a>
            <a href="#evlilik-paketleri">{translate('Evlilik Paketleri', 'Wedding Packages')}</a>
            <a href="#sanal-magaza">{translate('Sanal Mağaza', 'Virtual Store')}</a>
            <a href="#blog">{translate('Blog', 'Blog')}</a>
          </div>
          <div className="utility-right">
            <a href="tel:08503333333" className="whatsapp-link">
              <Phone size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              0850 333 33 33
            </a>
            <a href="#iletisim">{translate('İletişim', 'Contact')}</a>
            <div className="lang-dropdown-wrapper">
              <span className="lang-selector">
                <img src="https://flagcdn.com/w20/tr.png" width="16" alt="Turkey" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                TR <ChevronDown size={10} style={{ display: 'inline', marginLeft: '4px' }} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Ana Header (Logo, Arama, İkonlar) */}
      <header className={`site-header-solid ${scrolled ? 'scrolled' : ''} ${headerHidden ? 'hidden' : ''}`} id="site-header">
        <div className="header-container main-header-row">
          <div className="header-brand">
            <button className="hamburger-btn" aria-label="Menü" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <a href="/" aria-label="Ana Sayfa — Capilon Mobilya" className="capilon-logo-link">
              <img src="/assets/capilon/images/Capilon-Mobilya-Logo.svg" alt="Capilon Mobilya Logo" className="logo__img" />
            </a>
          </div>

          <div className="header-search">
            <form action="#" method="GET" className="search-form-mondi" onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="q" placeholder={translate('Ürün arama', 'Search products')} aria-label="Arama" />
              <button type="submit" aria-label="Ara">
                <Search size={20} />
              </button>
            </form>
          </div>

          <div className="header-actions">
            <a href="#e-tahsilat" className="action-icon">
              <ShoppingBag size={20} />
              <span>{translate('E-Tahsilat', 'E-Payment')}</span>
            </a>
            <a href="#favoriler" className="action-icon">
              <Heart size={20} />
              <span>{translate('Favoriler', 'Favorites')}</span>
            </a>
          </div>
        </div>

        {/* 4. Ana Menü (Navigasyon) */}
        <nav className="main-nav-row" aria-label="Ana Menü">
          <div className="header-container">
            <ul role="list" className="nav-list">
              <li className="has-mega-menu">
                <a href="#koltuk">
                  {translate('KOLTUK TAKIMLARI', 'LIVING ROOM SETS')} <ChevronDown className="chevron-down" size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                </a>
                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    <div className="mega-menu-categories">
                      {megaMenuItems.map((item, idx) => (
                        <a
                          key={idx}
                          href="#koltuk"
                          className="mega-category-item"
                          onMouseEnter={() => setMegaFeaturedImg(item.featured)}
                        >
                          <img src={item.img} alt={item.title} />
                          <span className="mega-cat-title">{item.title}</span>
                        </a>
                      ))}
                    </div>
                    <div className="mega-menu-featured">
                      <img id="mega-featured-img" src={megaFeaturedImg} alt="Öne Çıkan Ürün" />
                    </div>
                  </div>
                </div>
              </li>
              <li><a href="#yemek">{translate('YEMEK ODALARI', 'DINING ROOMS')}</a></li>
              <li><a href="#yatak">{translate('YATAK ODALARI', 'BEDROOMS')}</a></li>
              <li><a href="#genc">{translate('GENÇ ODALARI', 'TEEN ROOMS')}</a></li>
              <li><a href="#kose">{translate('KÖŞE TAKIMLARI', 'CORNER SOFAS')}</a></li>
              <li><a href="#tv">{translate('TV ÜNİTELERİ', 'TV UNITS')}</a></li>
              <li><a href="#kanepeler">{translate('KANEPELER', 'SOFAS')}</a></li>
              <li><a href="#mutfak">{translate('MUTFAK VE BALKON', 'KITCHEN & BALCONY')}</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1002, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-start' }}>
          <div className="mobile-menu-container" style={{ width: '280px', background: '#faf8f5', height: '100%', padding: '20px', display: 'flex', flexDirection: 'col', gap: '20px', position: 'relative' }}>
            <button style={{ position: 'absolute', right: '20px', top: '20px' }} onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="#koltuk" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Koltuk Takımları', 'Living Room Sets')}</a>
              <a href="#yemek" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Yemek Odaları', 'Dining Rooms')}</a>
              <a href="#yatak" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Yatak Odaları', 'Bedrooms')}</a>
              <a href="#genc" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Genç Odaları', 'Teen Rooms')}</a>
              <a href="#iletisim" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('İletişim', 'Contact')}</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Slider Section */}
        <section className="hero-section" aria-labelledby="hero-heading" id="hero">
          <div className="hero-slider" id="hero-slider">
            {/* Slide 1: Living Room */}
            <div className={`hero-slide ${activeSlide === 0 ? 'active' : ''}`}>
              <div className="hero-slide-bg" style={{ backgroundImage: `url('/assets/capilon/images/hero_living_room_1779477814666.png')` }} />
              <div className="hero-content">
                <span className="hero-overline">{translate('YENİ SEZON KOLEKSİYONU', 'NEW SEASON COLLECTION')}</span>
                <h1 id="hero-heading">
                  {translate('Zamanın Ötesinde', 'Beyond Time')}<br />
                  {translate('Tasarım Anlayışı', 'Design Conception')}
                </h1>
                <p>
                  {translate(
                    "Yaşam alanlarınıza modern, şık ve zamansız dokunuşlar. Capilon'un yenilenen premium konforunu keşfedin.",
                    "Modern, stylish and timeless touches to your living spaces. Discover Capilon's renewed premium comfort."
                  )}
                </p>
                <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-1">
                  {translate('Koleksiyonu Keşfet', 'Discover Collection')} <span className="arrow">→</span>
                </a>
              </div>
            </div>

            {/* Slide 2: Bedroom */}
            <div className={`hero-slide ${activeSlide === 1 ? 'active' : ''}`}>
              <div className="hero-slide-bg" style={{ backgroundImage: `url('/assets/capilon/images/hero_bedroom_1779477829254.png')` }} />
              <div className="hero-content">
                <span className="hero-overline">{translate('HUZURUN MİMARİSİ', 'ARCHITECTURE OF SERENITY')}</span>
                <h2>
                  {translate('Kusursuz Uyku', 'Perfect Sleep')}<br />
                  {translate('Deneyimi', 'Experience')}
                </h2>
                <p>
                  {translate(
                    "Günün yorgunluğunu geride bırakacağınız, sizi rahatlığıyla sarmalayan estetik yatak odası tasarımları.",
                    "Aesthetic bedroom designs that surround you with comfort, letting you leave the day's fatigue behind."
                  )}
                </p>
                <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-2">
                  {translate('Koleksiyonu İncele', 'Examine Collection')} <span className="arrow">→</span>
                </a>
              </div>
            </div>

            {/* Slider Arrows */}
            <button className="slider-arrow prev-arrow" aria-label={translate('Önceki Slayt', 'Previous Slide')} onClick={() => handleSlideChange((activeSlide - 1 + slideCount) % slideCount)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="slider-arrow next-arrow" aria-label={translate('Sonraki Slayt', 'Next Slide')} onClick={() => handleSlideChange((activeSlide + 1) % slideCount)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Slider Controls */}
            <div className="slider-controls">
              <button className={`slider-dot ${activeSlide === 0 ? 'active' : ''}`} aria-label="Slayt 1" onClick={() => handleSlideChange(0)}></button>
              <button className={`slider-dot ${activeSlide === 1 ? 'active' : ''}`} aria-label="Slayt 2" onClick={() => handleSlideChange(1)}></button>
            </div>
          </div>
        </section>

        {/* 5. Hızlı Kategoriler (Marquee Loop) */}
        <section className="quick-categories" aria-label="Hızlı Kategoriler">
          <div className="quick-categories-header">
            <h2>{translate('Yaşam Alanınızı Yeniden Keşfedin', 'Rediscover Your Living Space')}</h2>
            <p>{translate('Tarzınızı yansıtacak en seçkin kategorilerle tanışın.', 'Meet the most exclusive categories that reflect your style.')}</p>
          </div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {/* Set 1 */}
              <a href="#yemek" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Yemek Odaları" loading="lazy" /></div>
                <span>{translate('Yemek Odaları', 'Dining Rooms')}</span>
              </a>
              <a href="#yatak" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Yatak Odaları" loading="lazy" /></div>
                <span>{translate('Yatak Odaları', 'Bedrooms')}</span>
              </a>
              <a href="#koltuk" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Koltuk Takımları" loading="lazy" /></div>
                <span>{translate('Koltuk Takımları', 'Living Room Sets')}</span>
              </a>
              <a href="#kanepeler" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Kanepeler" loading="lazy" /></div>
                <span>{translate('Kanepeler', 'Sofas')}</span>
              </a>
              <a href="#berjerler" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Berjerler" loading="lazy" /></div>
                <span>{translate('Berjerler', 'Armchairs')}</span>
              </a>
              <a href="#kose" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Köşe Takımları" loading="lazy" /></div>
                <span>{translate('Köşe Takımları', 'Corner Sofas')}</span>
              </a>
              
              {/* Set 2 (Duplicate for seamless scroll) */}
              <a href="#yemek" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Yemek Odaları" loading="lazy" /></div>
                <span>{translate('Yemek Odaları', 'Dining Rooms')}</span>
              </a>
              <a href="#yatak" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Yatak Odaları" loading="lazy" /></div>
                <span>{translate('Yatak Odaları', 'Bedrooms')}</span>
              </a>
              <a href="#koltuk" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Koltuk Takımları" loading="lazy" /></div>
                <span>{translate('Koltuk Takımları', 'Living Room Sets')}</span>
              </a>
              <a href="#kanepeler" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Kanepeler" loading="lazy" /></div>
                <span>{translate('Kanepeler', 'Sofas')}</span>
              </a>
              <a href="#berjerler" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Berjerler" loading="lazy" /></div>
                <span>{translate('Berjerler', 'Armchairs')}</span>
              </a>
              <a href="#kose" className="cat-circle">
                <div className="circle-img-wrap"><img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Köşe Takımları" loading="lazy" /></div>
                <span>{translate('Köşe Takımları', 'Corner Sofas')}</span>
              </a>
            </div>
          </div>
        </section>

        {/* 6. Woodmart Style Product Collections Section */}
        <section className="product-collections-section" id="koleksiyonlar">
          <div className="pc-header">
            <h2>{translate('İlham Veren Yaşam Alanları', 'Inspiring Living Spaces')}</h2>
            <p>{translate('Evinizin her köşesi için özenle tasarlanmış, estetik ve konforu buluşturan seçkin koleksiyonlarımız.', 'Our distinguished collections carefully designed for every corner of your home, bringing together aesthetics and comfort.')}</p>
          </div>
          <div className="pc-grid">
            <div className="pc-col">
              <a href="#koltuk" className="pc-item" style={{ height: '450px' }}>
                <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Koltuk Takımları" />
                <div className="pc-overlay"><span>{translate('Koltuk Takımları', 'Living Room Sets')}</span></div>
              </a>
              <a href="#berjerler" className="pc-item" style={{ height: '300px' }}>
                <img src="/assets/capilon/images/cat_armchair_warm.png" alt="Berjerler" />
                <div className="pc-overlay"><span>{translate('Berjerler', 'Armchairs')}</span></div>
              </a>
            </div>
            <div className="pc-col">
              <a href="#yatak" className="pc-item" style={{ height: '500px' }}>
                <img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Yatak Odaları" />
                <div className="pc-overlay"><span>{translate('Yatak Odaları', 'Bedrooms')}</span></div>
              </a>
              <div className="pc-item pc-text-block pc-bg-beige" style={{ height: '250px' }}>
                <h3>CAPILON</h3>
                <p>{translate('Yeni konseptimiz, standart formlardan daha sade ve çok daha şık bir dille yorumlandı.', 'Our new concept is interpreted in a simpler and much more stylish language than standard forms.')}</p>
              </div>
            </div>
            <div className="pc-col">
              <a href="#yemek" className="pc-item" style={{ height: '350px' }}>
                <img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Yemek Odaları" />
                <div className="pc-overlay"><span>{translate('Yemek Odaları', 'Dining Rooms')}</span></div>
              </a>
              <a href="#kose" className="pc-item" style={{ height: '400px' }}>
                <img src="/assets/capilon/images/cat_corner_sofa_warm.png" alt="Köşe Takımları" />
                <div className="pc-overlay"><span>{translate('Köşe Takımları', 'Corner Sofas')}</span></div>
              </a>
            </div>
            <div className="pc-col">
              <div className="pc-item pc-text-block pc-bg-blue" style={{ height: '250px' }}>
                <h3>MODERN</h3>
                <p>{translate('Estetik ve fonksiyonelliğin birleştiği, evinizi saran yepyeni bir tasarım çizgisi.', 'A brand new design line that surrounds your home, where aesthetics and functionality merge.')}</p>
              </div>
              <a href="#genc" className="pc-item" style={{ height: '500px' }}>
                <img src="/assets/capilon/images/cat_teen_room_warm.png" alt="Genç Odaları" />
                <div className="pc-overlay"><span>{translate('Genç Odaları', 'Teen Rooms')}</span></div>
              </a>
            </div>
            <div className="pc-col">
              <a href="#tv" className="pc-item" style={{ height: '450px' }}>
                <img src="/assets/capilon/images/cat_tv_unit_warm.png" alt="TV Üniteleri" />
                <div className="pc-overlay"><span>{translate('TV Üniteleri', 'TV Units')}</span></div>
              </a>
              <a href="#bebek" className="pc-item" style={{ height: '300px' }}>
                <img src="/assets/capilon/images/cat_baby_room_warm.png" alt="Bebek Odaları" />
                <div className="pc-overlay"><span>{translate('Bebek Odaları', 'Baby Rooms')}</span></div>
              </a>
            </div>
          </div>
        </section>

        {/* 7. Comfort Plus Banner Section */}
        <section className="comfort-series-section">
          <div className="comfort-wrapper">
            <div className="comfort-content">
              <h2>
                {translate('Evinizde zamanın', 'Time stopping in')}<br />
                {translate('durduğu o huzur dolu', 'your home in those')}<br />
                {translate('anlar yaratın...', 'serene moments...')}
              </h2>
              <p>{translate('Yorucu bir günün ardından sığındığınız anlar için tasarlandı. Sizi kucaklayan formlar, kusursuz el işçiliği ve zamansız Capilon estetiğiyle tanışın.', "Designed for the moments you shelter in after a tiring day. Meet the forms that embrace you, flawless craftsmanship, and timeless Capilon aesthetics.")}</p>
              <a href="#koleksiyonlar" className="btn-comfort-outline">{translate('KEŞFEDİN', 'DISCOVER')}</a>
            </div>
            <div className="comfort-image">
              <img src="/assets/capilon/images/capilon_comfort_series_1779567476232.png" alt="Capilon Comfort Serisi" loading="lazy" />
            </div>
          </div>
        </section>

        {/* 8. Monthly Featured Products */}
        <section className="monthly-featured-section">
          <div className="monthly-header">
            <h2>{translate('Bu Ayın Öne Çıkan Ürünleri', 'Featured Products of the Month')}</h2>
            <p>{translate('En çok beğenilen ve yeni eklenen koleksiyonlarımızı hemen keşfedin.', 'Discover our most liked and newly added collections immediately.')}</p>
          </div>
          <div className="monthly-marquee-wrapper">
            <div className="monthly-marquee-track">
              {/* Product Card 1 */}
              <article className="monthly-card">
                <a href="#koltuk" className="monthly-card-link">
                  <div className="monthly-img-wrapper">
                    <img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Nova Yemek Odası" loading="lazy" />
                    <div className="monthly-img-overlay">
                      <span className="overlay-brand">NOVA</span>
                      <span className="overlay-desc">{translate('Yemek Odası Takımı', 'Dining Room Set')}</span>
                    </div>
                  </div>
                  <div className="monthly-info">
                    <div className="monthly-text">
                      <span className="monthly-subtitle">{translate('Yeni Koleksiyon', 'New Collection')}</span>
                      <h3 className="monthly-title">{translate('Nova Yemek Odası', 'Nova Dining Room')}</h3>
                      <p className="monthly-desc">{translate('Modern çizgiler ve doğal dokular...', 'Modern lines and natural textures...')}</p>
                    </div>
                    <div className="monthly-action">
                      <div className="action-btn"><ArrowRight size={20} /></div>
                    </div>
                  </div>
                </a>
              </article>

              {/* Product Card 2 */}
              <article className="monthly-card">
                <a href="#koltuk" className="monthly-card-link">
                  <div className="monthly-img-wrapper">
                    <img src="/assets/capilon/images/product_sofa_1779477845050.png" alt="Nova Koltuk Takımı" loading="lazy" />
                    <div className="monthly-img-overlay">
                      <span className="overlay-brand">NOVA</span>
                      <span className="overlay-desc">{translate('Koltuk Takımı', 'Living Room Set')}</span>
                    </div>
                  </div>
                  <div className="monthly-info">
                    <div className="monthly-text">
                      <span className="monthly-subtitle">{translate('Çok Satanlar', 'Best Sellers')}</span>
                      <h3 className="monthly-title">{translate('Nova Koltuk Takımı', 'Nova Sofa Set')}</h3>
                      <p className="monthly-desc">{translate('Eşsiz konfor ve minimal tasarım...', 'Unique comfort and minimal design...')}</p>
                    </div>
                    <div className="monthly-action">
                      <div className="action-btn"><ArrowRight size={20} /></div>
                    </div>
                  </div>
                </a>
              </article>

              {/* Product Card 3 */}
              <article className="monthly-card">
                <a href="#koltuk" className="monthly-card-link">
                  <div className="monthly-img-wrapper">
                    <img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Lina Yatak Odası" loading="lazy" />
                    <div className="monthly-img-overlay">
                      <span className="overlay-brand">LINA</span>
                      <span className="overlay-desc">{translate('Yatak Odası Takımı', 'Bedroom Set')}</span>
                    </div>
                  </div>
                  <div className="monthly-info">
                    <div className="monthly-text">
                      <span className="monthly-subtitle">{translate('Huzurlu Seçim', 'Peaceful Choice')}</span>
                      <h3 className="monthly-title">{translate('Lina Yatak Odası', 'Lina Bedroom')}</h3>
                      <p className="monthly-desc">{translate('Güne dingin bir başlangıç yapın...', 'Start the day serenely...')}</p>
                    </div>
                    <div className="monthly-action">
                      <div className="action-btn"><ArrowRight size={20} /></div>
                    </div>
                  </div>
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* 9. Blog Section */}
        <section className="blog-section" id="blog">
          <div className="blog-wrapper">
            <div className="blog-header">
              <h2>{translate('İlham Veren Fikirler', 'Inspiring Ideas')}</h2>
              <p>{translate('Evinizi dönüştürecek dekorasyon ipuçları ve en yeni trendler.', 'Decoration tips and the newest trends that will transform your home.')}</p>
            </div>
            <div className="blog-grid">
              <article className="blog-card">
                <div className="blog-img-wrapper">
                  <img src="/assets/capilon/images/blog_minimalist_living_1779569364192.png" alt="Minimalist Dekorasyon" loading="lazy" />
                  <span className="blog-category">{translate('DEKORASYON', 'DECORATION')}</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date">{translate('12 Mayıs 2026', 'May 12, 2026')}</span>
                  <h3 className="blog-title">{translate('Minimalist Ev Dekorasyonu İçin 5 İpucu', '5 Tips for Minimalist Home Decoration')}</h3>
                  <p className="blog-excerpt">{translate('Ferah ve huzurlu bir yaşam alanı yaratmanın en sade ve etkili yollarını keşfedin. Doğal ışığı içeri alın.', 'Discover the simplest and most effective ways to create a spacious and peaceful living space. Let natural light in.')}</p>
                  <a href="#blog" className="blog-read-more">
                    {translate('Devamını Oku', 'Read More')} <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                  </a>
                </div>
              </article>

              <article className="blog-card">
                <div className="blog-img-wrapper">
                  <img src="/assets/capilon/images/blog_color_trends_1779569377371.png" alt="Renk Trendleri" loading="lazy" />
                  <span className="blog-category">{translate('TRENDLER', 'TRENDS')}</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date">{translate('08 Mayıs 2026', 'May 8, 2026')}</span>
                  <h3 className="blog-title">{translate('2026 Mobilya Renk Trendleri', '2026 Furniture Color Trends')}</h3>
                  <p className="blog-excerpt">{translate('Gece mavisi, kiremit ve zeytin yeşili bu yıl mekanlara hakim oluyor. Renklerin psikolojik etkilerini inceledik.', 'Midnight blue, brick and olive green dominate spaces this year. We analyzed the psychological effects of colors.')}</p>
                  <a href="#blog" className="blog-read-more">
                    {translate('Devamını Oku', 'Read More')} <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                  </a>
                </div>
              </article>

              <article className="blog-card">
                <div className="blog-img-wrapper">
                  <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Doğru Koltuk Seçimi" loading="lazy" />
                  <span className="blog-category">{translate('REHBER', 'GUIDE')}</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date">{translate('03 Mayıs 2026', 'May 3, 2026')}</span>
                  <h3 className="blog-title">{translate('Salonunuz İçin Doğru Koltuk Seçimi', 'Choosing the Right Sofa for Your Living Room')}</h3>
                  <p className="blog-excerpt">{translate('Alanınızın ölçüleri, kumaş türleri ve kullanım alışkanlıklarınıza göre mükemmel koltuğu nasıl bulursunuz?', 'How do you find the perfect sofa based on your space measurements, fabric types, and usage habits?')}</p>
                  <a href="#blog" className="blog-read-more">
                    {translate('Devamını Oku', 'Read More')} <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 10. Newsletter Banner */}
        <section className="newsletter-banner">
          <div className="newsletter-banner-container">
            <div className="newsletter-text">
              <h2>{translate('Capilon Ailesine Katılın', 'Join the Capilon Family')}</h2>
              <p>{translate('En yeni koleksiyonlar, dekorasyon önerileri ve size özel ayrıcalıklardan ilk siz haberdar olun.', 'Be the first to know about the newest collections, decoration tips, and exclusive privileges.')}</p>
            </div>
            <div className="subscribe-form">
              <form action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder={translate('E-posta adresinizi giriniz...', 'Enter your email address...')} aria-label="E-posta Adresi" required />
                <button type="submit">{translate('Abone Ol', 'Subscribe')}</button>
              </form>
            </div>
          </div>
        </section>

        {/* 11. Premium Manifesto & Shipping Section */}
        <section className="premium-manifesto-section">
          <div className="manifesto-container">
            <div className="manifesto-top">
              <div className="manifesto-image-wrapper">
                <img src="/assets/capilon/images/premium_craftsmanship_1779572256681.png" alt="30 Yıllık Tecrübe" />
                <div className="manifesto-badge-new">
                  <div className="mb-circle">
                    <span className="mb-number">30</span>
                    <span className="mb-text">{translate('YILLIK', 'YEARS OF')}<br />{translate('TECRÜBE', 'EXPERIENCE')}</span>
                  </div>
                </div>
              </div>
              <div className="manifesto-content">
                <div className="manifesto-header">
                  <h2>{translate('Capilon Farkı', 'The Capilon Difference')}</h2>
                </div>
                <div className="manifesto-list">
                  <div className="manifesto-item">
                    <div className="manifesto-number">01</div>
                    <div className="manifesto-text">
                      <h3>{translate('Sizin için tasarlıyor, Türkiye için üretiyoruz.', 'Designing for you, producing for Turkey.')}</h3>
                      <p>{translate('Nelere ihtiyacınız olduğunu biliyor ve dünyanın tasarım trendini araştırarak sizin için en doğrusunu üretiyoruz.', 'We know what you need and produce the most correct ones for you by researching the world\'s design trends.')}</p>
                    </div>
                  </div>
                  <div className="manifesto-item">
                    <div className="manifesto-number">02</div>
                    <div className="manifesto-text">
                      <h3>{translate('30 Yılın tecrübesi ile geliştiriyoruz.', 'Developing with 30 years of experience.')}</h3>
                      <p>{translate('Kullanıcı deneyimine dayalı, sağlam, modern, kullanışlı ve şık ürünleri sizinle buluşturmak adına fabrikamızda üretiyoruz.', 'We produce sturdy, modern, useful and stylish products based on user experience in our factory to bring them to you.')}</p>
                    </div>
                  </div>
                  <div className="manifesto-item">
                    <div className="manifesto-number">03</div>
                    <div className="manifesto-text">
                      <h3>{translate('Türkiye\'nin her yerindeyiz.', 'We are everywhere in Turkey.')}</h3>
                      <p>{translate('Tüm Türkiye\'ye özenle ambalajlanmış ürünlerimizi hızla sevk ediyor ve hak edilen kalitenin herkes tarafından yaşanması için çaba veriyoruz.', 'We ship our carefully packaged products rapidly all over Turkey and strive to let everyone experience the deserved quality.')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="manifesto-bottom-bar">
              <div className="m-shipping-grid">
                <div className="m-shipping-card">
                  <div className="m-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="m-shipping-text">
                    <span className="m-shipping-title">{translate('15 Günde Kargoda', 'Shipped in 15 Days')}</span>
                    <span className="m-shipping-desc">{translate('Hızlı ve güvenli teslimat', 'Fast and safe delivery')}</span>
                  </div>
                </div>
                <div className="m-shipping-card">
                  <div className="m-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="m-shipping-text">
                    <span className="m-shipping-title">{translate('Ücretsiz Kargo', 'Free Shipping')}</span>
                    <span className="m-shipping-desc">{translate('Ankara içi teslimatlarda', 'For deliveries in Ankara')}</span>
                  </div>
                </div>
                <div className="m-shipping-card">
                  <div className="m-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="m-shipping-text">
                    <span className="m-shipping-title">{translate('Türkiye\'nin Her Yerine', 'To Everywhere in Turkey')}</span>
                    <span className="m-shipping-desc">{translate('Anlaşmalı kargo güvencesi', 'Contracted cargo assurance')}</span>
                  </div>
                </div>
              </div>
              <a href="https://wa.me/905000000000" className="manifesto-action-btn" target="_blank" rel="noopener noreferrer">
                <span className="btn-text">{translate('MÜŞTERİ TEMSİLCİSİ', 'CUSTOMER REPRESENTATIVE')}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mega-footer" aria-label="Site Footer" id="iletisim">
        <div className="footer-main-container">
          <div className="footer-links-area">
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Popüler Takımlar', 'Popular Sets')}</h4>
              <ul className="footer-list">
                <li><a href="#koltuk">{translate('Koltuk Takımları', 'Living Room Sets')}</a></li>
                <li><a href="#kose">{translate('Köşe Takımları', 'Corner Sofa Sets')}</a></li>
                <li><a href="#yemek">{translate('Yemek Odası Takımları', 'Dining Room Sets')}</a></li>
                <li><a href="#yatak">{translate('Yatak Odası Takımları', 'Bedroom Sets')}</a></li>
                <li><a href="#genc">{translate('Genç Odası Takımları', 'Teen Room Sets')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Popüler Kategoriler', 'Popular Categories')}</h4>
              <ul className="footer-list">
                <li><a href="#koltuk">{translate('Oturma Grubu', 'Living Room')}</a></li>
                <li><a href="#yemek">{translate('Yemek Odası', 'Dining Room')}</a></li>
                <li><a href="#yatak">{translate('Yatak Odası', 'Bedroom')}</a></li>
                <li><a href="#genc">{translate('Genç ve Çocuk Odası', 'Teen & Kids Room')}</a></li>
                <li><a href="#tv">{translate('TV Üniteleri', 'TV Units')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Capilon Yatak</h4>
              <ul className="footer-list">
                <li><a href="#yatak">{translate('Yataklar', 'Mattresses')}</a></li>
                <li><a href="#yatak">{translate('Yastık & Yorgan', 'Pillows & Quilts')}</a></li>
                <li><a href="#yatak">{translate('Baza & Başlık', 'Bases & Headboards')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">2026 Kataloglar</h4>
              <p className="footer-desc">{translate('Koleksiyonlarımızın kataloglarını inceleyin.', 'Examine the catalogs of our collections.')}</p>
              <div className="footer-catalogs-grid">
                <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Katalog 1" loading="lazy" />
                <img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Katalog 2" loading="lazy" />
                <img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Katalog 3" loading="lazy" />
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Capilon Kurumsal</h4>
              <ul className="footer-list">
                <li><a href="#kurumsal">{translate('Hakkımızda', 'About Us')}</a></li>
                <li><a href="#iletisim">{translate('İletişim', 'Contact')}</a></li>
                <li><a href="#kurumsal">{translate('Mağazalar', 'Stores')}</a></li>
                <li><a href="#blog">{translate('Blog', 'Blog')}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo-left">
            <img src="/assets/capilon/images/Capilon-Mobilya-Logo.svg" alt="Capilon Mobilya Grubu" style={{ height: '30px' }} />
          </div>
          <div className="footer-copyright">
            Copyright © 2026 Capilon Mobilya. {translate('Tüm hakları saklıdır.', 'All rights reserved.')}
          </div>
          <div className="footer-signature">
            {translate('Altyapı:', 'Infrastructure:')} <strong>CoreWeb</strong>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/905000000000" className="floating-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="34" height="34" fill="#fff">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </>
  );
}
