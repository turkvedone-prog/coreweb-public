import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { ArrowRight } from 'lucide-react';
import { updateSEOMeta } from '../../utils/seo';

export default function CapilonCategoryDetail() {
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

  const isYemekOdalari = slug === 'yemek-odalari';

  useEffect(() => {
    const titleText = isYemekOdalari
      ? (activeLang === 'tr' ? "Yemek Odaları" : "Dining Rooms")
      : (activeLang === 'tr' ? "Koleksiyon Detayı" : "Collection Detail");
    const descText = activeLang === 'tr'
      ? "Capilon'un özgün ve estetik yemek odası koleksiyonlarını keşfedin. Konfor ve şıklığı bir arada sunan premium yemek odası takımları."
      : "Discover Capilon's unique and aesthetic dining room collections. Premium dining room sets combining comfort and elegance.";

    updateSEOMeta({
      title: titleText,
      description: descText,
      companyName: 'Capilon Mobilya'
    });
  }, [slug, activeLang, isYemekOdalari]);

  // If the category is not yemek-odalari, show a not found or simple list
  if (!isYemekOdalari) {
    return (
      <div className="capilon-theme collections-page-wrapper">
        <section className="collections-hero-section">
          <div className="collections-container">
            <div className="collections-hero-content text-center py-20">
              <h1 className="collections-hero-title">{translate('Koleksiyon Bulunamadı', 'Collection Not Found')}</h1>
              <p className="collections-hero-subtitle">
                {translate('Aradığınız koleksiyon bulunamadı veya henüz eklenmedi.', 'The collection you are looking for was not found or has not been added yet.')}
              </p>
              <div className="mt-8">
                <Link to={getLocalizedPath('/koleksiyonlar')} className="btn-primary inline-flex items-center gap-2">
                  <ArrowRight className="rotate-180" size={16} />
                  <span>{translate('Koleksiyonlara Geri Dön', 'Back to Collections')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Hardcoded dining room products
  const products = [
    { id: 'serenity', title: 'Serenity Yemek Odası Takımı', slug: 'serenity-yemek-odasi-takimi', img: '/assets/capilon/images/Serenity Yemek Odasi-01.jpg' },
    { id: 'lizbon', title: 'Lizbon Yemek Odası Takımı', slug: 'lizbon-yemek-odasi-takimi', img: '/assets/capilon/images/lizbon_yemek_odasi.png' },
    { id: 'madrid', title: 'Madrid Yemek Odası Takımı', slug: 'madrid-yemek-odasi-takimi', img: '/assets/capilon/images/madrid_yemek_odasi.png' },
    { id: 'valentina', title: 'Valentina Yemek Odası Takımı', slug: 'valentina-yemek-odasi-takimi', img: '/assets/capilon/images/valentina_yemek_odasi.png' },
    { id: 'zirve', title: 'Zirve Yemek Odası Takımı', slug: 'zirve-yemek-odasi-takimi', img: '/assets/capilon/images/cat_armchair_warm.png' },
    { id: 'bohem', title: 'Bohem Yemek Odası Takımı', slug: 'bohem-yemek-odasi-takimi', img: '/assets/capilon/images/bohem_yemek_odasi.png' },
    { id: 'star', title: 'Star Yemek Odası Takımı', slug: 'star-yemek-odasi-takimi', img: '/assets/capilon/images/cat_armchair_warm.png' },
    { id: 'natura', title: 'Natura Yemek Odası Takımı', slug: 'natura-yemek-odasi-takimi', img: '/assets/capilon/images/cat_armchair_warm.png' },
    { id: 'dolce', title: 'Dolce Yemek Odası Takımı', slug: 'dolce-yemek-odasi-takimi', img: '/assets/capilon/images/cat_armchair_warm.png' },
    { id: 'roma', title: 'Roma Yemek Odası Takımı', slug: 'roma-yemek-odasi-takimi', img: '/assets/capilon/images/cat_armchair_warm.png' },
    { id: 'kumsal', title: 'Kumsal Yemek Odası Takımı', slug: 'kumsal-yemek-odasi-takimi', img: '/assets/capilon/images/cat_armchair_warm.png' }
  ];

  return (
    <div className="capilon-theme collections-page-wrapper">
      {/* Hero Header Section */}
      <section className="collections-hero-section">
        <div className="collections-container">
          {/* Hero Header Content */}
          <div className="collections-hero-content">
            <h1 className="collections-hero-title">{translate('Yemek Odaları', 'Dining Rooms')}</h1>
            <p className="collections-hero-subtitle">
              {translate(
                "Capilon'un tasarım ve konforu bir arada sunan, yaşam alanlarınıza sıcak ve zamansız dokunuşlar katan benzersiz yemek odası koleksiyonlarını keşfedin.",
                "Discover Capilon's unique dining room collections that offer design and comfort together, adding warm and timeless touches to your living spaces."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="collections-grid-section">
        <div className="collections-container">
          <div className="collections-page-grid dining-page-grid">
            {products.map((item) => (
              <Link 
                key={item.id} 
                to={getLocalizedPath(`/urunler/${item.slug}`)} 
                className="product-grid-card"
                id={`product-card-${item.id}`}
              >
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
                  
                  <div className="card-cta-indicator">
                    <span>{translate('Ürün Detayı', 'Product Detail')}</span>
                    <ArrowRight size={16} className="cta-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <div style={{ height: '150px', backgroundColor: 'transparent', width: '100%' }}></div>
    </div>
  );
}
