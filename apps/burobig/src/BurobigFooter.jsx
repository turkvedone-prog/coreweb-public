import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';

export default function BurobigFooter() {
  const { tenantMapping, activeLang, settings } = useSite();
    const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerText = settings?.footerDescription || "Doğadan ilham alan yenilikçi çizgilerle, geleceğin premium ofis ve yaşam alanlarını tasarlıyoruz. İhtiyacınıza göre şekillenen, kalite ve konforla buluşan özgün çözümler.";
  const logoUrl = settings?.logos?.footer || "/assets/burobig/images/Burobig%20Logo%20Beyaz.svg";

  return (
    <>
      {/* Footer */}
      <footer className="site-footer" aria-label="Site Footer">
        <div className="footer-wrapper">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <Link to={getLocalizedPath("/")} onClick={scrollToTop} className="footer-logo-link">
                <img src={logoUrl} alt="Bürobig Logo" className="footer-logo" />
              </Link>
              <p>{footerText}</p>
              <div className="footer-socials">
                <a href={settings?.socials?.instagram || "https://instagram.com/burobig"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href={settings?.socials?.facebook || "https://facebook.com/burobig"} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href={settings?.socials?.linkedin || "https://linkedin.com/company/burobig"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Kurumsal</h4>
              <ul className="footer-links">
                <li><Link to={getLocalizedPath('/hikayemiz')}>Hikayemiz</Link></li>
                <li><Link to={getLocalizedPath('/tasarim-sureci')}>Tasarım Süreci</Link></li>
                <li><Link to={getLocalizedPath('/manifesto')}>Manifesto</Link></li>
                <li><Link to={getLocalizedPath('/tasarim-felsefesi')}>Tasarım Felsefesi</Link></li>
                <li><Link to={getLocalizedPath('/kalite-politikamiz')}>Kalite Politikamız</Link></li>
                <li><Link to={getLocalizedPath('/surdurulebilirlik')}>Sürdürülebilirlik</Link></li>
                <li><Link to={getLocalizedPath('/tasarimcilar')}>Tasarımcılar</Link></li>
                <li><Link to={getLocalizedPath('/blog')}>Blog</Link></li>
                <li><Link to={getLocalizedPath('/iletisim')}>İletişim</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Koleksiyonlar</h4>
              <ul className="footer-links">
                <li><Link to={`${getLocalizedPath('/urunler')}#masalar`}>Masalar</Link></li>
                <li><Link to={`${getLocalizedPath('/urunler')}#ofis-koltuklari`}>Ofis Koltukları</Link></li>
                <li><Link to={`${getLocalizedPath('/urunler')}#koltuklar-kanepeler`}>Koltuk & Kanepeler</Link></li>
                <li><Link to={`${getLocalizedPath('/urunler')}#depolama-sistemleri`}>Depolama</Link></li>
                <li><Link to={`${getLocalizedPath('/urunler')}#tamamlayicilar`}>Tamamlayıcılar</Link></li>
              </ul>
            </div>

            <div className="footer-col contact-col">
              <h4>E-Bülten Kayıt</h4>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Yeniliklerden ve özel koleksiyonlarımızdan ilk siz haberdar olun.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="E-posta adresiniz" required aria-label="E-posta adresiniz" />
                <button type="submit" aria-label="Kayıt Ol">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <span>© {new Date().getFullYear()} <strong>Bürobig Ofis Mobilyaları</strong>. Tüm Hakları Saklıdır.</span>
            </div>
            <div className="footer-bottom-right">
              <a href="https://www.coreweb.tr/" target="_blank" rel="noopener noreferrer" aria-label="CoreWeb">
                <img src="/assets/coreweb/coreweb-logo-dark.svg" alt="CoreWeb Logo" className="footer-agency-logo" />
              </a>
              <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Yukarı Git">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Lead Widget */}
      <div className="wa-widget">
        <a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp ile İletişime Geçin">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>
    </>
  );
}
