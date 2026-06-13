import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { Phone, Search, Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import './capilon.css';

export default function CapilonHeader() {
  const { tenantMapping, activeLang } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Her ortamda /:lang prefix kullan (local = production ile aynı)
  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const translate = (tr, en) => activeLang === 'tr' ? tr : en;

  const handleLangChange = (newLang) => {
    if (newLang === activeLang) return;
    const pathSegments = location.pathname.split('/').filter(Boolean);
    pathSegments[0] = newLang; // lang her zaman index 0
    navigate('/' + pathSegments.join('/'));
    setLangDropdownOpen(false);
  };

  const getLanguageLabel = (code) => {
    const labels = { tr: 'Türkçe', en: 'English' };
    return labels[code] || code.toUpperCase();
  };

  // Header Scroll and Direction logic
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
            header.classList.add('hidden-header');
          } else if (currentScrollY < lastScrollY) {
            header.classList.remove('hidden-header');
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


  const enabledLangs = tenantMapping?.enabledLanguages || ['tr'];

  return (
    <>
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
            <Link to={getLocalizedPath('/hikayemiz')}>{translate('Hakkımızda', 'About Us')}</Link>
            <a href="#evlilik-paketleri">{translate('Evlilik Paketleri', 'Wedding Packages')}</a>
            <Link to={getLocalizedPath('/magazalarimiz')}>{translate('Mağazalarımız', 'Our Stores')}</Link>
            <a href="#sanal-magaza">{translate('Sanal Mağaza', 'Virtual Store')}</a>
            <Link to={getLocalizedPath('/blog')}>{translate('Blog', 'Blog')}</Link>
          </div>
          <div className="utility-right">
            <a href="tel:+903123790333" className="whatsapp-link">
              <Phone size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              0312 379 03 33
            </a>
            <Link to={getLocalizedPath('/iletisim')}>{translate('İletişim', 'Contact')}</Link>
            
            {/* Language Selector */}
            {enabledLangs.length > 1 && (
              <div className="lang-dropdown-wrapper" style={{ position: 'relative' }}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="lang-selector"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'inherit' }}
                >
                  <img
                    src={`https://flagcdn.com/w20/${activeLang === 'en' ? 'gb' : activeLang}.png`}
                    width="16"
                    alt={activeLang}
                    style={{ verticalAlign: 'middle', marginRight: '6px' }}
                  />
                  {activeLang.toUpperCase()}{' '}
                  <ChevronDown size={10} style={{ display: 'inline', marginLeft: '4px' }} />
                </button>
                {langDropdownOpen && (
                  <div
                    className="lang-dropdown-menu"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '8px',
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(74, 69, 65, 0.1)',
                      borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      padding: '4px 0',
                      zIndex: 1001,
                      minWidth: '110px'
                    }}
                  >
                    {enabledLangs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLangChange(lang)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '8px 12px',
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '12px',
                          fontWeight: lang === activeLang ? '600' : '400',
                          color: '#414042',
                          backgroundColor: lang === activeLang ? 'rgba(74, 69, 65, 0.05)' : 'transparent'
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/w20/${lang === 'en' ? 'gb' : lang}.png`}
                          width="16"
                          alt={lang}
                        />
                        {getLanguageLabel(lang)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Ana Header (Logo, Arama, İkonlar) */}
      <header className="site-header-solid" id="site-header">
        <div className="header-container main-header-row">
          <div className="header-brand">
            <button className="hamburger-btn" aria-label="Menü" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <Link to={getLocalizedPath('/')} aria-label="Ana Sayfa — Capilon Mobilya" className="capilon-logo-link">
              <img src="/assets/capilon/images/CapilonMobilya_Logo.svg" alt="Capilon Mobilya Logo" className="logo__img" />
            </Link>
          </div>

          <div className="header-search">
            <form action="#" method="GET" className="search-form-mondi" onSubmit={(e) => e.preventDefault()}>
              <span className="search-icon-left">
                <Search size={20} />
              </span>
              <input type="text" name="q" placeholder={translate('Site içi ürün arama', 'Search products...')} aria-label="Arama" />
              <button type="submit" className="search-btn-right">
                {translate('ARA', 'SEARCH')}
              </button>
            </form>
          </div>

          <div className="header-actions">
            <Link to={getLocalizedPath('/koleksiyonlar')} className="header-collection-btn">
              {translate('KOLEKSİYON', 'COLLECTIONS')}
            </Link>
            <a href="#e-tahsilat" className="action-icon">
              <ShoppingBag size={20} />
              <span>{translate('E-Tahsilat', 'E-Payment')}</span>
            </a>
          </div>
        </div>

        {/* 4. Ana Menü (Navigasyon) */}
        <nav className="main-nav-row" aria-label="Ana Menü">
          <div className="header-container">
            <ul role="list" className="nav-list">
              <li><Link to={getLocalizedPath('/koleksiyonlar/yemek-odalari')}>{translate('YEMEK ODALARI', 'DINING ROOMS')}</Link></li>
              <li><a href={getLocalizedPath('/#yatak')}>{translate('YATAK ODALARI', 'BEDROOMS')}</a></li>
              <li>
                <a href={getLocalizedPath('/#koltuk')}>
                  {translate('KOLTUK TAKIMLARI', 'LIVING ROOM SETS')}
                </a>
              </li>
              <li><a href={getLocalizedPath('/#kose')}>{translate('KÖŞE TAKIMLARI', 'CORNER SOFAS')}</a></li>
              <li><a href={getLocalizedPath('/#tv')}>{translate('TV ÜNİTELERİ', 'TV UNITS')}</a></li>
              <li><a href={getLocalizedPath('/#genc')}>{translate('ÇOCUK & GENÇ ODALARI', 'KIDS & TEEN ROOMS')}</a></li>
              <li><a href={getLocalizedPath('/#tekil')}>{translate('TEKİL ÜRÜNLER', 'SINGLE PRODUCTS')}</a></li>
              <li><a href={getLocalizedPath('/#yatak-baza')}>{translate('YATAK & BAZA', 'MATTRESSES & BASES')}</a></li>
              <li><a href={getLocalizedPath('/#tamamlayici')}>{translate('TAMAMLAYICI ÜRÜNLER', 'COMPLEMENTARY PRODUCTS')}</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setMobileMenuOpen(false)}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 1002, 
            background: 'rgba(0,0,0,0.5)', 
            backdropFilter: 'blur(4px)',
            display: 'flex', 
            justifyContent: 'flex-start',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div 
            className="mobile-menu-container animate-slide-right" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '300px', 
              background: '#ffffff', 
              height: '100%', 
              padding: '30px 20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px', 
              position: 'relative',
              boxShadow: '4px 0 25px rgba(0,0,0,0.1)'
            }}
          >
            <button 
              style={{ 
                position: 'absolute', 
                right: '20px', 
                top: '20px', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#414042'
              }} 
              onClick={() => setMobileMenuOpen(false)}
              aria-label={translate('Kapat', 'Close')}
            >
              <X size={24} />
            </button>
            
            {/* Logo in Drawer */}
            <div style={{ marginTop: '20px', borderBottom: '1px solid rgba(74, 69, 65, 0.1)', paddingBottom: '20px' }}>
              <img src="/assets/capilon/images/CapilonMobilya_Logo.svg" alt="Capilon Mobilya Logo" style={{ height: '28px' }} />
            </div>

            {/* Menu Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto', flex: 1 }}>
              <Link to={getLocalizedPath('/koleksiyonlar/yemek-odalari')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('YEMEK ODALARI', 'DINING ROOMS')}</Link>
              <a href={getLocalizedPath('/#yatak')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('YATAK ODALARI', 'BEDROOMS')}</a>
              <a href={getLocalizedPath('/#koltuk')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('KOLTUK TAKIMLARI', 'LIVING ROOM SETS')}</a>
              <a href={getLocalizedPath('/#kose')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('KÖŞE TAKIMLARI', 'CORNER SOFAS')}</a>
              <a href={getLocalizedPath('/#tv')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('TV ÜNİTELERİ', 'TV UNITS')}</a>
              <a href={getLocalizedPath('/#genc')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('ÇOCUK & GENÇ ODALARI', 'KIDS & TEEN ROOMS')}</a>
              <a href={getLocalizedPath('/#tekil')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('TEKİL ÜRÜNLER', 'SINGLE PRODUCTS')}</a>
              <a href={getLocalizedPath('/#yatak-baza')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('YATAK & BAZA', 'MATTRESSES & BASES')}</a>
              <a href={getLocalizedPath('/#tamamlayici')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: '600', color: '#414042', textDecoration: 'none' }}>{translate('TAMAMLAYICI ÜRÜNLER', 'COMPLEMENTARY PRODUCTS')}</a>
              
              <div style={{ borderTop: '1px solid rgba(74, 69, 65, 0.1)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Link to={getLocalizedPath('/hikayemiz')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: '500', color: '#666', textDecoration: 'none' }}>{translate('Hakkımızda', 'About Us')}</Link>
                <Link to={getLocalizedPath('/magazalarimiz')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: '500', color: '#666', textDecoration: 'none' }}>{translate('Mağazalarımız', 'Our Stores')}</Link>
                <Link to={getLocalizedPath('/blog')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: '500', color: '#666', textDecoration: 'none' }}>{translate('Blog', 'Blog')}</Link>
                <Link to={getLocalizedPath('/iletisim')} onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '14px', fontWeight: '500', color: '#666', textDecoration: 'none' }}>{translate('İletişim', 'Contact')}</Link>
              </div>
            </div>
            
            {/* Language Switcher in Drawer */}
            <div style={{ borderTop: '1px solid rgba(74, 69, 65, 0.1)', paddingTop: '15px', display: 'flex', gap: '12px' }}>
              {enabledLangs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    handleLangChange(lang);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    background: lang === activeLang ? '#f58220' : 'transparent',
                    color: lang === activeLang ? '#fff' : '#414042',
                    border: '1px solid rgba(74, 69, 65, 0.2)',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
