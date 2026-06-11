import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { Plus, Minus, ShieldCheck, Truck, Award, HelpingHand, Newspaper } from 'lucide-react';
import { updateSEOMeta } from '../../utils/seo';

// Local product data mapping for visual parity without Firestore records
const capilonProducts = {
  'serenity-yemek-odasi-takimi': {
    title: 'Serenity Yemek Odası Takımı',
    titleEn: 'Serenity Dining Room Set',
    category: 'Yemek Odaları',
    categoryEn: 'Dining Rooms',
    desc: "Capilon'un ince düşünülmüş ahşap ve metal detayları, estetik sandalye tasarımları ve genişletilebilir fonksiyonel masa yapısıyla yaşam alanlarınıza şıklık katan Serenity Yemek Odası Takımı.",
    descEn: "Serenity Dining Room Set adding elegance to your living spaces with Capilon's finely thought wooden and metal details, aesthetic chair designs and extendable functional table structure.",
    images: [
      '/assets/capilon/images/Serenity Yemek Odasi-01.jpg',
      '/assets/capilon/images/Serenity Yemek Odasi-02.jpg',
      '/assets/capilon/images/Serenity Yemek Odasi-03.jpg',
      '/assets/capilon/images/Serenity Yemek Odasi-04.jpg',
      '/assets/capilon/images/Serenity Yemek Odasi-05.jpg'
    ]
  },
  'lizbon-yemek-odasi-takimi': {
    title: 'Lizbon Yemek Odası Takımı',
    titleEn: 'Lisbon Dining Room Set',
    category: 'Yemek Odaları',
    categoryEn: 'Dining Rooms',
    desc: 'Modern tasarım detayları ve konforlu yapısıyla yaşam alanınıza şıklık katan Lizbon Yemek Odası Takımı.',
    descEn: 'Lisbon Dining Room Set adding elegance to your living space with its modern design details and comfortable structure.',
    images: ['/assets/capilon/images/lizbon_yemek_odasi.png']
  },
  'madrid-yemek-odasi-takimi': {
    title: 'Madrid Yemek Odası Takımı',
    titleEn: 'Madrid Dining Room Set',
    category: 'Yemek Odaları',
    categoryEn: 'Dining Rooms',
    desc: 'Zarif detaylar ve estetik ahşap dokusuyla tasarlanan Madrid Yemek Odası Takımı.',
    descEn: 'Madrid Dining Room Set designed with elegant details and aesthetic wooden texture.',
    images: ['/assets/capilon/images/madrid_yemek_odasi.png']
  },
  'valentina-yemek-odasi-takimi': {
    title: 'Valentina Yemek Odası Takımı',
    titleEn: 'Valentina Dining Room Set',
    category: 'Yemek Odaları',
    categoryEn: 'Dining Rooms',
    desc: 'Premium detaylar ve modern çizgilerle kurgulanmış Valentina Yemek Odası Takımı.',
    descEn: 'Valentina Dining Room Set constructed with premium details and modern lines.',
    images: ['/assets/capilon/images/valentina_yemek_odasi.png']
  },
  'bohem-yemek-odasi-takimi': {
    title: 'Bohem Yemek Odası Takımı',
    titleEn: 'Bohemian Dining Room Set',
    category: 'Yemek Odaları',
    categoryEn: 'Dining Rooms',
    desc: 'Doğal dokuların ve sıcak tasarımların harmanlandığı Bohem Yemek Odası Takımı.',
    descEn: 'Bohemian Dining Room Set blending natural textures and warm designs.',
    images: ['/assets/capilon/images/bohem_yemek_odasi.png']
  }
};

