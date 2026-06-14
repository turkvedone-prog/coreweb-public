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
            <svg className="logo-img" viewBox="0 0 200 46" fill="none" style={{ height: '34px', width: 'auto' }}>
              <path fill="#2563eb" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
              <text x="60" y="33" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="30" fontWeight="800" fill="#0f172a" letterSpacing="-0.5">Core</text>
              <text x="124" y="33" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="30" fontWeight="500" fill="#2563eb" letterSpacing="-0.5">Web</text>
            </svg>
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
