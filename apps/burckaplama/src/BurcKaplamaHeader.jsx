import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { Menu, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import './burckaplama.css';

export default function BurcKaplamaHeader() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    if (path === '/') return prefix + '/';
    return `${prefix}${path}`;
  };

  const handleLangChange = (newLang) => {
    if (newLang === activeLang) return;
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langIndex = isLocalOrPortal ? 1 : 0;
    
    if (pathSegments.length > langIndex) {
      pathSegments[langIndex] = newLang;
    } else {
      if (isLocalOrPortal) {
        pathSegments[0] = tenantSlug;
        pathSegments[1] = newLang;
      } else {
        pathSegments[0] = newLang;
      }
    }
    navigate('/' + pathSegments.join('/'));
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleAccordion = (name) => {
    if (activeAccordion === name) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(name);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enabledLangs = tenantMapping?.enabledLanguages && tenantMapping.enabledLanguages.length > 1
    ? tenantMapping.enabledLanguages
    : ['tr', 'en'];

  const isHomePage = 
    location.pathname === getLocalizedPath('/') || 
    location.pathname === getLocalizedPath('') || 
    location.pathname === '/' ||
    location.pathname.endsWith('/anasayfa') ||
    location.pathname.endsWith('/anasayfa/');

  return (
    <header className={`bk-header ${scrolled ? 'scrolled' : ''} ${isHomePage ? 'bk-header-home' : 'bk-header-page'}`}>
      <div className="bk-header-inner-wrapper">
        {/* DESKTOP HEADER */}
        <div className="bk-desktop-header-split">
          {/* Left Navigation Placeholder for Grid Symmetry (Hidden when scrolled) */}
          <div style={scrolled ? { display: 'none' } : {}} />

          {/* Center Logo */}
          <div className="bk-logo-center" style={scrolled ? { position: 'absolute', left: '-40px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', boxShadow: 'none', zIndex: 1010 } : {}}>
            <a href="#anasayfa" className="bk-logo-link" style={scrolled ? { background: 'transparent', boxShadow: 'none', border: 'none', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}>
              <img 
                src="/assets/burckaplama/BurcKaplama_Logo.png" 
                alt="Burç Kaplama" 
                className="bk-logo-img" 
                style={scrolled ? { height: '94px', width: '94px', objectFit: 'contain', background: 'transparent', clipPath: 'circle(48.5% at 50% 50%)' } : { clipPath: 'circle(48.5% at 50% 50%)' }} 
              />
            </a>
          </div>

          {/* Single Navigation List on the right containing all items */}
          <nav className="bk-nav-side bk-nav-right">
            <ul className="bk-nav">
              {/* ÜRÜNLER */}
              <li className="bk-nav-item">
                <a 
                  href="#urunler" 
                  className="bk-nav-link"
                >
                  {activeLang === 'tr' ? 'Ürünler' : 'Products'}
                </a>
              </li>

              {/* HAKKIMIZDA */}
              <li className="bk-nav-item">
                <a 
                  href="#hakkimizda" 
                  className="bk-nav-link"
                >
                  {activeLang === 'tr' ? 'Hakkımızda' : 'About'}
                </a>
              </li>

              {/* PROJELER */}
              <li className="bk-nav-item">
                <a 
                  href="#projeler" 
                  className="bk-nav-link"
                >
                  {activeLang === 'tr' ? 'Projeler' : 'Projects'}
                </a>
              </li>

              {/* HABERLER */}
              <li className="bk-nav-item">
                <a 
                  href="#blog" 
                  className="bk-nav-link"
                >
                  {activeLang === 'tr' ? 'Haberler' : 'News'}
                </a>
              </li>

              {/* BLOG */}
              <li className="bk-nav-item">
                <a 
                  href="#blog" 
                  className="bk-nav-link"
                >
                  {activeLang === 'tr' ? 'Blog' : 'Blog'}
                </a>
              </li>

              {/* İLETİŞİM */}
              <li className="bk-nav-item">
                <a 
                  href="#iletisim" 
                  className="bk-nav-link"
                >
                  {activeLang === 'tr' ? 'İletişim' : 'Contact'}
                </a>
              </li>

            </ul>
          </nav>
        </div>

        {/* Separated Extras Pinned to the Far Right */}
        <div className="bk-header-extras">
          <div className="bk-lang-dropdown-wrapper">
            <span className="bk-lang-text-link">
              {activeLang.toUpperCase()}
            </span>
          </div>
          <div className="bk-header-separator" />
          <button className="bk-header-search-btn" aria-label="Search">
            <Search size={16} />
          </button>
        </div>

        {/* MOBILE HEADER BAR */}
        <div className="bk-mobile-header-bar">
          <div className="bk-logo-block">
            <a href="#anasayfa" className="bk-logo-link" style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}>
              <img 
                src="/assets/burckaplama/BurcKaplama_Logo.png" 
                alt="Burç Kaplama" 
                className="bk-logo-img" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain', clipPath: 'circle(48.5% at 50% 50%)' }} 
              />
            </a>
          </div>
          <div className="bk-mobile-header-right">
            {/* LANG SELECTOR FOR MOBILE */}
            <div className="bk-lang-dropdown-wrapper">
              <span className="bk-lang-text-link">
                {activeLang.toUpperCase()}
              </span>
            </div>
            
            {/* MOBILE MENU TOGGLE */}
            <button 
              className="bk-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`bk-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="bk-mobile-nav">
          <ul className="bk-mobile-menu">
            {/* ÜRÜNLER */}
            <li className="bk-mobile-menu-item">
              <a 
                href="#urunler" 
                className="bk-mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {activeLang === 'tr' ? 'Ürünler' : 'Products'}
              </a>
            </li>

            {/* HAKKIMIZDA */}
            <li className="bk-mobile-menu-item">
              <a 
                href="#hakkimizda" 
                className="bk-mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {activeLang === 'tr' ? 'Hakkımızda' : 'About'}
              </a>
            </li>

            {/* PROJELER */}
            <li className="bk-mobile-menu-item">
              <a 
                href="#projeler" 
                className="bk-mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {activeLang === 'tr' ? 'Projeler' : 'Projects'}
              </a>
            </li>

            {/* HABERLER LINK */}
            <li className="bk-mobile-menu-item">
              <a 
                href="#blog" 
                className="bk-mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {activeLang === 'tr' ? 'Haberler' : 'News'}
              </a>
            </li>

            {/* BLOG LINK */}
            <li className="bk-mobile-menu-item">
              <a 
                href="#blog" 
                className="bk-mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {activeLang === 'tr' ? 'Blog' : 'Blog'}
              </a>
            </li>

            {/* İLETİŞİM */}
            <li className="bk-mobile-menu-item">
              <a 
                href="#iletisim" 
                className="bk-mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {activeLang === 'tr' ? 'İletişim' : 'Contact'}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
