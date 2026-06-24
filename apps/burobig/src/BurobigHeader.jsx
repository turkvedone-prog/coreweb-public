import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';

export default function BurobigHeader() {
  const { tenantMapping, activeLang, settings } = useSite();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // 'urunler' | 'kurumsal' | null
  const [isUrunlerOpen, setIsUrunlerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsUrunlerOpen(false);
  }, [location]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navUrunlerLi = document.getElementById('nav-urunler-li');
      if (navUrunlerLi && !navUrunlerLi.contains(event.target)) {
        setIsUrunlerOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Her ortamda /:lang prefix kullan (local = production ile aynı)
  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const handleLogoClick = (e) => {
    const currentPath = window.location.pathname;
    const homePath = getLocalizedPath('/');
    const cleanHomePath = `/${activeLang}`;

    if (currentPath === homePath || currentPath === cleanHomePath || currentPath === `${cleanHomePath}/`) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            header.classList.add('hidden'); // Scroll down -> Hide
          } else if (currentScrollY < lastScrollY) {
            header.classList.remove('hidden'); // Scroll up -> Show
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = settings?.logos?.header || "/assets/burobig/images/Burobig%20Logo%20Siyah.svg";

  return (
    <>
      <a href="#main-content" className="skip-link">İçeriğe Atla</a>

      <header className="site-header" id="site-header">
        <div className="header-container">
          {/* LOGO */}
          <div className="logo">
            <Link to={getLocalizedPath('/')} onClick={handleLogoClick} aria-label="Ana Sayfa — Bürobig">
              <img
                src={logoUrl}
                alt="Bürobig"
                width="130"
                height="44"
                className="logo__img"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* MAIN NAV: Center aligned */}
          <nav className="main-nav" aria-label="Ana Menü">
            <ul role="list">
              <li 
                id="nav-urunler-li" 
                className={`has-dropdown ${isUrunlerOpen ? 'is-open' : ''}`}
              >
                <a 
                  href="#" 
                  id="nav-urunler" 
                  aria-haspopup="true" 
                  aria-expanded={isUrunlerOpen}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsUrunlerOpen(!isUrunlerOpen);
                  }}
                >
                  Ürünler
                  <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
                {/* Mega Menu */}
                <div className="mega-menu" aria-label="Ürün Kategorileri">
                  <div className="mega-menu__container">
                    {/* Masalar */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">MASALAR</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/ust-yonetici-masalari')}>Üst Yönetici Masaları</Link></li>
                        <li><Link to={getLocalizedPath('/yonetici-masalari')}>Yönetici Masaları</Link></li>
                        <li><Link to={getLocalizedPath('/calisma-masalari')}>Çalışma Masaları</Link></li>
                        <li><Link to={getLocalizedPath('/operasyonel-masalar')}>Operasyonel Masalar</Link></li>
                        <li><Link to={getLocalizedPath('/toplanti-masalari')}>Toplantı Masaları</Link></li>
                      </ul>
                    </div>
                    {/* Ofis Koltukları */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">OFİS KOLTUKLARI</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/yonetici-koltuklari')}>Yönetici Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/calisma-koltuklari')}>Çalışma Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/misafir-ve-bekleme-koltuklari')}>Misafir ve Bekleme Koltukları</Link></li>
                      </ul>
                    </div>
                    {/* Koltuklar / Kanepeler */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">KOLTUKLAR / KANEPELER</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/koltuklar')}>Koltuklar</Link></li>
                        <li><Link to={getLocalizedPath('/kanepeler')}>Kanepeler</Link></li>
                        <li><Link to={getLocalizedPath('/sandalyeler')}>Sandalyeler</Link></li>
                        <li><Link to={getLocalizedPath('/bekleme-alanlari')}>Bekleme Alanları</Link></li>
                      </ul>
                    </div>
                    {/* Depolama Sistemleri */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">DEPOLAMA SİSTEMLERİ</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/kesonlar')}>Kesonlar</Link></li>
                        <li><Link to={getLocalizedPath('/dolaplar')}>Dolaplar</Link></li>
                        <li><Link to={getLocalizedPath('/kitaplik-ve-raf-sistemleri')}>Kitaplık ve Raf Sistemleri</Link></li>
                      </ul>
                    </div>
                    {/* Tamamlayıcılar */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">TAMAMLAYICILAR</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/sehpalar')}>Sehpalar</Link></li>
                        <li><Link to={getLocalizedPath('/puflar')}>Puflar</Link></li>
                        <li><Link to={getLocalizedPath('/askiliklar')}>Askılıklar</Link></li>
                        <li><Link to={getLocalizedPath('/elektrifikasyon')}>Elektrifikasyon</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-dropdown">
                <Link to={getLocalizedPath('/hikayemiz')} id="nav-kurumsal" aria-haspopup="true" aria-expanded="false">
                  Kurumsal
                  <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                <div className="dropdown-menu" aria-label="Kurumsal Alt Menüsü">
                  <ul className="dropdown-list">
                    <li><Link to={getLocalizedPath('/hikayemiz')}>Hikayemiz</Link></li>
                    <li><Link to={getLocalizedPath('/tasarim-sureci')}>Tasarım Süreci</Link></li>
                    <li><Link to={getLocalizedPath('/manifesto')}>Manifesto</Link></li>
                    <li><Link to={getLocalizedPath('/tasarim-felsefesi')}>Tasarım Felsefesi</Link></li>
                    <li><Link to={getLocalizedPath('/kalite-politikamiz')}>Kalite Politikamız</Link></li>
                    <li><Link to={getLocalizedPath('/surdurulebilirlik')}>Sürdürülebilirlik</Link></li>
                  </ul>
                </div>
              </li>
              <li><Link to={getLocalizedPath('/tasarimcilar')} id="nav-tasarimcilar">Tasarımcılar</Link></li>
              <li><Link to={getLocalizedPath('/blog')} id="nav-blog">Blog</Link></li>
              <li><Link to={getLocalizedPath('/iletisim')} id="nav-iletisim">İletişim</Link></li>
            </ul>
          </nav>

          {/* UTILITY: Right side */}
          <div className="header-utility">
            <a href="#" onClick={(e) => e.preventDefault()} className="utility-link" id="util-shop">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Shop
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="utility-link utility-link--has-line" id="util-portal" style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '0.75rem', gap: '0' }}>
              <svg 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="28.76 59.77 83 22" 
                style={{ height: '18px', width: 'auto', flexShrink: 0, fill: 'currentColor' }}
                aria-hidden="true"
              >
                <path d="M52.57,74.05c-1.7,0-3.08-1.38-3.08-3.08s1.38-3.08,3.08-3.08,3.08,1.38,3.08,3.08-1.39,3.08-3.08,3.08Z" />
                <g>
                  <path d="M58.51,79.49v-16.7h1.57v16.7h-1.57ZM59.3,73.19v-1.41h4.53c1.29,0,2.3-.34,3.03-1.01s1.09-1.6,1.09-2.78v-.02c0-1.18-.37-2.1-1.09-2.77-.73-.67-1.74-1-3.03-1h-4.53v-1.41h4.88c1.06,0,2,.21,2.8.64.8.43,1.43,1.03,1.89,1.81.46.78.68,1.69.68,2.72v.02c0,1.03-.23,1.94-.68,2.73s-1.08,1.39-1.89,1.83c-.8.44-1.74.65-2.8.65h-4.88Z"/>
                  <path d="M76.07,79.71c-1.09,0-2.04-.26-2.87-.77-.83-.51-1.47-1.23-1.93-2.16s-.69-2.04-.69-3.31v-.02c0-1.27.23-2.37.69-3.3.46-.93,1.1-1.65,1.93-2.15.83-.51,1.78-.76,2.86-.76s2.05.25,2.88.76,1.46,1.22,1.93,2.15c.46.93.69,2.03.69,3.31v.02c0,1.28-.23,2.39-.69,3.32-.46.93-1.1,1.65-1.92,2.16-.82.51-1.78.76-2.87.76ZM76.08,78.34c.79,0,1.47-.19,2.06-.58.59-.39,1.04-.95,1.37-1.68.32-.73.49-1.6.49-2.62v-.02c0-1.02-.16-1.89-.49-2.62-.32-.73-.78-1.28-1.37-1.66-.59-.38-1.28-.57-2.08-.57s-1.46.19-2.05.58c-.59.39-1.04.94-1.37,1.67-.33.73-.49,1.59-.49,2.6v.02c0,1.01.16,1.88.49,2.62.33.73.79,1.29,1.37,1.68.59.39,1.28.58,2.07.58Z"/>
                  <path d="M83.59,79.49v-12.04h1.53v2.16h.03c.22-.74.58-1.32,1.09-1.75.51-.42,1.14-.64,1.87-.64.2,0,.39.02.56.05s.3.06.39.09v1.49c-.1-.05-.25-.09-.45-.12-.2-.04-.44-.05-.71-.05-.56,0-1.06.14-1.48.41s-.74.66-.97,1.16c-.23.5-.34,1.09-.34,1.77v7.45h-1.53Z"/>
                  <path d="M94.85,79.71c-.99,0-1.73-.25-2.22-.74-.49-.49-.74-1.26-.74-2.31v-7.93h-1.77v-1.29h1.77v-3.25h1.57v3.25h2.37v1.29h-2.37v7.91c0,.66.14,1.13.42,1.39.28.26.7.39,1.27.39.13,0,.26,0,.38-.02.12-.01.22-.02.31-.03v1.24c-.12.02-.26.04-.45.06-.18.02-.37.03-.55.03Z"/>
                  <path d="M101.21,79.71c-.79,0-1.48-.15-2.08-.45-.6-.3-1.07-.71-1.41-1.25-.33-.54-.5-1.16-.5-1.86v-.02c0-.69.17-1.28.5-1.77.34-.49.83-.89,1.47-1.17.64-.29,1.42-.46,2.34-.52l4.51-.29v1.19l-4.33.29c-.94.07-1.67.3-2.18.69-.51.39-.77.92-.77,1.58v.02c0,.66.25,1.2.76,1.6.51.41,1.17.61,1.98.61.71,0,1.35-.15,1.92-.45s1.02-.7,1.35-1.22.5-1.1.5-1.74v-3.58c0-.87-.26-1.56-.78-2.05-.52-.49-1.25-.74-2.19-.74-.87,0-1.58.2-2.14.59s-.89.93-1.02,1.62l-.02.12h-1.47v-.14c.09-.69.32-1.31.72-1.84.39-.53.93-.95,1.6-1.26.67-.3,1.46-.46,2.36-.46s1.71.16,2.38.49c.67.33,1.18.79,1.55,1.4s.55,1.31.55,2.13v8.24h-1.53v-2.21h-.03c-.22.49-.53.91-.94,1.27-.41.36-.88.65-1.41.85-.53.2-1.1.31-1.69.31Z"/>
                  <path d="M109.49,79.49v-16.7h1.53v16.7h-1.53Z"/>
                </g>
                <path d="M36.25,76.66v-9.05c0-2.87-3.1-5.19-5.53-6.1v10.95c0,2.67.78,4.94,2.85,6.67,2.15,1.67,6.17,1.87,9.46,1.43,4.96-.66,7.35-6.47,2.11-9.03-1.29-.63-5.24-1.41-5.11-2.06.07-.33,1.07-.61,3.12-1.23,2.04-.62,3.89-1.43,3.82-3.16-.04-1.07-.6-1.9-1.43-2.51-.6-.45-1.35-.78-2.15-1.02-1.36-.4-4.7-.61-6.06-.57l.22.57c.76.09,1.57.17,2.19.3,1.59.33,2.55,1.05,3.07,1.99.77,1.41.54,3.38-1.09,4.17-1.01.49-2.89.92-3.88,1.82-.8.73-.66,1.77-.06,2.5.28.35.7.59,1.12.77.68.3,3.07,1.32,3.98,2.47,1.65,2.08-.17,4.66-2.7,4.59-2.01.08-3.89-1.48-3.89-3.49Z"/>
              </svg>
            </a>
            <a href="https://burobig.tahsilat.com.tr/auth/sign-in" target="_blank" rel="noopener noreferrer" className="utility-link utility-link--has-line" id="util-pay">
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

            {/* Mobile Hamburger Menu Toggle Button */}
            <button 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menüyü Aç/Kapat"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="menu-toggle__line"></span>
              <span className="menu-toggle__line"></span>
              <span className="menu-toggle__line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-drawer__content">
            <nav className="mobile-nav" aria-label="Mobil Menü">
              <ul className="mobile-nav__list">
                {/* Ürünler Accordion */}
                <li className="mobile-nav__item">
                  <button 
                    className={`mobile-nav__link mobile-nav__accordion-header ${activeSubmenu === 'urunler' ? 'active' : ''}`}
                    onClick={() => setActiveSubmenu(activeSubmenu === 'urunler' ? null : 'urunler')}
                  >
                    Ürünler
                    <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: activeSubmenu === 'urunler' ? 'rotate(180deg)' : 'none' }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className={`mobile-nav__accordion-content ${activeSubmenu === 'urunler' ? 'active' : ''}`}>
                    {/* Masalar */}
                    <div className="mobile-submenu__section">
                      <h6 className="mobile-submenu__title">MASALAR</h6>
                      <ul>
                        <li><Link to={getLocalizedPath('/ust-yonetici-masalari')} onClick={() => setIsMobileMenuOpen(false)}>Üst Yönetici Masaları</Link></li>
                        <li><Link to={getLocalizedPath('/yonetici-masalari')} onClick={() => setIsMobileMenuOpen(false)}>Yönetici Masaları</Link></li>
                        <li><Link to={getLocalizedPath('/calisma-masalari')} onClick={() => setIsMobileMenuOpen(false)}>Çalışma Masaları</Link></li>
                        <li><Link to={getLocalizedPath('/operasyonel-masalar')} onClick={() => setIsMobileMenuOpen(false)}>Operasyonel Masalar</Link></li>
                        <li><Link to={getLocalizedPath('/toplanti-masalari')} onClick={() => setIsMobileMenuOpen(false)}>Toplantı Masaları</Link></li>
                      </ul>
                    </div>
                    {/* Ofis Koltukları */}
                    <div className="mobile-submenu__section">
                      <h6 className="mobile-submenu__title">OFİS KOLTUKLARI</h6>
                      <ul>
                        <li><Link to={getLocalizedPath('/yonetici-koltuklari')} onClick={() => setIsMobileMenuOpen(false)}>Yönetici Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/calisma-koltuklari')} onClick={() => setIsMobileMenuOpen(false)}>Çalışma Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/misafir-ve-bekleme-koltuklari')} onClick={() => setIsMobileMenuOpen(false)}>Misafir ve Bekleme Koltukları</Link></li>
                      </ul>
                    </div>
                    {/* Diğer Kategoriler */}
                    <div className="mobile-submenu__section">
                      <h6 className="mobile-submenu__title">DİĞER KATEGORİLER</h6>
                      <ul>
                        <li><Link to={getLocalizedPath('/koltuklar-kanepeler')} onClick={() => setIsMobileMenuOpen(false)}>Koltuklar & Kanepeler</Link></li>
                        <li><Link to={getLocalizedPath('/depolama-sistemleri')} onClick={() => setIsMobileMenuOpen(false)}>Depolama Sistemleri</Link></li>
                        <li><Link to={getLocalizedPath('/tamamlayicilar')} onClick={() => setIsMobileMenuOpen(false)}>Tamamlayıcılar</Link></li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* Kurumsal Accordion */}
                <li className="mobile-nav__item">
                  <button 
                    className={`mobile-nav__link mobile-nav__accordion-header ${activeSubmenu === 'kurumsal' ? 'active' : ''}`}
                    onClick={() => setActiveSubmenu(activeSubmenu === 'kurumsal' ? null : 'kurumsal')}
                  >
                    Kurumsal
                    <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: activeSubmenu === 'kurumsal' ? 'rotate(180deg)' : 'none' }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className={`mobile-nav__accordion-content ${activeSubmenu === 'kurumsal' ? 'active' : ''}`}>
                    <ul>
                      <li><Link to={getLocalizedPath('/hikayemiz')} onClick={() => setIsMobileMenuOpen(false)}>Hikayemiz</Link></li>
                      <li><Link to={getLocalizedPath('/tasarim-sureci')} onClick={() => setIsMobileMenuOpen(false)}>Tasarım Süreci</Link></li>
                      <li><Link to={getLocalizedPath('/manifesto')} onClick={() => setIsMobileMenuOpen(false)}>Manifesto</Link></li>
                      <li><Link to={getLocalizedPath('/tasarim-felsefesi')} onClick={() => setIsMobileMenuOpen(false)}>Tasarım Felsefesi</Link></li>
                      <li><Link to={getLocalizedPath('/kalite-politikamiz')} onClick={() => setIsMobileMenuOpen(false)}>Kalite Politikamız</Link></li>
                      <li><Link to={getLocalizedPath('/surdurulebilirlik')} onClick={() => setIsMobileMenuOpen(false)}>Sürdürülebilirlik</Link></li>
                    </ul>
                  </div>
                </li>

                <li className="mobile-nav__item">
                  <Link to={getLocalizedPath('/tasarimcilar')} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>Tasarımcılar</Link>
                </li>
                <li className="mobile-nav__item">
                  <Link to={getLocalizedPath('/blog')} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                </li>
                <li className="mobile-nav__item">
                  <Link to={getLocalizedPath('/iletisim')} className="mobile-nav__link" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
