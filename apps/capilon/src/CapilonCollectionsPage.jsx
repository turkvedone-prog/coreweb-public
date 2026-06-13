import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { ArrowRight } from 'lucide-react';
import { updateSEOMeta } from '../../utils/seo';

export default function CapilonCollectionsPage() {
  const { tenantMapping, activeLang } = useSite();

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    const titleText = activeLang === 'tr' ? "Capilon Koleksiyon" : "Capilon Collection";
    const descText = activeLang === 'tr'
      ? "Capilon'un yemek odası, yatak odası, koltuk takımları ve tamamlayıcı mobilya koleksiyonlarını keşfedin. Tasarım ve konforun buluştuğu premium yaşam alanları."
      : "Discover Capilon's dining room, bedroom, sofa sets and complementary furniture collections. Premium living spaces where design meets comfort.";

    updateSEOMeta({
      title: titleText,
      description: descText,
      companyName: 'Capilon Mobilya'
    });
  }, [activeLang]);

  const collections = [
    {
      id: 'yemek-odalari',
      title: translate('YEMEK ODALARI', 'DINING ROOMS'),
      img: '/assets/capilon/images/product_dining_1779477859352.png',
      desc: translate(
        'Sıcak paylaşımlar ve estetik detaylarla harmanlanan modern yemek odası tasarımları.',
        'Modern dining room designs blended with warm gatherings and aesthetic details.'
      ),
      link: '/koleksiyonlar/yemek-odalari'
    },
    {
      id: 'yatak-odalari',
      title: translate('YATAK ODALARI', 'BEDROOMS'),
      img: '/assets/capilon/images/hero_bedroom_1779477829254.png',
      desc: translate(
        'Günün yorgunluğunu geride bırakacağınız dingin, konforlu ve şık uyku alanları.',
        'Serene, comfortable and elegant sleeping spaces to leave the day\'s fatigue behind.'
      )
    },
    {
      id: 'koltuk-takimlari',
      title: translate('KOLTUK TAKIMLARI', 'LIVING ROOM SETS'),
      img: '/assets/capilon/images/product_sofa_1779477845050.png',
      desc: translate(
        'Maksimum konforu zamansız tasarım çizgileriyle buluşturan premium oturma grupları.',
        'Premium living room sets combining maximum comfort with timeless design lines.'
      )
    },
    {
      id: 'kose-takimlari',
      title: translate('KÖŞE TAKIMLARI', 'CORNER SOFAS'),
      img: '/assets/capilon/images/cat_corner_sofa_warm.png',
      desc: translate(
        'Yaşam alanlarınıza fonksiyonellik ve genişlik katan modern köşe koltuk çözümleri.',
        'Modern corner sofa solutions adding functionality and spaciousness to your living spaces.'
      )
    },
    {
      id: 'tv-uniteleri',
      title: translate('TV ÜNİTELERİ', 'TV UNITS'),
      img: '/assets/capilon/images/cat_tv_unit_warm.png',
      desc: translate(
        'Salonunuzun düzenini ve tarzını tamamlayan estetik televizyon ünitesi modelleri.',
        'Aesthetic TV unit models that complement the layout and style of your living room.'
      )
    },
    {
      id: 'cocuk-genc-odalari',
      title: translate('ÇOCUK & GENÇ ODALARI', 'KIDS & TEEN ROOMS'),
      img: '/assets/capilon/images/cat_teen_room_warm.png',
      desc: translate(
        'Gençlerin dünyasına ilham veren, dinamik ve fonksiyonel çalışma ve yaşam alanları.',
        'Dynamic and functional study and living spaces that inspire the world of youth.'
      )
    },
    {
      id: 'tekil-urunler',
      title: translate('TEKİL ÜRÜNLER', 'SINGLE PRODUCTS'),
      img: '/assets/capilon/images/cat_armchair_warm.png',
      desc: translate(
        'Tek başlarına bile mekanın havasını değiştirebilen berjerler, dresuarlar ve sandalyeler.',
        'Armchairs, console tables and chairs that can change the atmosphere of the space on their own.'
      )
    },
    {
      id: 'yatak-baza',
      title: translate('YATAK & BAZA', 'MATTRESSES & BASES'),
      img: '/assets/capilon/images/capilon_comfort_series_1779567476232.png',
      desc: translate(
        'Gelişmiş uyku teknolojileriyle üretilmiş, vücut yapınızı destekleyen yatak ve bazalar.',
        'Mattresses and bases supporting your body structure, crafted with advanced sleep technologies.'
      )
    },
    {
      id: 'tamamlayici-urunler',
      title: translate('TAMAMLAYICI ÜRÜNLER', 'COMPLEMENTARY PRODUCTS'),
      img: '/assets/capilon/images/premium_craftsmanship_1779572256681.png',
      desc: translate(
        'Dekorasyonunuza son dokunuşu yapacak sehpalar, aydınlatmalar ve aksesuarlar.',
        'Coffee tables, lighting and accessories to make the final touch to your decoration.'
      )
    }
  ];

  return (
    <div className="capilon-theme collections-page-wrapper">
      {/* Hero Header Section */}
      <section className="collections-hero-section">
        <div className="collections-container">

          {/* Hero Header Content */}
          <div className="collections-hero-content">
            <h1 className="collections-hero-title">
              {translate('Capilon Koleksiyon', 'Capilon Collection')}
            </h1>
            <p className="collections-hero-subtitle">
              {translate(
                "Capilon’un tasarım ve konforu bir arada sunan, yaşam alanlarınıza sıcak ve zamansız dokunuşlar katan benzersiz mobilya dünyasını keşfedin.",
                "Discover Capilon's unique furniture world that offers design and comfort together, adding warm and timeless touches to your living spaces."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="collections-grid-section">
        <div className="collections-container">
          <div className="collections-page-grid">
            {collections.map((item) => {
              const CardContent = (
                <>
                  {/* Image Container */}
                  <div className="card-image-wrapper">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="card-image"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="card-details">
                    <h2 className="card-title">{item.title}</h2>
                    <p className="card-desc">{item.desc}</p>
                    
                    {/* Presentation CTA Indicator */}
                    <div className="card-cta-indicator">
                      <span>{translate('Koleksiyonu İncele', 'View Collection')}</span>
                      <ArrowRight size={16} className="cta-arrow" />
                    </div>
                  </div>
                </>
              );

              if (item.link) {
                return (
                  <Link 
                    key={item.id} 
                    to={getLocalizedPath(item.link)}
                    className="collections-page-card"
                    id={`collection-card-${item.id}`}
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div 
                  key={item.id} 
                  className="collections-page-card"
                  id={`collection-card-${item.id}`}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Brand/Consultancy Banner */}
      <section className="collections-consultation-banner">
        <div className="collections-container">
          <div className="consultation-card">
            <div className="consultation-content">
              <span className="consultation-badge">
                {translate('MİMARİ DANIŞMANLIK', 'INTERIOR CONSULTANCY')}
              </span>
              <h2 className="consultation-title">
                {translate(
                  'Evinizi Birlikte Tasarlayalım',
                  'Let\'s Design Your Home Together'
                )}
              </h2>
              <p className="consultation-text">
                {translate(
                  'Alanında uzman iç mimarlarımız ve tasarım ekibimizle, hayalinizdeki yaşam alanlarını Capilon şıklığı ile buluşturuyoruz. Ücretsiz tasarım danışmanlığı için bize ulaşın.',
                  'With our expert interior architects and design team, we bring your dream living spaces together with Capilon elegance. Contact us for free design consultancy.'
                )}
              </p>
            </div>
            <div className="consultation-action">
              <Link 
                to={getLocalizedPath('/iletisim')} 
                className="consultation-btn"
                id="collections-consultation-cta"
              >
                <span>{translate('Tasarım Danışmanlığı Alın', 'Get Design Consultation')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <div style={{ height: '150px', backgroundColor: 'transparent', width: '100%' }}></div>
    </div>
  );
}
