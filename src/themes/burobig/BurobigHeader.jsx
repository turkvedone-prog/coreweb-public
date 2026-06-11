import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';

export default function BurobigHeader() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;
  
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
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
            <Link to={getLocalizedPath('/')} aria-label="Ana Sayfa — Bürobig">
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
                        <li><Link to={getLocalizedPath('/ust-yonetici')}>Üst Yönetici</Link></li>
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
                        <li><Link to={getLocalizedPath('/ofis-koltuklari')}>Yönetici Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/ofis-koltuklari')}>Çalışma Koltukları</Link></li>
                        <li><Link to={getLocalizedPath('/ofis-koltuklari')}>Misafir ve Bekleme Koltukları</Link></li>
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
                    {/* Depolama Sistemleri */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">DEPOLAMA SİSTEMLERİ</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/urunler?cat=depolama-sistemleri&sub=kesonlar')}>Kesonlar</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=depolama-sistemleri&sub=dolaplar')}>Dolaplar</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=depolama-sistemleri&sub=kitaplik-raf')}>Kitaplık ve Raf Sistemleri</Link></li>
                      </ul>
                    </div>
                    {/* Tamamlayıcılar */}
                    <div className="mega-menu__col">
                      <h5 className="mega-menu__title">TAMAMLAYICILAR</h5>
                      <ul className="mega-menu__list">
                        <li><Link to={getLocalizedPath('/urunler?cat=tamamlayicilar&sub=sehpalar')}>Sehpalar</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=tamamlayicilar&sub=puflar')}>Puflar</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=tamamlayicilar&sub=askiliklar')}>Askılıklar</Link></li>
                        <li><Link to={getLocalizedPath('/urunler?cat=tamamlayicilar&sub=elektrifikasyon')}>Elektrifikasyon</Link></li>
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
    </>
  );
}
