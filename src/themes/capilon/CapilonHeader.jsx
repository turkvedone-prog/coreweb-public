import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { Phone, Search, Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';

export default function CapilonHeader() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaFeaturedImg, setMegaFeaturedImg] = useState('/assets/capilon/images/hero_living_room_1779477814666.png');

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
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
            <Link to={getLocalizedPath('/blog')}>{translate('Blog', 'Blog')}</Link>
          </div>
          <div className="utility-right">
            <a href="tel:+903123790333" className="whatsapp-link">
              <Phone size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              0312 379 03 33
            </a>
            <Link to={getLocalizedPath('/iletisim')}>{translate('İletişim', 'Contact')}</Link>
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
      <header className="site-header-solid" id="site-header">
        <div className="header-container main-header-row">
          <div className="header-brand">
            <button className="hamburger-btn" aria-label="Menü" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <Link to={getLocalizedPath('/')} aria-label="Ana Sayfa — Capilon Mobilya" className="capilon-logo-link">
              <img src="/assets/capilon/images/Capilon-Mobilya-Logo.svg" alt="Capilon Mobilya Logo" className="logo__img" />
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
              <li><a href={getLocalizedPath('/#yemek')}>{translate('YEMEK ODALARI', 'DINING ROOMS')}</a></li>
              <li><a href={getLocalizedPath('/#yatak')}>{translate('YATAK ODALARI', 'BEDROOMS')}</a></li>
              <li className="has-mega-menu">
                <a href={getLocalizedPath('/#koltuk')}>
                  {translate('KOLTUK TAKIMLARI', 'LIVING ROOM SETS')} <ChevronDown className="chevron-down" size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                </a>
                <div className="mega-menu">
                  <div className="mega-menu-inner">
                    <div className="mega-menu-categories">
                      {megaMenuItems.map((item, idx) => (
                        <a
                          key={idx}
                          href={getLocalizedPath('/#koltuk')}
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
        <div className="mobile-menu-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1002, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-start' }}>
          <div className="mobile-menu-container" style={{ width: '280px', background: '#faf8f5', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            <button style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href={getLocalizedPath('/#yemek')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Yemek Odaları', 'Dining Rooms')}</a>
              <a href={getLocalizedPath('/#yatak')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Yatak Odaları', 'Bedrooms')}</a>
              <a href={getLocalizedPath('/#koltuk')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Koltuk Takımları', 'Living Room Sets')}</a>
              <a href={getLocalizedPath('/#kose')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Köşe Takımları', 'Corner Sofas')}</a>
              <a href={getLocalizedPath('/#tv')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('TV Üniteleri', 'TV Units')}</a>
              <a href={getLocalizedPath('/#genc')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Çocuk & Genç Odaları', 'Kids & Teen Rooms')}</a>
              <a href={getLocalizedPath('/#tekil')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Tekil Ürünler', 'Single Products')}</a>
              <a href={getLocalizedPath('/#yatak-baza')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Yatak & Baza', 'Mattresses & Bases')}</a>
              <a href={getLocalizedPath('/#tamamlayici')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('Tamamlayıcı Ürünler', 'Complementary Products')}</a>
              <Link to={getLocalizedPath('/iletisim')} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>{translate('İletişim', 'Contact')}</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
