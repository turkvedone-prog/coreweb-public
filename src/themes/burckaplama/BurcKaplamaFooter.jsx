import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';

export default function BurcKaplamaFooter() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  return (
    <footer className="bk-footer">
      <div className="bk-footer-container">
        <div className="bk-footer-brand">
          <Link to={getLocalizedPath('/')} className="bk-logo-link">
            <div className="bk-logo-badge">B</div>
            <span style={{ color: '#ffffff' }}>Burç Kaplama</span>
          </Link>
          <p className="bk-footer-desc">
            {activeLang === 'tr' 
              ? 'Premium ahşap kaplama ve yüzey çözümleriyle mekanlarınıza doğallık ve zarafet katıyoruz.' 
              : 'Adding naturalness and elegance to your spaces with premium wood veneer and surface solutions.'}
          </p>
        </div>

        <div>
          <h4 className="bk-footer-title">{activeLang === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}</h4>
          <ul className="bk-footer-links">
            <li><Link to={getLocalizedPath('/')}>{activeLang === 'tr' ? 'Ana Sayfa' : 'Home'}</Link></li>
            <li><Link to={getLocalizedPath('/urunler')}>{activeLang === 'tr' ? 'Ürünler' : 'Products'}</Link></li>
            <li><Link to={getLocalizedPath('/hikayemiz')}>{activeLang === 'tr' ? 'Hikayemiz' : 'Our Story'}</Link></li>
            <li><Link to={getLocalizedPath('/iletisim')}>{activeLang === 'tr' ? 'İletişim' : 'Contact'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="bk-footer-title">{activeLang === 'tr' ? 'Koleksiyonlar' : 'Collections'}</h4>
          <ul className="bk-footer-links">
            <li><a href="#veneer">{activeLang === 'tr' ? 'Ahşap Kaplama' : 'Wood Veneer'}</a></li>
            <li><a href="#panels">{activeLang === 'tr' ? 'Dekoratif Paneller' : 'Decorative Panels'}</a></li>
            <li><a href="#special">{activeLang === 'tr' ? 'Özel Tasarımlar' : 'Special Projects'}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="bk-footer-title">{activeLang === 'tr' ? 'İletişim' : 'Contact Us'}</h4>
          <div className="bk-footer-contact">
            <p>Organize Sanayi Bölgesi, Bursa, Türkiye</p>
            <p>E: info@burckaplama.com.tr</p>
            <p>T: +90 224 000 00 00</p>
          </div>
        </div>
      </div>

      <div className="bk-footer-bottom">
        <p className="bk-footer-copyright">
          &copy; {new Date().getFullYear()} Burç Kaplama. {activeLang === 'tr' ? 'Tüm Hakları Saklıdır.' : 'All Rights Reserved.'}
        </p>
        <div className="bk-footer-legal">
          <a href="#privacy">{activeLang === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}</a>
          <a href="#terms">{activeLang === 'tr' ? 'Kullanım Koşulları' : 'Terms of Use'}</a>
        </div>
      </div>
    </footer>
  );
}
