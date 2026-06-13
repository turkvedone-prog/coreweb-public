import { useState, useEffect } from 'react';
import './coreweb.css';

export default function CoreWebHeader() {
  const [menuActive, setMenuActive] = useState(false);

  // Escape key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync body overflow when menu is active
  useEffect(() => {
    if (menuActive) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuActive]);

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
    setMenuActive(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <a href="/" className="header__logo" aria-label="CoreWeb Anasayfa" onClick={(e) => handleSmoothScroll(e, '#hero')}>
          <img src="/assets/coreweb/coreweb-logo-color.svg" alt="CoreWeb Logo" className="logo-img" fetchPriority="high" loading="eager" />
        </a>
        <button 
          className="header__toggle" 
          aria-label="Menüyü Aç" 
          aria-expanded={menuActive} 
          id="menu-toggle"
          onClick={() => setMenuActive(!menuActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`header__nav ${menuActive ? 'header__nav--active' : ''}`} id="header-nav">
          <a href="#hero" className="header__link" onClick={(e) => handleSmoothScroll(e, '#hero')}>Sistem</a>
          <a href="#panel" className="header__link" onClick={(e) => handleSmoothScroll(e, '#panel')}>Kontrol Merkezi</a>
          <a href="#modules" className="header__link" onClick={(e) => handleSmoothScroll(e, '#modules')}>Modüller</a>
          <a href="#process" className="header__link" onClick={(e) => handleSmoothScroll(e, '#process')}>Süreç</a>
          <a href="#trust" className="header__link" onClick={(e) => handleSmoothScroll(e, '#trust')}>Güven</a>
          <a href="#contact" className="header__btn" onClick={(e) => handleSmoothScroll(e, '#contact')}>İletişim</a>
        </nav>
      </div>
    </header>
  );
}