export default function CapilonProductDetail({ product }) {
  const { slug } = useParams();
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  // Find local product details matching this slug, or fall back to passed product or Serenity
  const activeProductKey = capilonProducts[slug] ? slug : null;
  const pData = activeProductKey ? capilonProducts[activeProductKey] : {
    title: product?.name || 'Serenity Yemek Odası Takımı',
    titleEn: product?.name || 'Serenity Dining Room Set',
    category: 'Yemek Odaları',
    categoryEn: 'Dining Rooms',
    desc: product?.description || "Capilon'un ince düşünülmüş ahşap ve metal detayları...",
    descEn: product?.description || "Serenity Dining Room Set adding elegance...",
    images: product?.images?.length ? product.images : ['/assets/capilon/images/Serenity Yemek Odasi-01.jpg']
  };

  const pTitle = translate(pData.title, pData.titleEn);
  const pCategory = translate(pData.category, pData.categoryEn);
  const pDesc = translate(pData.desc, pData.descEn);
  const pImages = pData.images;

  // React state for gallery active index
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageFade, setImageFade] = useState(false);

  // React state for accordion open index (default 1st panel open)
  const [openAccordionIdx, setOpenAccordionIdx] = useState(null);

  useEffect(() => {
    updateSEOMeta({
      title: pTitle,
      description: pDesc,
      companyName: 'Capilon Mobilya'
    });
  }, [pTitle, pDesc]);

  // Gallery slider control
  const updateGallery = (index) => {
    if (index === activeImageIndex) return;
    setImageFade(true);
    setTimeout(() => {
      setActiveImageIndex(index);
      setImageFade(false);
    }, 150);
  };

  const nextImage = () => {
    let nextIdx = (activeImageIndex + 1) % pImages.length;
    updateGallery(nextIdx);
  };

  const prevImage = () => {
    let prevIdx = activeImageIndex - 1;
    if (prevIdx < 0) prevIdx = pImages.length - 1;
    updateGallery(prevIdx);
  };

  const toggleAccordion = (index) => {
    setOpenAccordionIdx(openAccordionIdx === index ? null : index);
  };

  // Alternative products list for the infinite loop marquee slider
  const alternativeProducts = [
    { name: 'Lizbon Yemek Odası Takımı', nameEn: 'Lisbon Dining Room Set', slug: 'lizbon-yemek-odasi-takimi', img: '/assets/capilon/images/lizbon_yemek_odasi.png' },
    { name: 'Madrid Yemek Odası Takımı', nameEn: 'Madrid Dining Room Set', slug: 'madrid-yemek-odasi-takimi', img: '/assets/capilon/images/madrid_yemek_odasi.png' },
    { name: 'Valentina Yemek Odası Takımı', nameEn: 'Valentina Dining Room Set', slug: 'valentina-yemek-odasi-takimi', img: '/assets/capilon/images/valentina_yemek_odasi.png' },
    { name: 'Bohem Yemek Odası Takımı', nameEn: 'Bohemian Dining Room Set', slug: 'bohem-yemek-odasi-takimi', img: '/assets/capilon/images/bohem_yemek_odasi.png' }
  ];

  // Double alternative products array for seamless looping marquee track
  const alternativeMarqueeList = [...alternativeProducts, ...alternativeProducts];

  return (
    <div className="capilon-theme product-page-wrapper">
      <main id="main-content">
        <section className="product-gallery-section">
          <div className="gallery-container">
            <div className="gallery-grid">
              
              {/* Breadcrumbs */}
              <div className="gallery-breadcrumbs">
                <Link to={getLocalizedPath('/')}>{translate('Anasayfa', 'Home')}</Link> /{' '}
                <Link to={getLocalizedPath('/koleksiyonlar/yemek-odalari')}>{pCategory}</Link> /{' '}
                <span>{pTitle}</span>
              </div>

              {/* 1. Left Column: Thumbnails */}
              {pImages.length > 1 ? (
                <div className="gallery-thumbnails">
                  {pImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      className={`thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => updateGallery(idx)}
                    >
                      <img src={imgUrl} alt={`${pTitle} Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="gallery-thumbnails empty-thumbnails"></div>
              )}

              {/* 2. Center Column: Large Main Image Viewer */}
              <div className="gallery-main-view">
                {pImages.length > 1 && (
                  <button 
                    className="slider-arrow arrow-left" 
                    onClick={prevImage} 
                    aria-label={translate('Önceki Görsel', 'Previous Image')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                )}
                
                <div className="slider-image-wrapper">
                  <img
                    id="main-gallery-img"
                    src={pImages[activeImageIndex]}
                    alt={pTitle}
                    className={imageFade ? 'fading' : ''}
                    style={{
                      transition: 'opacity 0.15s ease-in-out',
                      opacity: imageFade ? 0 : 1
                    }}
                  />
                </div>

                {pImages.length > 1 && (
                  <button 
                    className="slider-arrow arrow-right" 
                    onClick={nextImage} 
                    aria-label={translate('Sonraki Görsel', 'Next Image')}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                )}
              </div>

              {/* 3. Right Column: Product Info & Request Quote Button */}
              <div className="gallery-info">
                <h1 className="gallery-product-title">{pTitle.replace(' Yemek Odası Takımı', '').replace(' Dining Room Set', '')}</h1>
                <p className="gallery-product-desc">{pDesc}</p>
                <Link to={getLocalizedPath('/iletisim')} className="gallery-quote-btn">
                  {translate('TEKLİF AL', 'REQUEST QUOTE')}
                </Link>
              </div>

              {/* Product Details Accordion Section */}
              <div className="product-details-accordion">
                {/* 1. Ürüne Özel Fırsatlar */}
                <div className={`accordion-item ${openAccordionIdx === 0 ? 'active' : ''}`}>
                  <button 
                    className="accordion-header" 
                    aria-expanded={openAccordionIdx === 0 ? 'true' : 'false'}
                    onClick={() => toggleAccordion(0)}
                  >
                    <span className="accordion-title">{translate('Ürüne Özel Fırsatlar', 'Special Offers')}</span>
                    <span className="accordion-icon">
                      {openAccordionIdx === 0 ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div 
                    className="accordion-content"
                    style={{
                      maxHeight: openAccordionIdx === 0 ? '500px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease'
                    }}
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>{translate('Kombin Avantajı:', 'Combination Advantage:')}</strong>{' '}
                        {translate(
                          'Serenity Yemek Odası Masası ve Konsolu birlikte alımlarında sepette ekstra %10 kombin indirimi uygulanmaktadır.',
                          'Extra 10% bundle discount is applied to the cart for combined purchases of Serenity Dining Table and Console.'
                        )}
                      </p>
                      <p>
                        <strong>{translate('Ücretsiz Nakliye & Kurulum:', 'Free Shipping & Setup:')}</strong>{' '}
                        {translate(
                          'Serenity serisine özel, Türkiye genelinde nakliye ve profesyonel ekiplerimizce kurulum hizmetimiz tamamen ücretsizdir.',
                          'Exclusively for the Serenity series, shipping across Turkey and assembly by our professional teams are completely free of charge.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Ürün Özellikleri */}
                <div className={`accordion-item ${openAccordionIdx === 1 ? 'active' : ''}`}>
                  <button 
                    className="accordion-header" 
                    aria-expanded={openAccordionIdx === 1 ? 'true' : 'false'}
                    onClick={() => toggleAccordion(1)}
                  >
                    <span className="accordion-title">{translate('Ürün Özellikleri', 'Product Specifications')}</span>
                    <span className="accordion-icon">
                      {openAccordionIdx === 1 ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div 
                    className="accordion-content"
                    style={{
                      maxHeight: openAccordionIdx === 1 ? '500px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease'
                    }}
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>{translate('İşçilik & Malzeme:', 'Craftsmanship & Material:')}</strong>{' '}
                        {translate(
                          'Gövdede 1. sınıf lake boyalı MDF ve doğal meşe kaplama birlikteliği kullanılmıştır. Kapaklar ve çekmeceler çarpmayı önleyici gizli frenli menteşe sistemine sahiptir.',
                          'A combination of 1st class lacquered MDF and natural oak veneer is used in the body. Doors and drawers feature a soft-closing hidden hinge system.'
                        )}
                      </p>
                      <p>
                        <strong>{translate('Özel Detaylar:', 'Special Details:')}</strong>{' '}
                        {translate(
                          'Ayaklarda korozyona dayanıklı mat titanyum kaplama metal detaylar yer almaktadır.',
                          'Corrosion-resistant matte titanium plated metal accents are featured on the legs.'
                        )}
                      </p>
                      <p>
                        <strong>{translate('Kumaş Seçenekleri:', 'Fabric Options:')}</strong>{' '}
                        {translate(
                          'Sandalyelerde nefes alabilen, kolay temizlenebilir keten dokulu premium vizon kumaş tercih edilmiştir.',
                          'Breathable, easy-to-clean premium mink linen fabric is preferred for the chairs.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Ürün Boyutları */}
                <div className={`accordion-item ${openAccordionIdx === 2 ? 'active' : ''}`}>
                  <button 
                    className="accordion-header" 
                    aria-expanded={openAccordionIdx === 2 ? 'true' : 'false'}
                    onClick={() => toggleAccordion(2)}
                  >
                    <span className="accordion-title">{translate('Ürün Boyutları', 'Product Dimensions')}</span>
                    <span className="accordion-icon">
                      {openAccordionIdx === 2 ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div 
                    className="accordion-content"
                    style={{
                      maxHeight: openAccordionIdx === 2 ? '500px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease'
                    }}
                  >
                    <div className="accordion-body">
                      <table className="dimensions-table">
                        <thead>
                          <tr>
                            <th>{translate('Modül', 'Module')}</th>
                            <th>{translate('Genişlik', 'Width')}</th>
                            <th>{translate('Yükseklik', 'Height')}</th>
                            <th>{translate('Derinlik', 'Depth')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>{translate('Yemek Masası (Açılır)', 'Dining Table (Extendable)')}</strong></td>
                            <td>200 cm (Açıldığında 240 cm)</td>
                            <td>75 cm</td>
                            <td>100 cm</td>
                          </tr>
                          <tr>
                            <td><strong>{translate('Konsol', 'Console')}</strong></td>
                            <td>220 cm</td>
                            <td>80 cm</td>
                            <td>50 cm</td>
                          </tr>
                          <tr>
                            <td><strong>{translate('Sandalye', 'Chair')}</strong></td>
                            <td>50 cm</td>
                            <td>95 cm</td>
                            <td>55 cm</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 4. Teslimat ve Kurulum */}
                <div className={`accordion-item ${openAccordionIdx === 3 ? 'active' : ''}`}>
                  <button 
                    className="accordion-header" 
                    aria-expanded={openAccordionIdx === 3 ? 'true' : 'false'}
                    onClick={() => toggleAccordion(3)}
                  >
                    <span className="accordion-title">{translate('Teslimat ve Kurulum', 'Delivery & Setup')}</span>
                    <span className="accordion-icon">
                      {openAccordionIdx === 3 ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div 
                    className="accordion-content"
                    style={{
                      maxHeight: openAccordionIdx === 3 ? '500px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease'
                    }}
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>{translate('Lojistik Süreci:', 'Logistics Process:')}</strong>{' '}
                        {translate(
                          'Siparişiniz onaylandıktan sonra 21-30 iş günü içerisinde Capilon lojistik ağıyla güvenle sevk edilir.',
                          'Your order is safely shipped within 21-30 business days via Capilon logistics network after approval.'
                        )}
                      </p>
                      <p>
                        <strong>{translate('Montaj Hizmeti:', 'Assembly Service:')}</strong>{' '}
                        {translate(
                          'Ankara ve Bursa başta olmak üzere tüm Türkiye genelinde nakliye ve kurulum hizmeti uzman montaj ekibimizce ücretsiz sağlanmaktadır.',
                          'Shipping and setup service, especially in Ankara and Bursa, is provided free of charge by our expert assembly team throughout Turkey.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Satış Sonrası Destek */}
                <div className={`accordion-item ${openAccordionIdx === 4 ? 'active' : ''}`}>
                  <button 
                    className="accordion-header" 
                    aria-expanded={openAccordionIdx === 4 ? 'true' : 'false'}
                    onClick={() => toggleAccordion(4)}
                  >
                    <span className="accordion-title">{translate('Satış Sonrası Destek', 'After-Sales Support')}</span>
                    <span className="accordion-icon">
                      {openAccordionIdx === 4 ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div 
                    className="accordion-content"
                    style={{
                      maxHeight: openAccordionIdx === 4 ? '500px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease'
                    }}
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>{translate('Garanti Kapsamı:', 'Warranty Scope:')}</strong>{' '}
                        {translate(
                          'Serenity koleksiyonuna ait tüm parçalar, malzeme ve işçilik hatalarına karşı 2 yıl süresince Capilon üretici garantisi altındadır.',
                          'All modules of the Serenity collection are covered by Capilon manufacturer warranty for 2 years against materials and craftsmanship defects.'
                        )}
                      </p>
                      <p>
                        <strong>{translate('7/24 Teknik Servis:', '7/24 Technical Service:')}</strong>{' '}
                        {translate(
                          'Kullanım esnasında oluşabilecek her türlü teknik destek gereksinimi için WhatsApp hattımız veya çağrı merkezimiz üzerinden kolayca kayıt oluşturabilirsiniz.',
                          'For any technical support needs during use, you can easily open a request ticket via our WhatsApp line or call center.'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Alternative Products Section (Infinite Loop Marquee Track) */}
        <section className="alternative-products-section">
          <div className="alternative-container">
            <h3 className="alternative-section-title">{translate('Alternatif Ürünler', 'Alternative Products')}</h3>
            <div className="alternative-carousel-wrapper">
              <div className="alternative-track">
                {alternativeMarqueeList.map((item, idx) => (
                  <div key={idx} className="alternative-card">
                    <Link to={getLocalizedPath(`/urunler/${item.slug}`)} className="alternative-card-link">
                      <div className="alternative-image-wrapper">
                        <img src={item.img} alt={translate(item.name, item.nameEn)} loading="lazy" />
                      </div>
                      <div className="alternative-info">
                        <h4 className="alternative-title">{translate(item.name, item.nameEn)}</h4>
                        <span className="alternative-cta">
                          {translate('Detayları İncele', 'View Details')}{' '}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Highlights Section */}
        <section className="footer-highlights-section">
          <div className="highlights-container">
            
            {/* 1. E1 Standartlarında Kalite */}
            <div className="highlight-item">
              <div className="highlight-icon">
                <Award size={36} />
              </div>
              <h4 className="highlight-title">{translate('E1 Standartlarında Kalite', 'E1 Standard Quality')}</h4>
              <p className="highlight-desc">
                {translate(
                  'Sağlığa zararsız, çevre dostu ve tescilli Avrupa E1 kalitesinde malzemeler.',
                  'Harmless to health, environmentally friendly, and certified European E1 standard materials.'
                )}
              </p>
            </div>

            {/* 2. 2 Yıl Capilon Garantisi */}
            <div className="highlight-item">
              <div className="highlight-icon">
                <ShieldCheck size={36} />
              </div>
              <h4 className="highlight-title">{translate('2 Yıl Capilon Garantisi', '2 Years Capilon Warranty')}</h4>
              <p className="highlight-desc">
                {translate(
                  'Tasarım kalitemizin arkasındayız; tüm parçalarda 2 yıl üretici güvencesi.',
                  'We stand behind our design quality; 2-year manufacturer warranty on all components.'
                )}
              </p>
            </div>

            {/* 3. Ekspres Teslimat ve Kurulum */}
            <div className="highlight-item">
              <div className="highlight-icon">
                <Truck size={36} />
              </div>
              <h4 className="highlight-title">{translate('Ekspres Teslimat & Kurulum', 'Express Delivery & Assembly')}</h4>
              <p className="highlight-desc">
                {translate(
                  'Stoklu ürünlerde hızlı sevkiyat ve profesyonel montaj ekibimizle kurulum.',
                  'Fast shipment for in-stock products and setup by our professional assembly crew.'
                )}
              </p>
            </div>

            {/* 4. Uzman Müşteri Desteği */}
            <Link to={getLocalizedPath('/iletisim')} className="highlight-item">
              <div className="highlight-icon">
                <HelpingHand size={36} />
              </div>
              <h4 className="highlight-title">{translate('Uzman Müşteri Desteği', 'Expert Customer Support')}</h4>
              <p className="highlight-desc">
                {translate(
                  'Showroom adreslerimiz, iletişim ve sipariş süreçleriniz için tıklayın.',
                  'Click for our showroom addresses, contact details and order support workflows.'
                )}
              </p>
            </Link>

            {/* 5. İlham Veren Blog */}
            <Link to={getLocalizedPath('/blog')} className="highlight-item">
              <div className="highlight-icon">
                <Newspaper size={36} />
              </div>
              <h4 className="highlight-title">{translate('İlham Veren Blog', 'Inspiring Blog')}</h4>
              <p className="highlight-desc">
                {translate(
                  'Evinizi güzelleştirecek en yeni mobilya trendleri ve dekorasyon önerileri.',
                  'The latest furniture trends and decoration recommendations to beautify your home.'
                )}
              </p>
            </Link>

          </div>
        </section>
      </main>
    </div>
  );
}
