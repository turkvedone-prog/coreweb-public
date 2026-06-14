import React, { useState } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import { burcKaplamaData, translate } from './burcKaplamaData';
import './burckaplama.css';

export default function BurcKaplamaFooter() {
  const { activeLang, settings } = useSite();
  const [logoError, setLogoError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerText = translate(activeLang, burcKaplamaData.company.title) || "Endüstriyel Kaplama ve Yüzey İşlem Teknolojileri";
  const logoUrl = "/assets/burckaplama/BurcKaplama_Logo.png";

  const socials = {
    instagram: settings?.socials?.instagram || "https://instagram.com/burckaplama",
    facebook: settings?.socials?.facebook || "https://facebook.com/burckaplama",
    linkedin: settings?.socials?.linkedin || "https://linkedin.com/company/burckaplama"
  };

  return (
    <>
      <footer className="bk-footer" id="iletisim" aria-label="Site Footer">
        <div className="bk-footer-wrapper">
          <div className="bk-footer-grid">
            {/* Column 1: Brand */}
            <div className="bk-footer-col bk-brand-col">
              <a href="#anasayfa" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="bk-footer-logo-link">
                <img src={logoUrl} alt="Burç Ağaç Kaplama Logo" className="bk-footer-logo" />
              </a>
              <h3 className="bk-footer-company-name">
                {translate(activeLang, burcKaplamaData.company.title)}
              </h3>
              <p className="bk-footer-desc">
                {translate(activeLang, burcKaplamaData.company.slogan)}
              </p>
              <div className="bk-footer-socials">
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Kurumsal */}
            <div className="bk-footer-col">
              <h4 className="bk-footer-title">
                {activeLang === 'tr' ? 'KURUMSAL' : 'CORPORATE'}
              </h4>
              <ul className="bk-footer-links">
                {burcKaplamaData.navigation.map((item) => {
                  const getHashPath = (id) => {
                    switch (id) {
                      case 'home': return '#anasayfa';
                      case 'about': return '#hakkimizda';
                      case 'services': return '#urunler';
                      case 'quality': return '#hakkimizda';
                      case 'blog': return '#blog';
                      case 'contact': return '#iletisim';
                      default: return '#';
                    }
                  };
                  return (
                    <li key={item.id}>
                      <a href={getHashPath(item.id)}>
                        {translate(activeLang, item.label)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Hizmetler */}
            <div className="bk-footer-col">
              <h4 className="bk-footer-title">
                {activeLang === 'tr' ? 'HİZMETLER' : 'SERVICES'}
              </h4>
              <ul className="bk-footer-links">
                {burcKaplamaData.services.map((svc) => (
                  <li key={svc.id}>
                    <a href="#urunler">
                      {translate(activeLang, svc.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: E-Bülten */}
            <div className="bk-footer-col bk-contact-col">
              <h4 className="bk-footer-title">
                {activeLang === 'tr' ? 'E-BÜLTEN KAYIT' : 'NEWSLETTER SIGNUP'}
              </h4>
              <p className="bk-newsletter-desc">
                {activeLang === 'tr' 
                  ? 'Yeniliklerden ve özel koleksiyonlarımızdan ilk siz haberdar olun.' 
                  : 'Be the first to know about innovations and our special collections.'}
              </p>
              <form className="bk-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder={activeLang === 'tr' ? 'E-posta adresiniz' : 'Your email address'} 
                  required 
                  aria-label={activeLang === 'tr' ? 'E-posta adresiniz' : 'Your email address'} 
                />
                <button type="submit" aria-label={activeLang === 'tr' ? 'Kayıt Ol' : 'Subscribe'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bk-footer-bottom">
            <div className="bk-footer-bottom-left">
              <span>
                © {new Date().getFullYear()} <strong>Burç Kaplama</strong>. {activeLang === 'tr' ? 'Tüm Hakları Saklıdır.' : 'All Rights Reserved.'}
              </span>
            </div>
            <div className="bk-footer-bottom-right">
              <a href="https://www.coreweb.tr/" target="_blank" rel="noopener noreferrer" aria-label="CoreWeb" style={logoError ? { color: 'inherit', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', opacity: 0.7 } : {}}>
                {logoError ? (
                  'CoreWeb'
                ) : (
                  <img 
                    src="/assets/coreweb/coreweb-logo-dark.svg" 
                    alt="CoreWeb Logo" 
                    className="bk-footer-agency-logo" 
                    onError={() => setLogoError(true)}
                  />
                )}
              </a>
              <button onClick={scrollToTop} className="bk-scroll-top-btn" aria-label={activeLang === 'tr' ? 'Yukarı Git' : 'Scroll to Top'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <div className="bk-wa-widget">
        <a 
          href={`https://wa.me/${settings?.contact?.whatsapp || '905000000000'}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bk-wa-btn" 
          aria-label={activeLang === 'tr' ? 'WhatsApp ile İletişime Geçin' : 'Contact us on WhatsApp'}
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="#ffffff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
          </svg>
        </a>
      </div>
    </>
  );
}
