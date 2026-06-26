import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { getActiveProducts } from '../../services/publicContentService';
import { resolveField } from '@coreweb/shared-ui';
import './burobig.css';

export default function BurobigHeader() {
  const { tenantMapping, activeLang, settings } = useSite();
  const translate = (tr, en) => activeLang === 'tr' ? tr : en;
  
  const getSplitProducts = (items) => {
    if (!items || items.length === 0) return { popular: [], featured: [] };
    if (items.length <= 3) {
      const half = Math.ceil(items.length / 2);
      return {
        popular: items.slice(0, half),
        featured: items.slice(half)
      };
    }
    const limit = Math.min(3, Math.ceil(items.length / 2));
    return {
      popular: items.slice(0, limit),
      featured: items.slice(limit, limit + 3)
    };
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // 'urunler' | 'kurumsal' | null
  const [isUrunlerOpen, setIsUrunlerOpen] = useState(false);
  const [isKurumsalOpen, setIsKurumsalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    setIsUrunlerOpen(false);
    setIsKurumsalOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Fetch products when search modal opens
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 80);
      if (products.length === 0) {
        getActiveProducts(tenantMapping.tenantId)
          .then(raw => {
            setProducts(raw || []);
          })
          .catch(err => {
            console.error('Error fetching products for search:', err);
          });
      }
    } else {
      document.body.style.overflow = '';
      setSearchQuery('');
      setSearchResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, tenantMapping.tenantId]);

  // Close search overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  // Clientside search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const queryLower = searchQuery.toLowerCase().trim();
    const filtered = products.filter(p => {
      const title = (resolveField(p, activeLang, 'title') || resolveField(p, activeLang, 'name') || '').toLowerCase();
      const desc = (resolveField(p, activeLang, 'description') || '').toLowerCase();
      const category = (resolveField(p, activeLang, 'category') || '').toLowerCase();
      const subcategory = (resolveField(p, activeLang, 'subcategory') || '').toLowerCase();
      return title.includes(queryLower) || desc.includes(queryLower) || category.includes(queryLower) || subcategory.includes(queryLower);
    }).map(p => ({
      ...p,
      title: resolveField(p, activeLang, 'title') || resolveField(p, activeLang, 'name') || '',
      slug: resolveField(p, activeLang, 'slug') || p.slug || p.id,
      categoryName: resolveField(p, activeLang, 'category') || ''
    }));
    setSearchResults(filtered);
  }, [searchQuery, products, activeLang]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navUrunlerLi = document.getElementById('nav-urunler-li');
      if (navUrunlerLi && !navUrunlerLi.contains(event.target)) {
        setIsUrunlerOpen(false);
      }
      const navKurumsalLi = document.getElementById('nav-kurumsal-li');
      if (navKurumsalLi && !navKurumsalLi.contains(event.target)) {
        setIsKurumsalOpen(false);
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
  const { popular: popularProducts, featured: featuredProducts } = getSplitProducts(products);

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
                onMouseEnter={() => setIsUrunlerOpen(true)}
                onMouseLeave={() => setIsUrunlerOpen(false)}
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
                <div 
                  className="mega-menu" 
                  aria-label="Ürün Kategorileri"
                  onClick={() => setIsUrunlerOpen(false)}
                >
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
              <li 
                id="nav-kurumsal-li"
                className={`has-dropdown ${isKurumsalOpen ? 'is-open' : ''}`}
                onMouseEnter={() => setIsKurumsalOpen(true)}
                onMouseLeave={() => setIsKurumsalOpen(false)}
              >
                <Link 
                  to={getLocalizedPath('/hikayemiz')} 
                  id="nav-kurumsal" 
                  aria-haspopup="true" 
                  aria-expanded={isKurumsalOpen}
                  onClick={() => setIsKurumsalOpen(!isKurumsalOpen)}
                >
                  Kurumsal
                  <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Link>
                <div 
                  className="dropdown-menu" 
                  aria-label="Kurumsal Alt Menüsü"
                  onClick={() => setIsKurumsalOpen(false)}
                >
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
            <a href="#" onClick={(e) => e.preventDefault()} className="utility-link utility-link--has-line" id="util-portal" style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: '0.75rem', gap: '0.15rem' }}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="28.76 59.77 28 22" 
                style={{ height: '18px', width: 'auto', flexShrink: 0, fill: 'currentColor' }}
                aria-hidden="true"
              >
                <path d="M36.25,76.66v-9.05c0-2.87-3.1-5.19-5.53-6.1v10.95c0,2.67.78,4.94,2.85,6.67,2.15,1.67,6.17,1.87,9.46,1.43,4.96-.66,7.35-6.47,2.11-9.03-1.29-.63-5.24-1.41-5.11-2.06.07-.33,1.07-.61,3.12-1.23,2.04-.62,3.89-1.43,3.82-3.16-.04-1.07-.6-1.9-1.43-2.51-.6-.45-1.35-.78-2.15-1.02-1.36-.4-4.7-.61-6.06-.57l.22.57c.76.09,1.57.17,2.19.3,1.59.33,2.55,1.05,3.07,1.99.77,1.41.54,3.38-1.09,4.17-1.01.49-2.89.92-3.88,1.82-.8.73-.66,1.77-.06,2.5.28.35.7.59,1.12.77.68.3,3.07,1.32,3.98,2.47,1.65,2.08-.17,4.66-2.7,4.59-2.01.08-3.89-1.48-3.89-3.49Z"/>
                <path d="M52.57,74.05c-1.7,0-3.08-1.38-3.08-3.08s1.38-3.08,3.08-3.08,3.08,1.38,3.08,3.08-1.39,3.08-3.08,3.08Z" />
              </svg>
              Portal
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
            <button 
              className="icon-btn" 
              id="btn-search" 
              aria-label="Arama Yap"
              onClick={() => setIsSearchOpen(true)}
            >
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
                    {/* Koltuklar / Kanepeler */}
                    <div className="mobile-submenu__section">
                      <h6 className="mobile-submenu__title">KOLTUKLAR / KANEPELER</h6>
                      <ul>
                        <li><Link to={getLocalizedPath('/koltuklar')} onClick={() => setIsMobileMenuOpen(false)}>Koltuklar</Link></li>
                        <li><Link to={getLocalizedPath('/kanepeler')} onClick={() => setIsMobileMenuOpen(false)}>Kanepeler</Link></li>
                        <li><Link to={getLocalizedPath('/sandalyeler')} onClick={() => setIsMobileMenuOpen(false)}>Sandalyeler</Link></li>
                        <li><Link to={getLocalizedPath('/bekleme-alanlari')} onClick={() => setIsMobileMenuOpen(false)}>Bekleme Alanları</Link></li>
                      </ul>
                    </div>
                    {/* Depolama Sistemleri */}
                    <div className="mobile-submenu__section">
                      <h6 className="mobile-submenu__title">DEPOLAMA SİSTEMLERİ</h6>
                      <ul>
                        <li><Link to={getLocalizedPath('/kesonlar')} onClick={() => setIsMobileMenuOpen(false)}>Kesonlar</Link></li>
                        <li><Link to={getLocalizedPath('/dolaplar')} onClick={() => setIsMobileMenuOpen(false)}>Dolaplar</Link></li>
                        <li><Link to={getLocalizedPath('/kitaplik-ve-raf-sistemleri')} onClick={() => setIsMobileMenuOpen(false)}>Kitaplık ve Raf Sistemleri</Link></li>
                      </ul>
                    </div>
                    {/* Tamamlayıcılar */}
                    <div className="mobile-submenu__section">
                      <h6 className="mobile-submenu__title">TAMAMLAYICILAR</h6>
                      <ul>
                        <li><Link to={getLocalizedPath('/sehpalar')} onClick={() => setIsMobileMenuOpen(false)}>Sehpalar</Link></li>
                        <li><Link to={getLocalizedPath('/puflar')} onClick={() => setIsMobileMenuOpen(false)}>Puflar</Link></li>
                        <li><Link to={getLocalizedPath('/askiliklar')} onClick={() => setIsMobileMenuOpen(false)}>Askılıklar</Link></li>
                        <li><Link to={getLocalizedPath('/elektrifikasyon')} onClick={() => setIsMobileMenuOpen(false)}>Elektrifikasyon</Link></li>
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

      {/* Arama Overlay (Modal) */}
      {isSearchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label={translate('Arama', 'Search')}>
          <div className="search-overlay__background" onClick={() => setIsSearchOpen(false)} />
          <div className="search-overlay__content">
            <div className="search-overlay__container">
              {/* Header */}
              <div className="search-overlay__header">
                <div className="search-overlay__input-wrapper">
                  <svg className="search-overlay__search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="search-overlay__input"
                    placeholder={translate('Ürün adı, kategori veya detay ara...', 'Search product title, category or details...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button 
                      className="search-overlay__clear" 
                      onClick={() => setSearchQuery('')}
                      aria-label={translate('Temizle', 'Clear')}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button 
                  className="search-overlay__close-btn" 
                  onClick={() => setIsSearchOpen(false)}
                  aria-label={translate('Kapat', 'Close')}
                >
                  <span>{translate('KAPAT', 'CLOSE')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="search-overlay__body">
                {searchQuery.trim() === '' ? (
                  <div className="search-overlay__suggestions">
                    <div className="search-overlay__suggest-col">
                      <h3 className="search-overlay__section-title">
                        {translate('Popüler Ürünler', 'Popular Products')}
                      </h3>
                      <div className="search-overlay__featured-grid">
                        {popularProducts.map(p => {
                          const productSlug = resolveField(p, activeLang, 'slug') || p.slug || p.id;
                          const pTitle = resolveField(p, activeLang, 'title') || resolveField(p, activeLang, 'name') || '';
                          const pImage = p.coverImageUrl || '/assets/burobig/images/INKA 01.jpg';
                          return (
                            <Link 
                              key={p.id}
                              to={getLocalizedPath(`/urunler/${productSlug}`)} 
                              className="search-overlay__featured-item"
                              onClick={() => setIsSearchOpen(false)}
                            >
                              <img src={pImage} alt={pTitle} />
                              <div>
                                <span className="search-overlay__featured-name">{pTitle}</span>
                                <span className="search-overlay__featured-cat">
                                  {resolveField(p, activeLang, 'subcategory') || resolveField(p, activeLang, 'category') || ''}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="search-overlay__suggest-col">
                      <h3 className="search-overlay__section-title">
                        {translate('Öne Çıkan Ürünler', 'Featured Products')}
                      </h3>
                      <div className="search-overlay__featured-grid">
                        {featuredProducts.map(p => {
                          const productSlug = resolveField(p, activeLang, 'slug') || p.slug || p.id;
                          const pTitle = resolveField(p, activeLang, 'title') || resolveField(p, activeLang, 'name') || '';
                          const pImage = p.coverImageUrl || '/assets/burobig/images/INKA 01.jpg';
                          return (
                            <Link 
                              key={p.id}
                              to={getLocalizedPath(`/urunler/${productSlug}`)} 
                              className="search-overlay__featured-item"
                              onClick={() => setIsSearchOpen(false)}
                            >
                              <img src={pImage} alt={pTitle} />
                              <div>
                                <span className="search-overlay__featured-name">{pTitle}</span>
                                <span className="search-overlay__featured-cat">
                                  {resolveField(p, activeLang, 'subcategory') || resolveField(p, activeLang, 'category') || ''}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="search-overlay__results">
                    <h3 className="search-overlay__section-title">
                      {translate(`Arama Sonuçları (${searchResults.length})`, `Search Results (${searchResults.length})`)}
                    </h3>
                    {searchResults.length === 0 ? (
                      <div className="search-overlay__empty">
                        <p>{translate(`"${searchQuery}" için eşleşen bir ürün bulunamadı.`, `No products found matching "${searchQuery}".`)}</p>
                        <span>{translate('Farklı anahtar kelimelerle aramayı deneyebilirsiniz.', 'Please try searching with different keywords.')}</span>
                      </div>
                    ) : (
                      <div className="search-overlay__results-grid">
                        {searchResults.map(p => {
                          const detailPath = getLocalizedPath(`/urunler/${p.slug}`);
                          const pImage = p.coverImageUrl || '/assets/burobig/images/INKA 01.jpg';
                          return (
                            <Link 
                              key={p.id} 
                              to={detailPath} 
                              className="search-overlay__result-card"
                              onClick={() => setIsSearchOpen(false)}
                            >
                              <div className="search-overlay__result-img-wrapper">
                                <img src={pImage} alt={p.title} />
                              </div>
                              <div className="search-overlay__result-info">
                                <h4 className="search-overlay__result-title">{p.title}</h4>
                                <p className="search-overlay__result-category">{p.categoryName || ''}</p>
                              </div>
                              <span className="search-overlay__result-arrow">→</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
