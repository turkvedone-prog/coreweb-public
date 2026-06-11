import { useState, useEffect } from 'react';
import './viola.css';

export default function ViolaProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState('docs');
  const [currentSlide, setCurrentSlide] = useState(0);

  const gallery = product.gallery || [
    { url: '/assets/viola/images/beta_main.png' },
    { url: '/assets/viola/images/product-lenta-2.png' },
    { url: '/assets/viola/images/product-lenta-3.png' }
  ];

  // Cycle main images
  useEffect(() => {
    if (gallery.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [gallery.length]);

  return (
    <div className="viola-product-detail">
      <main className="product-page product-page--minimal">
        {/* 1. Minimal Hero */}
        <section className="minimal-hero" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
          <div className="minimal-hero__image-container" id="hero-slider">
            {gallery.map((img, idx) => (
              <img 
                key={idx}
                src={img.url} 
                alt={`${product.title} Görsel ${idx + 1}`} 
                className={`minimal-hero__img ${currentSlide === idx ? 'active' : ''}`} 
              />
            ))}
          </div>
          <div className="minimal-hero__content">
            <h1 className="minimal-hero__title">{product.title}</h1>
            <div className="minimal-hero__subtitle">{product.category}</div>
            <p className="minimal-hero__desc">
              {product.description}
            </p>
            <a href="#contact" className="btn btn-primary btn-sharp">TEKLİF AL</a>
          </div>
        </section>

        {/* 3. Teknik Bilgiler (Tab Yapısı) */}
        <div className="white-bottom-area">
          <section className="product-details-tabs minimal-menu">
            <h2 className="apple-style-heading">Teknik Özellikler</h2>
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'docs' ? 'active' : ''}`} 
                onClick={() => setActiveTab('docs')}
              >
                Mimari Veriler
              </button>
              <button 
                className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`} 
                onClick={() => setActiveTab('materials')}
              >
                Yüzey & Materyal
              </button>
              <button 
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} 
                onClick={() => setActiveTab('specs')}
              >
                Özellikler
              </button>
            </div>
            
            <div className="tab-content-container">
              {/* Mimari Veriler */}
              <div className={`tab-content ${activeTab === 'docs' ? 'active' : ''}`} id="tab-docs">
                <ul className="doc-list">
                  <li>
                    <span>{product.title} 2D Cad Data</span>
                    <a href="#download">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span>{product.title} 3D Max</span>
                    <a href="#download">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Yüzey & Materyal Koleksiyonu */}
              <div className={`tab-content ${activeTab === 'materials' ? 'active' : ''}`} id="tab-materials">
                {/* Metal Serisi */}
                <div className="material-group">
                  <h4>Metal Serisi</h4>
                  <div className="swatch-grid">
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#799867' }}></div><span>Soft Green</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#C1775A' }}></div><span>Ongoing</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#B0AA96' }}></div><span>Kum Taşı</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#1A1A1A' }}></div><span>Siyah</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#EAE6D7' }}></div><span>Krem</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#898989' }}></div><span>Gri</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#4A4A4A' }}></div><span>Antrasit</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#F3F3F3', border: '1px solid #eeeeee' }}></div><span>Beyaz</span></div>
                  </div>
                </div>

                {/* Ahşap Serisi */}
                <div className="material-group">
                  <h4>Ahşap Serisi</h4>
                  <div className="swatch-grid">
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#C7A15C' }}></div><span>ZA 10.50</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#4A3B32' }}></div><span>İsli Meşe</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#8B6043' }}></div><span>ZA 12.19</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#A0785A' }}></div><span>Açık Ceviz</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#6B4E38' }}></div><span>Koyu Meşe</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#D4B895' }}></div><span>Huş</span></div>
                  </div>
                </div>

                {/* Melamin Serisi */}
                <div className="material-group">
                  <h4>Melamin Serisi</h4>
                  <div className="swatch-grid">
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#C49A6C' }}></div><span>ZS Cadiz</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#E5DFD3' }}></div><span>ZS Paradise</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#C08D46' }}></div><span>ZS Legnano</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#7A5C43' }}></div><span>ZS Armada</span></div>
                    <div className="swatch-item"><div className="swatch-color" style={{ background: '#52463C' }}></div><span>ZS Korfu</span></div>
                  </div>
                </div>
              </div>

              {/* Özellikler */}
              <div className={`tab-content ${activeTab === 'specs' ? 'active' : ''}`} id="tab-specs">
                <ul className="doc-list">
                  <li>
                    <span>{product.title} Teknik Ölçüler (PDF)</span>
                    <a href="#download">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span>{product.title} Montaj Kılavuzu</span>
                    <a href="#download">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Benzer Ürünler */}
          <section className="related-products-carousel" style={{ paddingBottom: '60px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 className="related-carousel-title" style={{ textAlign: 'left', marginBottom: '2.5rem', color: '#1a1a1a', paddingLeft: 0 }}>
                Benzer Ürünler
              </h3>
            </div>
            <div className="related-carousel-wrapper">
              <div className="related-carousel-track">
                {/* 1 */}
                <a href="#related" className="carousel-item">
                  <h4 className="carousel-item-title">Beta - X</h4>
                  <img src="/assets/viola/images/beta_carousel_1.png" alt="Beta-X" />
                </a>
                {/* 2 */}
                <a href="#related" className="carousel-item">
                  <h4 className="carousel-item-title">Beta - Y</h4>
                  <img src="/assets/viola/images/beta_carousel_2.png" alt="Beta-Y" />
                </a>
                {/* 3 */}
                <a href="#related" className="carousel-item">
                  <h4 className="carousel-item-title">Beta - X</h4>
                  <img src="/assets/viola/images/beta_carousel_1.png" alt="Beta-X" />
                </a>
                {/* 4 */}
                <a href="#related" className="carousel-item">
                  <h4 className="carousel-item-title">Beta - Y</h4>
                  <img src="/assets/viola/images/beta_carousel_2.png" alt="Beta-Y" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
