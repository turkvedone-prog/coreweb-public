import './coreweb.css';

export default function CoreWebFooter() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand">
          <a href="/" className="footer__logo" aria-label="CoreWeb Anasayfa" onClick={(e) => handleSmoothScroll(e, '#hero')}>
            <img src="/assets/coreweb/coreweb-logo-color.svg" alt="CoreWeb Logo" className="logo-img" />
          </a>
          <p className="footer__desc">Kurumlar için özel tasarımlı, yüksek performanslı ve sürdürülebilir yönetilebilir web altyapıları sağlayan teknoloji sağlayıcısı.</p>
        </div>
        <div className="footer__links">
          <a href="#hero" className="footer__link" onClick={(e) => handleSmoothScroll(e, '#hero')}>Sistem</a>
          <a href="#panel" className="footer__link" onClick={(e) => handleSmoothScroll(e, '#panel')}>Kontrol Merkezi</a>
          <a href="#modules" className="footer__link" onClick={(e) => handleSmoothScroll(e, '#modules')}>Modüller</a>
          <a href="#process" className="footer__link" onClick={(e) => handleSmoothScroll(e, '#process')}>Süreç</a>
          <a href="#trust" className="footer__link" onClick={(e) => handleSmoothScroll(e, '#trust')}>Güven</a>
          <a href="#contact" className="footer__link" onClick={(e) => handleSmoothScroll(e, '#contact')}>İletişim</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>CoreWeb © 2026. Tüm hakları saklıdır. | KVKK Aydınlatma Metni</p>
      </div>
    </footer>
  );
}
