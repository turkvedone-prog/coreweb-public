import { useState, useEffect } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import './viola.css';

export default function ViolaHome() {
  const { tenantMapping, activeLang } = useSite();
  
  // Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      bg: '/assets/viola/images/hero-office-1.png',
      title: 'Tasarımda\nYeni Bir Boyut',
      text: 'Çalışma ve yaşam alanlarınız için ilham veren, zamansız dokunuşlar.'
    },
    {
      bg: '/assets/viola/images/hero-office-2.png',
      title: 'Sakinliğin\nMimarisi',
      text: 'Soft tonlar ve minimalist çizgilerle ruhunuzu dinlendiren estetik alanlar.'
    },
    {
      bg: '/assets/viola/images/hero-office-3.png',
      title: 'İlham Veren\nÇalışma Alanları',
      text: 'Zarif detaylar ve ergonomik yapısıyla hem işlevsellik hem de konfor sunar.'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const tenantSlug = tenantMapping?.tenantSlug || 'viola';
  const prefix = `/${tenantSlug}/${activeLang}`;

  return (
    <div className="viola-home-page">
      {/* 1. Hero Slider */}
      <section className="hero-section" aria-labelledby="hero-heading" id="hero">
        <div className="hero-slider" id="hero-slider">
          {slides.map((slide, idx) => (
            <div key={idx} className={`hero-slide ${activeSlide === idx ? 'active' : ''}`}>
              <div 
                className="hero-slide-bg" 
                style={{ backgroundImage: `url('${slide.bg}')` }}
              ></div>
              <div className="hero-content">
                {idx === 0 ? (
                  <h1 id="hero-heading">
                    Tasarımda<br />Yeni Bir Boyut
                  </h1>
                ) : (
                  <h2>
                    {slide.title.split('\n')[0]}<br />{slide.title.split('\n')[1]}
                  </h2>
                )}
                <p>{slide.text}</p>
                <a href={`${prefix}/urunler/beta`} className="btn-primary" id={`hero-cta-${idx + 1}`}>
                  Koleksiyon
                </a>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <div className="slider-controls">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                className={`slider-dot ${activeSlide === idx ? 'active' : ''}`} 
                aria-label={`Slayt ${idx + 1}`} 
                onClick={() => setActiveSlide(idx)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Collections Section (CSS Grid Asymmetric Layout) */}
      <section className="collections-section" id="koleksiyonlar" aria-labelledby="collections-heading">
        <div className="collections-wrapper">
          {/* PROMO BANNER */}
          <div className="promo-banner">
            <img src="/assets/viola/images/promo-banner.png" alt="Premium Ofis Koleksiyonu" className="promo-banner__bg" />
            <div className="promo-banner__content">
              <span className="promo-banner__label">YENİ NESİL ÇALIŞMA ALANLARI</span>
              <h2 className="promo-banner__title">İşinize değer katan<br />özel seçilmiş parçalar.</h2>
              <p className="promo-banner__text">Ofisinizdeki her köşeye profesyonellik ve denge katmak için tasarlandı.</p>
              <a href={`${prefix}/urunler/beta`} className="promo-banner__link">Koleksiyonu İncele</a>
            </div>
          </div>

          {/* SLOGAN / NEFES ALANI */}
          <div className="collections-slogan">
            <p>Zamanın ötesinde tasarımlarla, çalışma alanlarınızı yeniden hayal edin.</p>
          </div>

          {/* Collections Grid (Accordion effect) */}
          <div className="collections-grid" role="list">
            {/* FEATURED CARD */}
            <article className="collection-card collection-card--featured" role="listitem">
              <a href={`${prefix}/urunler/beta`} className="collection-card__link" id="card-makam" aria-label="Makam Takımları koleksiyonunu keşfet">
                <figure className="collection-card__figure">
                  <img
                    src="/assets/viola/images/collection-makam.png"
                    alt="Prestijli makam takımı ve yönetici ofisi"
                    width="900"
                    height="1100"
                    loading="eager"
                  />
                </figure>
                <div className="collection-card__overlay">
                  <div className="collection-card__info">
                    <h3 className="collection-card__title">Makam<br />Takımları</h3>
                    <span className="collection-card__cta">KEŞFET &rarr;</span>
                  </div>
                </div>
              </a>
            </article>

            {/* CARD 2 */}
            <article className="collection-card" role="listitem">
              <a href={`${prefix}/urunler/beta`} className="collection-card__link" id="card-operasyonel" aria-label="Operasyonel Masalar koleksiyonunu keşfet">
                <figure className="collection-card__figure">
                  <img
                    src="/assets/viola/images/collection-operasyonel.png"
                    alt="Modern operasyonel masalar ve açık ofis"
                    width="700"
                    height="550"
                    loading="lazy"
                  />
                </figure>
                <div className="collection-card__overlay">
                  <div className="collection-card__info">
                    <h3 className="collection-card__title">Operasyonel<br />Masalar</h3>
                    <span className="collection-card__cta">KEŞFET &rarr;</span>
                  </div>
                </div>
              </a>
            </article>

            {/* CARD 3 */}
            <article className="collection-card" role="listitem">
              <a href={`${prefix}/urunler/beta`} className="collection-card__link" id="card-toplanti" aria-label="Toplantı Masaları koleksiyonunu keşfet">
                <figure className="collection-card__figure">
                  <img
                    src="/assets/viola/images/collection-toplanti.png"
                    alt="Şık toplantı odası masası"
                    width="700"
                    height="550"
                    loading="lazy"
                  />
                </figure>
                <div className="collection-card__overlay">
                  <div className="collection-card__info">
                    <h3 className="collection-card__title">Toplantı<br />Masaları</h3>
                    <span className="collection-card__cta">KEŞFET &rarr;</span>
                  </div>
                </div>
              </a>
            </article>

            {/* CARD 4 */}
            <article className="collection-card" role="listitem">
              <a href={`${prefix}/urunler/beta`} className="collection-card__link" id="card-koltuklar" aria-label="Çalışma Koltukları koleksiyonunu keşfet">
                <figure className="collection-card__figure">
                  <img
                    src="/assets/viola/images/collection-koltuklar.png"
                    alt="Ergonomik çalışma koltukları"
                    width="700"
                    height="550"
                    loading="lazy"
                  />
                </figure>
                <div className="collection-card__overlay">
                  <div className="collection-card__info">
                    <h3 className="collection-card__title">Çalışma<br />Koltukları</h3>
                    <span className="collection-card__cta">KEŞFET &rarr;</span>
                  </div>
                </div>
              </a>
            </article>

            {/* CARD 5 */}
            <article className="collection-card" role="listitem">
              <a href={`${prefix}/urunler/beta`} className="collection-card__link" id="card-bekleme" aria-label="Bekleme Alanları koleksiyonunu keşfet">
                <figure className="collection-card__figure">
                  <img
                    src="/assets/viola/images/collection-bekleme.png"
                    alt="Lüks bekleme salonu ve lobi mobilyaları"
                    width="700"
                    height="550"
                    loading="lazy"
                  />
                </figure>
                <div className="collection-card__overlay">
                  <div className="collection-card__info">
                    <h3 className="collection-card__title">Bekleme<br />Alanları</h3>
                    <span className="collection-card__cta">KEŞFET &rarr;</span>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* 3. New Products Section */}
      <section className="products-section" aria-labelledby="new-products-heading">
        <div className="products-wrapper">
          <header className="products-header">
            <div className="products-title-wrapper">
              <h2 id="new-products-heading">Yeni Ürünler</h2>
            </div>
          </header>

          <div className="products-marquee">
            <div className="products-track">
              {/* Product 1 */}
              <article className="product-card">
                <a href={`${prefix}/urunler/beta`} className="product-card__link">
                  <figure className="product-card__figure">
                    <img src="/assets/viola/images/product-elephant.png" alt="Elephant Koltuk" className="product-card__img" loading="lazy" />
                  </figure>
                  <div className="product-card__info">
                    <h3 className="product-card__title">Elephant</h3>
                    <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              </article>

              {/* Product 2 */}
              <article className="product-card">
                <a href={`${prefix}/urunler/beta`} className="product-card__link">
                  <figure className="product-card__figure">
                    <img src="/assets/viola/images/product-vetra.png" alt="Vetra Koltuk" className="product-card__img" loading="lazy" />
                  </figure>
                  <div className="product-card__info">
                    <h3 className="product-card__title">Vetra</h3>
                    <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              </article>

              {/* Product 3 */}
              <article className="product-card">
                <a href={`${prefix}/urunler/beta`} className="product-card__link">
                  <figure className="product-card__figure">
                    <img src="/assets/viola/images/product-luci.png" alt="Luci Koltuk" className="product-card__img" loading="lazy" />
                  </figure>
                  <div className="product-card__info">
                    <h3 className="product-card__title">Luci</h3>
                    <svg className="product-card__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Virtual Tour (Split Layout) */}
      <section className="virtual-tour-split" aria-label="360 Derece Sanal Tur" id="sanal-tur">
        <div className="virtual-tour-split__container">
          <div className="virtual-tour-split__content">
            <span className="virtual-tour-split__label">DİJİTAL DENEYİM</span>
            <h2 className="virtual-tour-split__title"><span style={{ fontWeight: 300 }}>Sınırları Aşan</span><br />Showroom Keşfi</h2>
            <p className="virtual-tour-split__text">
              Fiziksel mesafeleri ortadan kaldırıyoruz. Premium ofis koleksiyonlarımızın dokusuna yakından bakın, yenilikçi çalışma alanlarımızı 360° sanal gerçeklikle gerçeğe en yakın haliyle deneyimleyin.
            </p>
            <a href="#sanal-tur-basla" className="btn-primary">Hemen Başla 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
          <div className="virtual-tour-split__image">
            <img src="/assets/viola/images/showroom-bg.png" alt="360 Sanal Tur Önizleme" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 5. Blog Section */}
      <section className="blog-section" id="blog" aria-label="Blog Yazıları">
        <div className="blog-wrapper">
          <header className="blog-header">
            <h2 id="blog-heading">Viola Blog</h2>
          </header>

          <div className="blog-grid">
            {/* Blog 1 */}
            <article className="blog-card">
              <a href="#blog-1" className="blog-card__link">
                <figure className="blog-card__figure">
                  <img src="/assets/viola/images/blog-1.png" alt="Ergonomi Blog" className="blog-card__img" loading="lazy" />
                </figure>
                <div className="blog-card__content">
                  <h3 className="blog-card__title">
                    <span className="blog-title-bold">Modern Ofis Yaşamı:</span><br />İlham Veren Çalışma Alanları Yaratmak
                  </h3>
                  <span className="blog-card__readmore">Devamını Oku 
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </a>
            </article>

            {/* Blog 2 */}
            <article className="blog-card">
              <a href="#blog-2" className="blog-card__link">
                <figure className="blog-card__figure">
                  <img src="/assets/viola/images/blog-2.png" alt="Estetik Blog" className="blog-card__img" loading="lazy" />
                </figure>
                <div className="blog-card__content">
                  <h3 className="blog-card__title">
                    <span className="blog-title-bold">Ev Konforunda Çalışma:</span><br />Yaratıcılığı Besleyen Dinlenme Köşeleri
                  </h3>
                  <span className="blog-card__readmore">Devamını Oku 
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </a>
            </article>

            {/* Blog 3 */}
            <article className="blog-card">
              <a href="#blog-3" className="blog-card__link">
                <figure className="blog-card__figure">
                  <img src="/assets/viola/images/blog-3.png" alt="Doku Blog" className="blog-card__img" loading="lazy" />
                </figure>
                <div className="blog-card__content">
                  <h3 className="blog-card__title">
                    <span className="blog-title-bold">Dokunsal Lüks:</span><br />Koleksiyonlarımıza Hayat Veren Kumaşlar
                  </h3>
                  <span className="blog-card__readmore">Devamını Oku 
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </a>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
