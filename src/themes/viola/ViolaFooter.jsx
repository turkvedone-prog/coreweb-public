import { useState } from 'react';
import './viola.css';

export default function ViolaFooter() {
  const [waWidgetOpen, setWaWidgetOpen] = useState(false);
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');

  const handleWaSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(`Merhaba, ben ${waName}. Satış temsilcinizle görüşmek istiyorum. Telefonum: ${waPhone}`);
    window.open(`https://wa.me/905555555555?text=${text}`, '_blank');
    setWaWidgetOpen(false);
  };

  return (
    <>
      <footer className="site-footer" aria-label="Site Footer">
        <div className="footer-wrapper">
          <div className="footer-grid">
            {/* Marka & Açıklama */}
            <div className="footer-col brand-col">
              <img src="/assets/viola/images/viola-logo.svg" alt="Viola Logo" className="footer-logo" />
              <p>
                İhtiyacınıza göre şekillenen,<br />
                kaliteyle tasarlanan premium ofis ve yaşam alanları.<br />
                Doğadan ilham alır, geleceği tasarlarız.
              </p>
              <div className="footer-socials">
                <a href="#tw" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#ig" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#fb" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a href="#li" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Kurumsal */}
            <div className="footer-col">
              <h4>Kurumsal</h4>
              <ul className="footer-links">
                <li><a href="#hakkimizda">Hakkımızda</a></li>
                <li><a href="#vizyon">Vizyon & Misyon</a></li>
                <li><a href="#kariyer">Kariyer / İK</a></li>
                <li><a href="#surdurulebilirlik">Sürdürülebilirlik</a></li>
                <li><a href="#sertifikalar">Sertifikalarımız</a></li>
                <li><a href="#basin">Basın Odası</a></li>
              </ul>
            </div>

            {/* Koleksiyonlar */}
            <div className="footer-col">
              <h4>Koleksiyonlar</h4>
              <ul className="footer-links">
                <li><a href="#yonetici">Yönetici Serisi</a></li>
                <li><a href="#oturma">Oturma Grupları</a></li>
                <li><a href="#calisma">Çalışma Masaları</a></li>
                <li><a href="#toplanti">Toplantı Masaları</a></li>
                <li><a href="#akustik">Akustik Çözümler</a></li>
                <li><a href="#bekleme">Bekleme Alanları</a></li>
              </ul>
            </div>

            {/* Bülten & İletişim */}
            <div className="footer-col contact-col">
              <h4>E-Bülten Kayıt</h4>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                Yeniliklerden ve özel koleksiyonlarımızdan ilk siz haberdar olun.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="E-posta adresiniz" required aria-label="E-posta adresiniz" />
                <button type="submit" aria-label="Kayıt Ol">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p><span style={{ fontWeight: 600 }}>&copy; {new Date().getFullYear()}</span> Viola Ofis Mobilyaları. Tüm hakları saklıdır.</p>
            </div>
            <div className="footer-bottom-right">
              <p><span style={{ fontWeight: 400 }}>Tasarım&amp;Yazılım</span> <span style={{ fontWeight: 600 }}>Kreatiffikirler.com</span></p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Lead Widget */}
      <div className={`wa-widget ${waWidgetOpen ? 'open' : ''}`} id="waWidget">
        {waWidgetOpen && (
          <div className="wa-popup" id="waPopup">
            <div className="wa-popup-header">
              <div className="wa-avatar">
                <img 
                  src="/assets/viola/images/wa-avatar.png" 
                  alt="Danışman" 
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fff"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                  }} 
                />
              </div>
              <div className="wa-title">
                <h4>Hoş Geldiniz!</h4>
                <p>Satış uzmanlarımızla görüşmek için formu doldurun.</p>
              </div>
              <button className="wa-close" onClick={() => setWaWidgetOpen(false)}>×</button>
            </div>
            <div className="wa-popup-body">
              <form onSubmit={handleWaSubmit}>
                <input 
                  type="text" 
                  placeholder="İsim (Ad Soyad)" 
                  value={waName} 
                  onChange={(e) => setWaName(e.target.value)} 
                  required 
                />
                <input 
                  type="tel" 
                  placeholder="Telefon Numarası" 
                  value={waPhone} 
                  onChange={(e) => setWaPhone(e.target.value)} 
                  required 
                />
                <button type="submit">WHATSAPP'TA SOHBET BAŞLAT</button>
              </form>
            </div>
          </div>
        )}
        <button 
          className="wa-btn" 
          onClick={() => setWaWidgetOpen(!waWidgetOpen)} 
          aria-label="WhatsApp Sohbeti Başlat"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M12.031 0C5.385 0 0 5.384 0 12.031c0 2.115.552 4.108 1.523 5.865L0 24l6.321-1.492C7.994 23.415 9.957 24 12.03 24c6.645 0 12.03-5.384 12.03-12.03S18.675 0 12.031 0zm5.83 17.382c-.244.686-1.42 1.258-1.956 1.34-.492.073-1.127.127-3.412-.818-3.266-1.35-5.372-4.707-5.534-4.922-.162-.217-1.32-1.758-1.32-3.355 0-1.597.834-2.38 1.134-2.695.297-.315.65-.395.867-.395.216 0 .432.002.62.012.196.009.462-.077.721.547.27.646.866 2.115.946 2.278.081.161.136.35.027.564-.108.216-.162.35-.325.539-.162.19-.34.417-.486.547-.162.144-.33.303-.146.621.185.316.822 1.355 1.761 2.191 1.208 1.077 2.215 1.408 2.54 1.57.324.161.512.135.701-.081.189-.216.81-1.079 1.026-1.457.217-.378.433-.315.728-.207.3.109 1.89.892 2.214 1.054.324.161.54.243.621.378.08.136.08.783-.162 1.469z"/>
          </svg>
        </button>
      </div>
    </>
  );
}
