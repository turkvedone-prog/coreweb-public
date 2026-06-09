import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';

export default function BurcKaplamaHeader() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const [scrolled, setScrolled] = useState(false);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bk-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="bk-header-container">
        <div className="bk-logo">
          <Link to={getLocalizedPath('/')} className="bk-logo-link">
            <div className="bk-logo-badge">B</div>
            <span>Burç Kaplama</span>
          </Link>
        </div>

        <nav>
          <ul className="bk-nav">
            <li>
              <Link to={getLocalizedPath('/')} className="bk-nav-link active">
                {activeLang === 'tr' ? 'Ana Sayfa' : 'Home'}
              </Link>
            </li>
            <li>
              <Link to={getLocalizedPath('/urunler')} className="bk-nav-link">
                {activeLang === 'tr' ? 'Ürünler' : 'Products'}
              </Link>
            </li>
            <li>
              <Link to={getLocalizedPath('/hikayemiz')} className="bk-nav-link">
                {activeLang === 'tr' ? 'Hikayemiz' : 'Our Story'}
              </Link>
            </li>
            <li>
              <Link to={getLocalizedPath('/iletisim')} className="bk-nav-link">
                {activeLang === 'tr' ? 'İletişim' : 'Contact'}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="bk-header-actions">
          <button className="bk-lang-btn">
            {activeLang.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
