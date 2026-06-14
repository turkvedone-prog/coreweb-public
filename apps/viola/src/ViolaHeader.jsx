import { useState, useEffect } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import './viola.css';

export default function ViolaHeader() {
  const { activeLang, tenantMapping } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 50);

          if (currentScrollY > lastScrollY && currentScrollY > 150) {
            setHeaderHidden(true); // scrolling down -> hide
          } else if (currentScrollY < lastScrollY) {
            setHeaderHidden(false); // scrolling up -> show
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

  // Handle clicking outside to close language menu
  useEffect(() => {
    const closeMenus = () => {
      setLangMenuOpen(false);
    };
    document.addEventListener('click', closeMenus);
    return () => document.removeEventListener('click', closeMenus);
  }, []);

  const toggleLangMenu = (e) => {
    e.stopPropagation();
    setLangMenuOpen(!langMenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const tenantSlug = tenantMapping?.tenantSlug || 'viola';
  const prefix = `/${tenantSlug}/${activeLang}`;

  return (
    <header 
      className={`site-header ${scrolled ? 'scrolled' : ''} ${headerHidden ? 'hidden' : ''}`} 
      id="site-header"
      style={{ display: 'block' }}
    >
      <div className="header-container">
        {/* LOGO */}
        <div className="logo">
          <a href={`${prefix}/`} aria-label="Ana Sayfa — Viola">
            <img
              src="/assets/viola/images/viola-logo.svg"
              alt="Viola"
              width="130"
              height="44"
              className="logo__img"
              loading="eager"
            />
          </a>
        </div>

        {/* ANA NAV */}
        <nav className={`main-nav ${mobileMenuOpen ? 'main-nav--active' : ''}`} aria-label="Ana Menü">
          <ul role="list">
            <li className="has-dropdown">
              <a href="#urunler" id="nav-urunler" onClick={(e) => handleSmoothScroll(e, '#koleksiyonlar')}>
                Ürünler
                <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
            </li>
            <li><a href="#hakkimizda" onClick={(e) => handleSmoothScroll(e, '#sanal-tur')}>Hakkımızda</a></li>
            <li><a href="#magazalar" onClick={(e) => handleSmoothScroll(e, '#contact')}>Mağazalar</a></li>
            <li><a href="#projeler" onClick={(e) => handleSmoothScroll(e, '#koleksiyonlar')}>Projeler</a></li>
            <li><a href="#blog" onClick={(e) => handleSmoothScroll(e, '#blog')}>Blog</a></li>
          </ul>
        </nav>

        {/* UTILITY */}
        <div className="header-utility">
          <a href="#katalog" className="icon-btn utility-icon" aria-label="E-Katalog">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-text" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
          </a>
          <div className="utility-divider"></div>
          <a href="#referanslar" className="icon-btn utility-icon" aria-label="Referanslar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
            </svg>
          </a>
          <div className="utility-divider"></div>
          
          <a href="#iletisim" className="utility-link" onClick={(e) => handleSmoothScroll(e, '#contact')}>İletişim</a>
          <div className="utility-divider"></div>

          {/* Lang Selector */}
          <div className="utility-dropdown">
            <button 
              className="utility-link utility-lang" 
              id="util-lang" 
              aria-label="Dil seç" 
              onClick={toggleLangMenu}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <img 
                src="https://flagcdn.com/tr.svg" 
                alt="TR" 
                style={{ width: '1.3rem', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} 
              />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={`lang-dropdown-menu ${langMenuOpen ? 'show' : ''}`} style={{ textAlign: 'center', minWidth: '60px', display: langMenuOpen ? 'flex' : 'none', flexDirection: 'column', gap: '12px', padding: '12px 0' }}>
              <a href="#en" title="English" style={{ display: 'block' }}>
                <img src="https://flagcdn.com/gb.svg" alt="EN" style={{ width: '1.3rem', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
              </a>
              <a href="#de" title="Deutsch" style={{ display: 'block' }}>
                <img src="https://flagcdn.com/de.svg" alt="DE" style={{ width: '1.3rem', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
              </a>
            </div>
          </div>
          
          {/* Mobile hamburger menu toggle */}
          <button 
            className="icon-btn mobile-menu-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Menü"
            style={{ display: 'none' }} /* Show only on media queries */
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
