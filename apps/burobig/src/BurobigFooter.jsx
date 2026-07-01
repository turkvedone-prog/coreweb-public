import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import './burobig.css';

export default function BurobigFooter() {
  const { tenantMapping, activeLang, settings } = useSite();
  const getLocalizedPath = (path) => `/${activeLang}${path}`;
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const footerText = settings?.footerDescription || translate(
    "Doğadan ilham alan yenilikçi çizgilerle, geleceğin premium ofis ve yaşam alanlarını tasarlıyoruz. İhtiyacınıza göre şekillenen, kalite ve konforla buluşan özgün çözümler.",
    "With innovative lines inspired by nature, we design premium office and living spaces of the future. Unique solutions shaped according to your needs, meeting quality and comfort.",
    "من خلال خطوط مبتكرة مستوحاة من الطبيعة، نصمم مساحات مكتبية ومعيشة فاخرة للمستقبل. حلول فريدة تشكلت وفقًا لاحتياجاتك، وتلبي الجودة والراحة."
  );
  const logoUrl = settings?.logos?.footer || "/assets/burobig/images/Burobig%20Logo%20Beyaz.svg";

  const rawWa = settings?.socials?.whatsapp || settings?.contact?.whatsapp || "905365433511";
  const waDigits = rawWa.replace(/\D/g, '');
  let cleanWa = "905365433511";
  if (waDigits.startsWith('90') && waDigits.length === 12) {
    cleanWa = waDigits;
  } else if (waDigits.startsWith('0') && waDigits.length === 11) {
    cleanWa = '90' + waDigits.slice(1);
  } else if (waDigits.length === 10 && waDigits.startsWith('5')) {
    cleanWa = '90' + waDigits;
  } else if (waDigits.length >= 10) {
    cleanWa = waDigits;
  }

  const getSocialLink = (socialField, defaultUrl) => {
    if (!socialField) return defaultUrl;
    if (typeof socialField === 'string') return socialField || defaultUrl;
    if (typeof socialField === 'object') {
      if (socialField.active === false) return null;
      return socialField.url || null;
    }
    return defaultUrl;
  };

  const instagramUrl = getSocialLink(settings?.socials?.instagram, "https://instagram.com/burobig");
  const facebookUrl = getSocialLink(settings?.socials?.facebook, "https://facebook.com/burobig");
  const linkedinUrl = getSocialLink(settings?.socials?.linkedin, "https://linkedin.com/company/burobig");

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
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                )}
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                )}
                {linkedinUrl && (
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="footer-col">
              <h4>{translate('Kurumsal', 'Corporate', 'الشركة')}</h4>
              <ul className="footer-links">
                <li><Link to={getLocalizedPath('/hikayemiz')}>{translate('Hikayemiz', 'Our Story', 'قصتنا')}</Link></li>
                <li><Link to={getLocalizedPath('/tasarim-sureci')}>{translate('Tasarım Süreci', 'Design Process', 'عملية التصميم')}</Link></li>
                <li><Link to={getLocalizedPath('/manifesto')}>{translate('Manifesto', 'Manifesto', 'البيان')}</Link></li>
                <li><Link to={getLocalizedPath('/tasarim-felsefesi')}>{translate('Tasarım Felsefesi', 'Design Philosophy', 'فلسفة التصميم')}</Link></li>
                <li><Link to={getLocalizedPath('/kalite-politikamiz')}>{translate('Kalite Politikamız', 'Quality Policy', 'سياسة الجودة')}</Link></li>
                <li><Link to={getLocalizedPath('/surdurulebilirlik')}>{translate('Sürdürülebilirlik', 'Sustainability', 'الاستdامة')}</Link></li>
                <li><Link to={getLocalizedPath('/tasarimcilar')}>{translate('Tasarımcılar', 'Designers', 'المصممون')}</Link></li>
                <li><Link to={getLocalizedPath('/blog')}>{translate('Blog', 'Blog', 'المدونة')}</Link></li>
                <li><Link to={getLocalizedPath('/iletisim')}>{translate('İletişim', 'Contact', 'الاتصال')}</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{translate('Koleksiyonlar', 'Collections', 'المجموعات')}</h4>
              <ul className="footer-links">
                <li><Link to={getLocalizedPath('/ust-yonetici-masalari')}>{translate('Üst Yönetici Masaları', 'Executive Desks', 'طاولات المدير التنفيذي')}</Link></li>
                <li><Link to={getLocalizedPath('/yonetici-masalari')}>{translate('Yönetici Masaları', 'Manager Desks', 'طاولات المدير')}</Link></li>
                <li><Link to={getLocalizedPath('/calisma-masalari')}>{translate('Çalışma Masaları', 'Work Desks', 'طاولات العمل')}</Link></li>
                <li><Link to={getLocalizedPath('/operasyonel-masalar')}>{translate('Operasyonel Masalar', 'Operational Desks', 'الطاولات التشغيلية')}</Link></li>
                <li><Link to={getLocalizedPath('/toplanti-masalari')}>{translate('Toplantı Masaları', 'Meeting Desks', 'طاولات الاجتماعات')}</Link></li>
                <li><Link to={getLocalizedPath('/yonetici-koltuklari')}>{translate('Yönetici Koltukları', 'Manager Chairs', 'كراسي المدير')}</Link></li>
                <li><Link to={getLocalizedPath('/calisma-koltuklari')}>{translate('Çalışma Koltukları', 'Work Chairs', 'كراسي العمل')}</Link></li>
                <li><Link to={getLocalizedPath('/misafir-ve-bekleme-koltuklari')}>{translate('Misafir ve Bekleme Koltukları', 'Guest & Waiting Chairs', 'كراسي الضيoph والانتظار')}</Link></li>
              </ul>
            </div>

            <div className="footer-col contact-col">
              <h4>{translate('E-Bülten Kayıt', 'Newsletter Subscription', 'الاشتراك في النشرة الإخبارية')}</h4>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {translate(
                  'Yeniliklerden ve özel koleksiyonlarımızdan ilk siz haberdar olun.',
                  'Be the first to know about innovations and our special collections.',
                  'كن أول من يعرف عن الابتكارات ومجموعاتنا الخاصة.'
                )}
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={translate('E-posta adresiniz', 'Your email address', 'عنوان بريدك الإلكتروني')} 
                  required 
                  aria-label={translate('E-posta adresiniz', 'Your email address', 'عنوان بريدك الإلكتروني')} 
                />
                <button type="submit" aria-label={translate('Kayıt Ol', 'Subscribe', 'اشتراك')}>
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
              <span>
                © {new Date().getFullYear()} <strong>{translate('Bürobig Ofis Mobilyaları', 'Burobig Office Furniture', 'بيروبيج لأثاث المكاتب')}</strong>. {translate('Tüm Hakları Saklıdır.', 'All Rights Reserved.', 'جميع الحقوق محفوظة.')}
              </span>
            </div>
            <div className="footer-bottom-right">
              <a href="https://www.coreweb.tr/" target="_blank" rel="noopener noreferrer" aria-label="CoreWeb">
                <img src="/assets/coreweb/coreweb-logo-color.svg" alt="CoreWeb Logo" className="footer-agency-logo" />
              </a>
            </div>
          </div>
        </div>
      </footer>



      {/* WhatsApp Lead Widget
      <div className="wa-widget">
        <a href={`https://wa.me/${cleanWa}`} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp ile İletişime Geçin">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>
      */}
    </>
  );
}
