import { useState, useEffect } from 'react';

import { ArrowRight } from 'lucide-react';
import './burckaplama.css';

export default function BurcKaplamaHome() {
  const activeLang = 'tr';
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/assets/burckaplama/hotel_lobby_veneer.png',
    '/assets/burckaplama/office_veneer.png',
    '/assets/burckaplama/app_alpi_kok.png'
  ];

  const [activeTab, setActiveTab] = useState(0);

  const veneerCategories = [
    {
      id: 'dogal',
      titleTr: 'Doğal Kaplama',
      titleEn: 'Natural Veneer',
      image: '/assets/burckaplama/veneer_dogal.png',
      appImage: '/assets/burckaplama/app_dogal.png',
      descTr: 'Doğadan elde edilen saf ahşabın eşsiz haresini ve dokusunu doğrudan mekanlarınıza taşır. Her levha benzersiz bir hikaye anlatır ve tasarımlarınıza doğal bir sıcaklık katar.',
      descEn: 'Brings the unique texture and grain of pure wood obtained from nature directly to your spaces. Each sheet tells a unique story and adds a natural warmth to your designs.'
    },
    {
      id: 'kok',
      titleTr: 'Kök Kaplama',
      titleEn: 'Burl Veneer',
      image: '/assets/burckaplama/veneer_kok.png',
      appImage: '/assets/burckaplama/app_kok.png',
      descTr: 'Ağacın kök kısımlarından elde edilen, doğanın en karmaşık ve sanatsal girdap desenlerini barındıran nadide kaplama türüdür. Klasik ve modern lüks tasarımlarda benzersiz bir odak noktası oluşturur.',
      descEn: 'A rare veneer type featuring nature\'s most complex and artistic swirling patterns, obtained from the roots of the tree. It creates a unique focal point in classic and modern luxury designs.'
    },
    {
      id: 'alpi',
      titleTr: 'Alpi Kaplama',
      titleEn: 'Alpi Veneer',
      image: '/assets/burckaplama/veneer_alpi.png',
      appImage: '/assets/burckaplama/app_alpi.png',
      descTr: 'Sürdürülebilir orman kaynaklarından elde edilen ahşapların ileri teknolojiyle işlenerek paralel ve çizgisel kusursuz desenlere dönüştürülmesiyle üretilir. Geniş yüzeylerde desen sürekliliği sağlar.',
      descEn: 'Produced by processing wood from sustainable forest resources with advanced technology to turn them into flawless parallel and linear patterns. Provides pattern continuity on large surfaces.'
    },
    {
      id: 'alpi-kok',
      titleTr: 'Alpi Kök',
      titleEn: 'Alpi Burl',
      image: '/assets/burckaplama/veneer_alpi_kok.png',
      appImage: '/assets/burckaplama/app_alpi_kok.png',
      descTr: 'İleri teknolojiyle tasarlanmış, egzotik renk pigmentleri (yeşil, mavi vb.) ve yapay kök girdaplarıyla bezeli fütüristik kaplama serisidir. Sıra dışı mimari projeler için sanatsal çözümler sunar.',
      descEn: 'A futuristic veneer series designed with advanced technology, adorned with exotic color pigments (green, blue, etc.) and artificial burl swirls. Offers artistic solutions for extraordinary architectural projects.'
    },
    {
      id: 'tomruk-kereste',
      titleTr: 'Tomruk & Kereste',
      titleEn: 'Logs & Lumber',
      image: '/assets/burckaplama/veneer_tomruk.png',
      appImage: '/assets/burckaplama/app_tomruk.png',
      descTr: 'Seçkin ormanlardan özenle seçilen tomruklar, yapısal projeleriniz ve mobilya iskeletleriniz için fırınlanmış, stabil ve yüksek mukavemetli kerestelere dönüştürülür.',
      descEn: 'Logs carefully selected from premium forests are transformed into kiln-dried, stable, and highly durable lumber for your structural projects and furniture frames.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bk-home">
      {/* Full-width BeLeasing2 Style Hero with Slideshow */}
      <section className="bk-hero" id="anasayfa">
        <div className="bk-hero-slides">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`bk-hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(12, 18, 32, 0.45), rgba(12, 18, 32, 0.45)), url('${slide}')` }}
            />
          ))}
        </div>
        <div className="bk-hero-container">
          {/* Left Block */}
          <div className="bk-hero-left">
            <h1 className="bk-hero-title">
              {activeLang === 'tr' ? (
                <>
                  Her yüzey bir hikaye anlatır
                </>
              ) : (
                <>
                  Every surface tells a story
                </>
              )}
            </h1>
            <p className="bk-hero-desc">
              {activeLang === 'tr' ? (
                <>
                  Doğayla uyum içinde tasarlanmış mekanlar için <br />
                  doğru malzeme, doğru uzmanlık.
                </>
              ) : (
                <>
                  The right material, the right expertise <br />
                  for spaces designed in harmony with nature.
                </>
              )}
            </p>
            <div className="bk-hero-ctas">
              <a href="#" onClick={(e) => e.preventDefault()} className="bk-hero-btn bk-btn-primary" style={{ cursor: 'default' }}>
                {activeLang === 'tr' ? 'HİZMETLERİMİZİ İNCELEYİN' : 'EXPLORE OUR SERVICES'}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>


          {/* Bottom Columns (3 steps) */}
          <div className="bk-hero-steps">
            <div className="bk-step-col">
              <span className="bk-step-text">
                {activeLang === 'tr' ? 'DOĞAL AHŞAP VE KAPLAMA UZMANLIĞI' : 'NATURAL WOOD & VENEER EXPERTISE'}
              </span>
            </div>
            <div className="bk-step-col">
              <span className="bk-step-text">
                {activeLang === 'tr' ? 'SÜRDÜRÜLEBİLİR ORMAN KAYNAKLARI' : 'SUSTAINABLE FOREST RESOURCES'}
              </span>
            </div>
            <div className="bk-step-col">
              <span className="bk-step-text">
                {activeLang === 'tr' ? 'KUSURSUZ İŞÇİLİK VE SEÇKİN DOKULAR' : 'FLAWLESS CRAFTSMANSHIP & PREMIUM TEXTURES'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Wood Veneer Categories Section */}
      <section className="bk-veneer-categories-section" id="kategoriler">
        <div className="bk-veneer-container">
          <div className="bk-veneer-header">
            <div className="bk-header-line" />
            <h2 className="bk-veneer-title">
              {activeLang === 'tr' ? 'Her yüzey bir hikaye anlatır' : 'Every surface tells a story'}
            </h2>
            <p className="bk-veneer-desc">
              {activeLang === 'tr' 
                ? 'Doğayla uyum içinde tasarlanmış mekanlar için doğru malzeme, doğru uzmanlık.' 
                : 'The right material, the right expertise for spaces designed in harmony with nature.'}
            </p>
          </div>
          
          <div className="bk-experience-box">
            <div className="bk-experience-header-row">
              <h3 className="bk-experience-main-title">
                {activeLang === 'tr' ? 'Burç Kaplama ürünlerini deneyimleyin.' : 'Experience Burç Kaplama products.'}
              </h3>
            </div>

            <div className="bk-experience-layout">
              {/* Left Accordion Column */}
              <div className="bk-experience-left">
                <div className="bk-experience-accordion">
                  {veneerCategories.map((cat, index) => {
                    const isActive = activeTab === index;
                    return (
                      <div 
                        key={cat.id} 
                        className={`bk-accordion-item ${isActive ? 'active' : ''}`}
                      >
                        <button 
                          className="bk-accordion-trigger"
                          onClick={() => setActiveTab(index)}
                        >
                          <span className="bk-accordion-title">
                            {activeLang === 'tr' ? cat.titleTr : cat.titleEn}
                          </span>
                          <span className="bk-accordion-icon">
                            {isActive ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                            )}
                          </span>
                        </button>
                        <div className="bk-accordion-content">
                          <div className="bk-accordion-inner">
                            <p className="bk-accordion-desc">
                              {activeLang === 'tr' ? cat.descTr : cat.descEn}
                            </p>
                            <div className="bk-accordion-mobile-image">
                              <img src={cat.appImage} alt={cat.titleTr} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Image Column (Desktop only) */}
              <div className="bk-experience-right">
                <div className="bk-experience-image-container">
                  {veneerCategories.map((cat, index) => (
                    <div
                      key={cat.id}
                      className={`bk-experience-img-slide ${activeTab === index ? 'active' : ''}`}
                      style={{ backgroundImage: `url('${cat.appImage}')` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bk-showcase-section" id="projeler">
        <div className="bk-showcase-container">
          <div className="bk-veneer-header">
            <div className="bk-header-line" />
            <h2 className="bk-veneer-title">
              {activeLang === 'tr' ? 'Toprağın özünden gelen güzellik' : 'Beauty from the essence of the earth'}
            </h2>
            <p className="bk-veneer-desc">
              {activeLang === 'tr' 
                ? 'Sertifikalı ahşap kaplamalarda 20 yıllık uzmanlık.' 
                : '20 years of expertise in certified wood veneers.'}
            </p>
          </div>
          <div className="bk-showcase-card" style={{ backgroundImage: `url('/assets/burckaplama/wood_veneer_showcase.png')` }}>
            <div className="bk-showcase-overlay" />
            <div className="bk-showcase-content">
              <span className="bk-showcase-badge">
                {activeLang === 'tr' ? 'DOĞAL KAPLAMA' : 'NATURAL VENEER'}
              </span>
              <h2 className="bk-showcase-title">
                {activeLang === 'tr' 
                  ? 'Doğanın dokusu, evinizin ruhu' 
                  : 'The texture of nature, the soul of your home'}
              </h2>
              <p className="bk-showcase-subtitle">
                {activeLang === 'tr'
                  ? 'Taş, ahşap ve doğal malzemelerle zamansız mekanlar yaratıyoruz.'
                  : 'We create timeless spaces with stone, wood, and natural materials.'}
              </p>
              <a href="#" onClick={(e) => e.preventDefault()} className="bk-showcase-btn" style={{ cursor: 'default' }}>
                {activeLang === 'tr' ? 'Ürünleri Keşfet' : 'Explore Products'}
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Blog & Bilgi Merkezi Section */}
      <section className="bk-blog-section" id="blog">
        <div className="bk-blog-container">
          <div className="bk-blog-header">
            <h2 className="bk-blog-title-main">
              {activeLang === 'tr' ? 'İlham Veren Fikirler' : 'Inspiring Ideas'}
            </h2>
            <span className="bk-blog-subtitle">
              {activeLang === 'tr' 
                ? 'Ahşap kaplama dünyasındaki en yeni trendler, uygulama rehberleri ve uzman görüşleri.' 
                : 'The latest trends in the wood veneer world, application guides, and expert opinions.'}
            </span>
          </div>

          <div className="bk-blog-grid">
            {/* Blog Post 1 */}
            <article className="bk-blog-card">
              <a href="#" onClick={(e) => e.preventDefault()} className="bk-blog-card-link" style={{ cursor: 'default' }}>
                <div className="bk-blog-img-wrapper">
                  <img src="/assets/burckaplama/blog_veneer_selection.png" alt="Doğal Ahşap Kaplama Seçimi" className="bk-blog-img" />
                  <span className="bk-blog-badge">
                    {activeLang === 'tr' ? 'REHBER' : 'GUIDE'}
                  </span>
                </div>
                <div className="bk-blog-body">
                  <span className="bk-blog-date">{activeLang === 'tr' ? '12 Mayıs 2026' : 'May 12, 2026'}</span>
                  <h3 className="bk-blog-card-title">
                    {activeLang === 'tr' 
                      ? 'Doğal Ahşap Kaplama Seçerken Nelere Dikkat Edilmeli?' 
                      : 'What to Consider When Choosing Natural Wood Veneers?'}
                  </h3>
                  <p className="bk-blog-excerpt">
                    {activeLang === 'tr'
                      ? 'Mekanlarınıza değer katacak doğru ahşap kaplama türünü seçmenin püf noktaları: Hare yapısı, renk tonu ve dayanıklılık kriterleri.'
                      : 'The key points of choosing the right wood veneer type to add value to your spaces: Grain structure, color tone, and durability criteria.'}
                  </p>
                  <span className="bk-blog-readmore">
                    {activeLang === 'tr' ? 'Devamını Oku' : 'Read More'} →
                  </span>
                </div>
              </a>
            </article>

            {/* Blog Post 2 */}
            <article className="bk-blog-card">
              <a href="#" onClick={(e) => e.preventDefault()} className="bk-blog-card-link" style={{ cursor: 'default' }}>
                <div className="bk-blog-img-wrapper">
                  <img src="/assets/burckaplama/blog_veneer_trends.png" alt="Alpi Kaplama ve Sürdürülebilirlik" className="bk-blog-img" />
                  <span className="bk-blog-badge">
                    {activeLang === 'tr' ? 'TRENDLER' : 'TRENDS'}
                  </span>
                </div>
                <div className="bk-blog-body">
                  <span className="bk-blog-date">{activeLang === 'tr' ? '08 Mayıs 2026' : 'May 8, 2026'}</span>
                  <h3 className="bk-blog-card-title">
                    {activeLang === 'tr' 
                      ? 'İç Mimaride Yeni Akım: Alpi Kaplama ve Sürdürülebilirlik' 
                      : 'New Trend in Interior Architecture: Alpi Veneer & Sustainability'}
                  </h3>
                  <p className="bk-blog-excerpt">
                    {activeLang === 'tr'
                      ? 'Modern mimaride sürdürülebilir tasarımın önemi artıyor. İleri teknolojiyle üretilen Alpi kaplamaların sunduğu estetik ve çevreci çözümler.'
                      : 'The importance of sustainable design in modern architecture is increasing. Aesthetic and eco-friendly solutions offered by advanced tech Alpi veneers.'}
                  </p>
                  <span className="bk-blog-readmore">
                    {activeLang === 'tr' ? 'Devamını Oku' : 'Read More'} →
                  </span>
                </div>
              </a>
            </article>

            {/* Blog Post 3 */}
            <article className="bk-blog-card">
              <a href="#" onClick={(e) => e.preventDefault()} className="bk-blog-card-link" style={{ cursor: 'default' }}>
                <div className="bk-blog-img-wrapper">
                  <img src="/assets/burckaplama/blog_veneer_maintenance.png" alt="Ahşap Kaplama Bakımı" className="bk-blog-img" />
                  <span className="bk-blog-badge">
                    {activeLang === 'tr' ? 'TEKNİK' : 'TECHNICAL'}
                  </span>
                </div>
                <div className="bk-blog-body">
                  <span className="bk-blog-date">{activeLang === 'tr' ? '03 Mayıs 2026' : 'May 3, 2026'}</span>
                  <h3 className="bk-blog-card-title">
                    {activeLang === 'tr' 
                      ? 'Ahşap Kaplamaların Bakımı ve Uzun Ömürlü Kullanım Sırları' 
                      : 'Wood Veneer Maintenance & Secrets of Long-lasting Use'}
                  </h3>
                  <p className="bk-blog-excerpt">
                    {activeLang === 'tr'
                      ? 'Ahşap kaplamalı yüzeylerin doğal güzelliğini yıllar boyu koruması için temizlik, nem kontrolü ve koruyucu vernik uygulaması önerileri.'
                      : 'Cleaning, moisture control, and protective varnish application recommendations to preserve the natural beauty of wood veneered surfaces for years.'}
                  </p>
                  <span className="bk-blog-readmore">
                    {activeLang === 'tr' ? 'Devamını Oku' : 'Read More'} →
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
