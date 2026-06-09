import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { ArrowRight } from 'lucide-react';
import './capilon.css';

export default function CapilonHome() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  // State Management
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = 2;

  // Set Document Title and Meta Description on Mount
  useEffect(() => {
    document.title = activeLang === 'tr'
      ? "Capilon Mobilya | Premium Ev Mobilyaları ve Yaşam Alanları"
      : "Capilon Furniture | Premium Home Furniture & Living Spaces";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }

    const descText = activeLang === 'tr'
      ? "Eviniz için ilham veren, sıcak ve zamansız dokunuşlar. Modern salon, yatak odası ve yemek odası mobilya koleksiyonunu keşfedin."
      : "Inspiring, warm and timeless touches for your home. Discover the modern living room, bedroom and dining room furniture collections.";
    
    metaDesc.setAttribute('content', descText);
  }, [activeLang]);

  // Slider Auto Play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll reveal animations (.reveal-up)
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const quickCategories = [
    { title: translate('Yemek Odaları', 'Dining Rooms'), img: '/assets/capilon/images/product_dining_1779477859352.png', link: '#yemek' },
    { title: translate('Yatak Odaları', 'Bedrooms'), img: '/assets/capilon/images/hero_bedroom_1779477829254.png', link: '#yatak' },
    { title: translate('Koltuk Takımları', 'Living Room Sets'), img: '/assets/capilon/images/product_sofa_1779477845050.png', link: '#koltuk' },
    { title: translate('Kanepeler', 'Sofas'), img: '/assets/capilon/images/hero_living_room_1779477814666.png', link: '#kanepeler' },
    { title: translate('Berjerler', 'Armchairs'), img: '/assets/capilon/images/product_sofa_1779477845050.png', link: '#berjerler' },
    { title: translate('Köşe Takımları', 'Corner Sofas'), img: '/assets/capilon/images/product_sofa_1779477845050.png', link: '#kose' },
    { title: translate('TV Üniteleri', 'TV Units'), img: '/assets/capilon/images/product_dining_1779477859352.png', link: '#tv' },
    { title: translate('Bebek Odaları', 'Baby Rooms'), img: '/assets/capilon/images/hero_bedroom_1779477829254.png', link: '#bebek' },
    { title: translate('Genç Odaları', 'Teen Rooms'), img: '/assets/capilon/images/hero_living_room_1779477814666.png', link: '#genc' },
    { title: translate('Tek Kişilik Yataklar', 'Single Beds'), img: '/assets/capilon/images/hero_bedroom_1779477829254.png', link: '#yatak' },
    { title: translate('Çift Kişilik Yataklar', 'Double Beds'), img: '/assets/capilon/images/hero_bedroom_1779477829254.png', link: '#yatak' },
    { title: translate('Başlıklar', 'Headboards'), img: '/assets/capilon/images/hero_bedroom_1779477829254.png', link: '#yatak' },
    { title: translate('Tekil Ürünler', 'Single Items'), img: '/assets/capilon/images/product_sofa_1779477845050.png', link: '#tekil' },
    { title: translate('Mutfak ve Balkon', 'Kitchen & Balcony'), img: '/assets/capilon/images/product_dining_1779477859352.png', link: '#mutfak' },
    { title: translate('Bank Takımları', 'Bench Sets'), img: '/assets/capilon/images/product_dining_1779477859352.png', link: '#bank' },
    { title: translate('Sehpalar', 'Coffee Tables'), img: '/assets/capilon/images/product_sofa_1779477845050.png', link: '#sehpalar' },
  ];

  const monthlyFeatured = [
    {
      brand: 'NOVA',
      desc: translate('Yemek Odası Takımı', 'Dining Room Set'),
      subtitle: translate('Yeni Koleksiyon', 'New Collection'),
      title: translate('Nova Yemek Odası', 'Nova Dining Room'),
      text: translate('Modern çizgiler ve doğal dokular...', 'Modern lines and natural textures...'),
      img: '/assets/capilon/images/product_dining_1779477859352.png',
      link: '#yemek'
    },
    {
      brand: 'NOVA',
      desc: translate('Koltuk Takımı', 'Living Room Set'),
      subtitle: translate('Çok Satanlar', 'Best Sellers'),
      title: translate('Nova Koltuk Takımı', 'Nova Sofa Set'),
      text: translate('Eşsiz konfor ve minimal tasarım...', 'Unique comfort and minimal design...'),
      img: '/assets/capilon/images/product_sofa_1779477845050.png',
      link: '#koltuk'
    },
    {
      brand: 'LINA',
      desc: translate('Yatak Odası Takımı', 'Bedroom Set'),
      subtitle: translate('Huzurlu Seçim', 'Peaceful Choice'),
      title: translate('Lina Yatak Odası', 'Lina Bedroom'),
      text: translate('Güne dingin bir başlangıç yapın...', 'Start the day serenely...'),
      img: '/assets/capilon/images/hero_bedroom_1779477829254.png',
      link: '#yatak'
    },
    {
      brand: 'VIGO',
      desc: translate('Yaşam Ünitesi', 'Living Unit'),
      subtitle: translate('Yenilikçi Form', 'Innovative Form'),
      title: translate('Polar Yaşam Ünitesi', 'Polar Living Unit'),
      text: translate('Salonunuza karakter katacak detaylar...', 'Details to add character to your living room...'),
      img: '/assets/capilon/images/hero_living_room_1779477814666.png',
      link: '#tv'
    }
  ];

  return (
    <main id="main-content">
      {/* Slider Section */}
      <section className="hero-section" aria-labelledby="hero-heading" id="hero">
        <div className="hero-slider" id="hero-slider">
          {/* Slide 1: Living Room */}
          <div className={`hero-slide ${activeSlide === 0 ? 'active' : ''}`}>
            <div className="hero-slide-bg" style={{ backgroundImage: `url('/assets/capilon/images/hero_living_room_1779477814666.png')` }} />
            <div className="hero-content">
              <span className="hero-overline">{translate('YENİ SEZON KOLEKSİYONU', 'NEW SEASON COLLECTION')}</span>
              <h1 id="hero-heading">
                {translate('Zamanın Ötesinde', 'Beyond Time')}<br />
                {translate('Tasarım Anlayışı', 'Design Conception')}
              </h1>
              <p>
                {translate(
                  "Yaşam alanlarınıza modern, şık ve zamansız dokunuşlar. Capilon'un yenilenen premium konforunu keşfedin.",
                  "Modern, stylish and timeless touches to your living spaces. Discover Capilon's renewed premium comfort."
                )}
              </p>
              <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-1">
                {translate('Koleksiyonu Keşfet', 'Discover Collection')} <span className="arrow">→</span>
              </a>
            </div>
          </div>

          {/* Slide 2: Bedroom */}
          <div className={`hero-slide ${activeSlide === 1 ? 'active' : ''}`}>
            <div className="hero-slide-bg" style={{ backgroundImage: `url('/assets/capilon/images/hero_bedroom_1779477829254.png')` }} />
            <div className="hero-content">
              <span className="hero-overline">{translate('HUZURUN MİMARİSİ', 'ARCHITECTURE OF SERENITY')}</span>
              <h2>
                {translate('Kusursuz Uyku', 'Perfect Sleep')}<br />
                {translate('Deneyimi', 'Experience')}
              </h2>
              <p>
                {translate(
                  "Günün yorgunluğunu geride bırakacağınız, sizi rahatlığıyla sarmalayan estetik yatak odası tasarımları.",
                  "Aesthetic bedroom designs that surround you with comfort, letting you leave the day's fatigue behind."
                )}
              </p>
              <a href="#koleksiyonlar" className="btn-primary" id="hero-cta-2">
                {translate('Koleksiyonu İncele', 'Examine Collection')} <span className="arrow">→</span>
              </a>
            </div>
          </div>

          {/* Slider Arrows */}
          <button className="slider-arrow prev-arrow" aria-label={translate('Önceki Slayt', 'Previous Slide')} onClick={() => handleSlideChange((activeSlide - 1 + slideCount) % slideCount)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="slider-arrow next-arrow" aria-label={translate('Sonraki Slayt', 'Next Slide')} onClick={() => handleSlideChange((activeSlide + 1) % slideCount)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Slider Controls */}
          <div className="slider-controls">
            <button className={`slider-dot ${activeSlide === 0 ? 'active' : ''}`} aria-label="Slayt 1" onClick={() => handleSlideChange(0)}></button>
            <button className={`slider-dot ${activeSlide === 1 ? 'active' : ''}`} aria-label="Slayt 2" onClick={() => handleSlideChange(1)}></button>
          </div>
        </div>
      </section>

      {/* 5. Hızlı Kategoriler (Marquee Loop) */}
      <section className="quick-categories" aria-label="Hızlı Kategoriler">
        <div className="quick-categories-header">
          <h2>{translate('Yaşam Alanınızı Yeniden Keşfedin', 'Rediscover Your Living Space')}</h2>
          <p>{translate('Tarzınızı yansıtacak en seçkin kategorilerle tanışın.', 'Meet the most exclusive categories that reflect your style.')}</p>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {/* Set 1 */}
            {quickCategories.map((cat, idx) => (
              <a key={`cat1-${idx}`} href={cat.link} className="cat-circle">
                <div className="circle-img-wrap">
                  <img src={cat.img} alt={cat.title} loading="lazy" />
                </div>
                <span>{cat.title}</span>
              </a>
            ))}
            {/* Set 2 (Duplicate for seamless scroll) */}
            {quickCategories.map((cat, idx) => (
              <a key={`cat2-${idx}`} href={cat.link} className="cat-circle">
                <div className="circle-img-wrap">
                  <img src={cat.img} alt={cat.title} loading="lazy" />
                </div>
                <span>{cat.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Woodmart Style Product Collections Section */}
      <section className="product-collections-section" id="koleksiyonlar">
        <div className="pc-header">
          <h2>{translate('İlham Veren Yaşam Alanları', 'Inspiring Living Spaces')}</h2>
          <p>{translate('Evinizin her köşesi için özenle tasarlanmış, estetik ve konforu buluşturan seçkin koleksiyonlarımız.', 'Our distinguished collections carefully designed for every corner of your home, bringing together aesthetics and comfort.')}</p>
        </div>
        <div className="pc-grid">
          <div className="pc-col">
            <a href="#koltuk" className="pc-item" style={{ height: '450px' }}>
              <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Koltuk Takımları" />
              <div className="pc-overlay"><span>{translate('Koltuk Takımları', 'Living Room Sets')}</span></div>
            </a>
            <a href="#berjerler" className="pc-item" style={{ height: '300px' }}>
              <img src="/assets/capilon/images/cat_armchair_warm.png" alt="Berjerler" />
              <div className="pc-overlay"><span>{translate('Berjerler', 'Armchairs')}</span></div>
            </a>
          </div>
          <div className="pc-col">
            <a href="#yatak" className="pc-item" style={{ height: '500px' }}>
              <img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Yatak Odaları" />
              <div className="pc-overlay"><span>{translate('Yatak Odaları', 'Bedrooms')}</span></div>
            </a>
            <div className="pc-item pc-text-block pc-bg-anthracite" style={{ height: '250px' }}>
              <h3>{translate('Konfor', 'Comfort')}</h3>
              <p>{translate('Eşsiz rahatlık ve modern konforu yaşam alanlarınıza taşıyan, bedeninizi ve ruhunuzu dinlendiren tasarımlar.', 'Designs that bring unique ease and modern comfort to your living spaces, resting your body and soul.')}</p>
            </div>
          </div>
          <div className="pc-col">
            <a href="#yemek" className="pc-item" style={{ height: '350px' }}>
              <img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Yemek Odaları" />
              <div className="pc-overlay"><span>{translate('Yemek Odaları', 'Dining Rooms')}</span></div>
            </a>
            <a href="#kose" className="pc-item" style={{ height: '400px' }}>
              <img src="/assets/capilon/images/cat_corner_sofa_warm.png" alt="Köşe Takımları" />
              <div className="pc-overlay"><span>{translate('Köşe Takımları', 'Corner Sofas')}</span></div>
            </a>
          </div>
          <div className="pc-col">
            <div className="pc-item pc-text-block pc-bg-orange" style={{ height: '250px' }}>
              <h3>{translate('Modern', 'Modern')}</h3>
              <p>{translate('Estetik ve fonksiyonelliğin birleştiği, evinizi saran yepyeni bir tasarım çizgisi.', 'A brand new design line that surrounds your home, where aesthetics and functionality merge.')}</p>
            </div>
            <a href="#genc" className="pc-item" style={{ height: '500px' }}>
              <img src="/assets/capilon/images/cat_teen_room_warm.png" alt="Genç Odaları" />
              <div className="pc-overlay"><span>{translate('Genç Odaları', 'Teen Rooms')}</span></div>
            </a>
          </div>
          <div className="pc-col">
            <a href="#tv" className="pc-item" style={{ height: '450px' }}>
              <img src="/assets/capilon/images/cat_tv_unit_warm.png" alt="TV Üniteleri" />
              <div className="pc-overlay"><span>{translate('TV Üniteleri', 'TV Units')}</span></div>
            </a>
            <a href="#bebek" className="pc-item" style={{ height: '300px' }}>
              <img src="/assets/capilon/images/cat_baby_room_warm.png" alt="Bebek Odaları" />
              <div className="pc-overlay"><span>{translate('Bebek Odaları', 'Baby Rooms')}</span></div>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Comfort Plus Banner Section */}
      <section className="comfort-series-section">
        <div className="comfort-wrapper">
          <div className="comfort-content">
            <h2>
              {translate('Evinizde zamanın', 'Time stopping in')}<br />
              {translate('durduğu o huzur dolu', 'your home in those')}<br />
              {translate('anlar yaratın...', 'serene moments...')}
            </h2>
            <p>{translate('Yorucu bir günün ardından sığındığınız anlar için tasarlandı. Sizi kucaklayan formlar, kusursuz el işçiliği ve zamansız Capilon estetiğiyle tanışın.', "Designed for the moments you shelter in after a tiring day. Meet the forms that embrace you, flawless craftsmanship, and timeless Capilon aesthetics.")}</p>
            <a href="#koleksiyonlar" className="btn-comfort-outline">{translate('KEŞFEDİN', 'DISCOVER')}</a>
          </div>
          <div className="comfort-image">
            <img src="/assets/capilon/images/capilon_comfort_series_1779567476232.png" alt="Capilon Comfort Serisi" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 8. Monthly Featured Products */}
      <section className="monthly-featured-section">
        <div className="monthly-header">
          <h2>{translate('Bu Ayın Öne Çıkan Ürünleri', 'Featured Products of the Month')}</h2>
          <p>{translate('En çok beğenilen ve yeni eklenen koleksiyonlarimizi hemen keşfedin.', 'Discover our most liked and newly added collections immediately.')}</p>
        </div>
        <div className="monthly-marquee-wrapper">
          <div className="monthly-marquee-track">
            {/* Set 1 */}
            {monthlyFeatured.map((prod, idx) => (
              <article key={`monthly1-${idx}`} className="monthly-card">
                <a href={prod.link} className="monthly-card-link">
                  <div className="monthly-img-wrapper">
                    <img src={prod.img} alt={prod.title} loading="lazy" />
                    <div className="monthly-img-overlay">
                      <span className="overlay-brand">{prod.brand}</span>
                      <span className="overlay-desc">{prod.desc}</span>
                    </div>
                  </div>
                  <div className="monthly-info">
                    <div className="monthly-text">
                      <span className="monthly-subtitle">{prod.subtitle}</span>
                      <h3 className="monthly-title">{prod.title}</h3>
                      <p className="monthly-desc">{prod.text}</p>
                    </div>
                    <div className="monthly-action">
                      <div className="action-btn">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
            {/* Set 2 (Duplicate for seamless scroll) */}
            {monthlyFeatured.map((prod, idx) => (
              <article key={`monthly2-${idx}`} className="monthly-card">
                <a href={prod.link} className="monthly-card-link">
                  <div className="monthly-img-wrapper">
                    <img src={prod.img} alt={prod.title} loading="lazy" />
                    <div className="monthly-img-overlay">
                      <span className="overlay-brand">{prod.brand}</span>
                      <span className="overlay-desc">{prod.desc}</span>
                    </div>
                  </div>
                  <div className="monthly-info">
                    <div className="monthly-text">
                      <span className="monthly-subtitle">{prod.subtitle}</span>
                      <h3 className="monthly-title">{prod.title}</h3>
                      <p className="monthly-desc">{prod.text}</p>
                    </div>
                    <div className="monthly-action">
                      <div className="action-btn">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Blog Section */}
      <section className="blog-section" id="blog">
        <div className="blog-wrapper">
          <div className="blog-header">
            <h2>{translate('İlham Veren Fikirler', 'Inspiring Ideas')}</h2>
            <p>{translate('Evinizi dönüştürecek dekorasyon ipuçları ve en yeni trendler.', 'Decoration tips and the newest trends that will transform your home.')}</p>
          </div>
          <div className="blog-grid">
            <article className="blog-card">
              <div className="blog-img-wrapper">
                <img src="/assets/capilon/images/blog_minimalist_living_1779569364192.png" alt="Minimalist Dekorasyon" loading="lazy" />
                <span className="blog-category">{translate('DEKORASYON', 'DECORATION')}</span>
              </div>
              <div className="blog-content">
                <span className="blog-date">{translate('12 Mayıs 2026', 'May 12, 2026')}</span>
                <h3 className="blog-title">{translate('Minimalist Ev Dekorasyonu İçin 5 İpucu', '5 Tips for Minimalist Home Decoration')}</h3>
                <p className="blog-excerpt">{translate('Ferah ve huzurlu bir yaşam alanı yaratmanın en sade ve etkili yollarını keşfedin. Doğal ışığı içeri alın.', 'Discover the simplest and most effective ways to create a spacious and peaceful living space. Let natural light in.')}</p>
                <a href="#blog" className="blog-read-more">
                  {translate('Devamını Oku', 'Read More')} <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                </a>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-img-wrapper">
                <img src="/assets/capilon/images/blog_color_trends_1779569377371.png" alt="Renk Trendleri" loading="lazy" />
                <span className="blog-category">{translate('TRENDLER', 'TRENDS')}</span>
              </div>
              <div className="blog-content">
                <span className="blog-date">{translate('08 Mayıs 2026', 'May 8, 2026')}</span>
                <h3 className="blog-title">{translate('2026 Mobilya Renk Trendleri', '2026 Furniture Color Trends')}</h3>
                <p className="blog-excerpt">{translate('Gece mavisi, kiremit ve zeytin yeşili bu yıl mekanlara hakim oluyor. Renklerin psikolojik etkilerini inceledik.', 'Midnight blue, brick and olive green dominate spaces this year. We analyzed the psychological effects of colors.')}</p>
                <a href="#blog" className="blog-read-more">
                  {translate('Devamını Oku', 'Read More')} <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                </a>
              </div>
            </article>

            <article className="blog-card">
              <div className="blog-img-wrapper">
                <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Doğru Koltuk Seçimi" loading="lazy" />
                <span className="blog-category">{translate('REHBER', 'GUIDE')}</span>
              </div>
              <div className="blog-content">
                <span className="blog-date">{translate('03 Mayıs 2026', 'May 3, 2026')}</span>
                <h3 className="blog-title">{translate('Salonunuz İçin Doğru Koltuk Seçimi', 'Choosing the Right Sofa for Your Living Room')}</h3>
                <p className="blog-excerpt">{translate('Alanınızın ölçüleri, kumaş türleri ve kullanım alışkanlıklarınıza göre mükemmel koltuğu nasıl bulursunuz?', 'How do you find the perfect sofa based on your space measurements, fabric types, and usage habits?')}</p>
                <a href="#blog" className="blog-read-more">
                  {translate('Devamını Oku', 'Read More')} <ArrowRight size={14} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 10. Newsletter Banner */}
      <section className="newsletter-banner">
        <div className="newsletter-banner-container">
          <div className="newsletter-text">
            <h2>{translate('Capilon Ailesine Katılın', 'Join the Capilon Family')}</h2>
            <p>{translate('En yeni koleksiyonlar, dekorasyon önerileri ve size özel ayrıcalıklardan ilk siz haberdar olun.', 'Be the first to know about the newest collections, decoration tips, and exclusive privileges.')}</p>
          </div>
          <div className="subscribe-form">
            <form action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={translate('E-posta adresinizi giriniz...', 'Enter your email address...')} aria-label="E-posta Adresi" required />
              <button type="submit">{translate('Abone Ol', 'Subscribe')}</button>
            </form>
          </div>
        </div>
      </section>

      {/* 11. Premium Manifesto & Shipping Section */}
      <section className="premium-manifesto-section">
        <div className="manifesto-container">
          <div className="manifesto-top">
            <div className="manifesto-image-wrapper">
              <img src="/assets/capilon/images/premium_craftsmanship_1779572256681.png" alt="30 Yıllık Tecrübe" />
              <div className="manifesto-badge-new">
                <div className="mb-circle">
                  <span className="mb-number">30</span>
                  <span className="mb-text">{translate('YILLIK', 'YEARS OF')}<br />{translate('TECRÜBE', 'EXPERIENCE')}</span>
                </div>
              </div>
            </div>
            <div className="manifesto-content">
              <div className="manifesto-header">
                <h2>{translate('Capilon Farkı', 'The Capilon Difference')}</h2>
              </div>
              <div className="manifesto-list">
                <div className="manifesto-item">
                  <div className="manifesto-number">01</div>
                  <div className="manifesto-text">
                    <h3>{translate('Sizin için tasarlıyor, Türkiye için üretiyoruz.', 'Designing for you, producing for Turkey.')}</h3>
                    <p>{translate('Nelere ihtiyacınız olduğunu biliyor ve dünyanın tasarım trendini araştırarak sizin için en doğrusunu üretiyoruz.', 'We know what you need and produce the most correct ones for you by researching the world\'s design trends.')}</p>
                  </div>
                </div>
                <div className="manifesto-item">
                  <div className="manifesto-number">02</div>
                  <div className="manifesto-text">
                    <h3>{translate('30 Yılın tecrübesi ile geliştiriyoruz.', 'Developing with 30 years of experience.')}</h3>
                    <p>{translate('Kullanıcı deneyimine dayalı, sağlam, modern, kullanışlı ve şık ürünleri sizinle buluşturmak adına fabrikamızda üretiyoruz.', 'We produce sturdy, modern, useful and stylish products based on user experience in our factory to bring them to you.')}</p>
                  </div>
                </div>
                <div className="manifesto-item">
                  <div className="manifesto-number">03</div>
                  <div className="manifesto-text">
                    <h3>{translate('Türkiye\'nin her yerindeyiz.', 'We are everywhere in Turkey.')}</h3>
                    <p>{translate('Tüm Türkiye\'ye özenle ambalajlanmış ürünlerimizi hızla sevk ediyor ve hak edilen kalitenin herkes tarafından yaşanması için çaba veriyoruz.', 'We ship our carefully packaged products rapidly all over Turkey and strive to let everyone experience the deserved quality.')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="manifesto-bottom-bar">
            <div className="m-shipping-grid">
              <div className="m-shipping-card">
                <div className="m-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="m-shipping-text">
                  <span className="m-shipping-title">{translate('15 Günde Kargoda', 'Shipped in 15 Days')}</span>
                  <span className="m-shipping-desc">{translate('Hızlı ve güvenli teslimat', 'Fast and safe delivery')}</span>
                </div>
              </div>
              <div className="m-shipping-card">
                <div className="m-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="m-shipping-text">
                  <span className="m-shipping-title">{translate('Ücretsiz Kargo', 'Free Shipping')}</span>
                  <span className="m-shipping-desc">{translate('Ankara içi teslimatlarda', 'For deliveries in Ankara')}</span>
                </div>
              </div>
              <div className="m-shipping-card">
                <div className="m-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="m-shipping-text">
                  <span className="m-shipping-title">{translate('Türkiye\'nin Her Yerine', 'To Everywhere in Turkey')}</span>
                  <span className="m-shipping-desc">{translate('Anlaşmalı kargo güvencesi', 'Contracted cargo assurance')}</span>
                </div>
              </div>
            </div>
            <Link to={getLocalizedPath('/iletisim')} className="manifesto-action-btn">
              <span className="btn-text">{translate('MÜŞTERİ TEMSİLCİSİ', 'CUSTOMER REPRESENTATIVE')}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
