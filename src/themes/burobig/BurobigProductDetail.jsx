import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import BurobigEcoBanner from './BurobigEcoBanner';

import { getActiveProducts } from '../../services/publicContentService';
import { getLocalizedContent } from '../../utils/i18nContent';

export default function BurobigProductDetail({ product }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [activeDetailImage, setActiveDetailImage] = useState(product.coverImageUrl || '');
  const [activeDetailIdx, setActiveDetailIdx] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null); // 'docs', 'materials', 'specs'
  const detailImgRef = useRef(null);

  // Storing information from previous renders to adjust state on product change without useEffect
  const [prevProduct, setPrevProduct] = useState(product);
  if (product.slug !== prevProduct.slug) {
    setPrevProduct(product);
    setActiveDetailImage(product.coverImageUrl || '');
    setActiveDetailIdx(0);
    setActiveHeroIdx(0);
  }

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  // Determine Hero image slider list
  const heroImages = useMemo(() => {
    return product.slug === 'inka'
      ? ['/assets/burobig/images/Deneme 001-1.webp', '/assets/burobig/images/Deneme 002-1.webp']
      : (product.gallery && product.gallery.length > 0 
         ? product.gallery.map(img => img.url)
         : [product.coverImageUrl || '']);
  }, [product]);

  // Determine Detail gallery thumbnails (cover image + gallery images)
  const detailGallery = product.gallery && product.gallery.length > 0
    ? Array.from(new Set([product.coverImageUrl, ...product.gallery.map(img => img.url)])).filter(Boolean)
    : [product.coverImageUrl].filter(Boolean);

  // Fetch Related Products
  useEffect(() => {
    if (!tenantId) return;
    const fetchRelated = async () => {
      try {
        const raw = await getActiveProducts(tenantId);
        const localized = raw
          .map(doc => getLocalizedContent(doc, activeLang))
          .filter(Boolean)
          .filter(item => item.slug !== product.slug); // Exclude current product
        setRelatedProducts(localized);
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };
    fetchRelated();
  }, [tenantId, product.slug, activeLang]);

  // Handle Detail image thumbnail click with fade transition
  const handleDetailImageChange = (src, idx) => {
    const mainImg = detailImgRef.current;
    if (mainImg) {
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        setActiveDetailImage(src);
        setActiveDetailIdx(idx);
        mainImg.style.opacity = '1';
      }, 150);
    } else {
      setActiveDetailImage(src);
      setActiveDetailIdx(idx);
    }
  };

  // Auto-cycle Hero slider (every 8 seconds)
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveHeroIdx(prev => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages]);

  // Auto-cycle Detail gallery thumbnails (every 8 seconds)
  useEffect(() => {
    if (detailGallery.length <= 1) return;
    const interval = setInterval(() => {
      const nextIdx = (activeDetailIdx + 1) % detailGallery.length;
      handleDetailImageChange(detailGallery[nextIdx], nextIdx);
    }, 8000);
    return () => clearInterval(interval);
  }, [detailGallery, activeDetailIdx]);

  // Toggle Accordion section
  const toggleAccordion = (section) => {
    setOpenAccordion(prev => (prev === section ? null : section));
  };

  // Swatches data
  const woodSwatches = [
    { name: 'ZA 10.50', color: '#C7A15C' },
    { name: 'ZA İsli Meşe', color: '#4A3B32' },
    { name: 'ZA 12.19', color: '#8B6043' }
  ];

  const metalSwatches = [
    { name: 'ZM YD65 Soft Green', color: '#799867' },
    { name: 'ZM 3012 Ongoing', color: '#C1775A' },
    { name: 'ZM G905 Kum Taşı', color: '#B0AA96' },
    { name: 'ZM 7038 Açık Gri', color: '#9AA39C' },
    { name: 'ZM G903 Kül Gri', color: '#8E9391' },
    { name: 'ZM HGPE Koyu Gri', color: '#3D4040' },
    { name: 'ZM C925 Terracotta', color: '#8B4228' },
    { name: 'ZM TX9005 Siyah', color: '#1A1A1A' },
    { name: 'ZM TX9010 Beyaz', color: '#EBEBEB' }
  ];

  const melaminSwatches = [
    { name: 'ZS Cadiz', color: '#BC986A' },
    { name: 'ZS Paradise', color: '#DFDACB' },
    { name: 'ZS Legnano', color: '#B88A44' },
    { name: 'ZS Armada', color: '#755943' },
    { name: 'ZS Korfu', color: '#4E4237' },
    { name: 'ZS Koyu Gri', color: '#393A3A' },
    { name: 'ZS Beyaz', color: '#F4F4F4' },
    { name: 'ZS Kum Taşı', color: '#BFB8A5' },
    { name: 'ZS Kül Gri', color: '#929694' }
  ];

  return (
    <main className="product-page">
      {/* Product Hero Premium (Full-Bleed Showcase) */}
      <section className="product-hero-premium">
        <div className="product-premium-gallery">
          {heroImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`${product.title} Showcase ${index + 1}`}
              className={`hero-premium-img ${index === activeHeroIdx ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="product-hero-premium__container">
          <div className="product-hero-designer">
            {translate('Tasarım A. Baki Çelik', 'Design by A. Baki Çelik')}
          </div>
        </div>
      </section>

      {/* Product Detail Showcase Section */}
      <section className="product-detail-showcase">
        <div className="product-detail-showcase__container">
          {/* Gallery Column */}
          <div className="detail-gallery">
            <div className="detail-gallery__main-wrapper">
              <img
                ref={detailImgRef}
                src={activeDetailImage}
                alt={`${product.title} Detay`}
                className="detail-gallery__main-img"
                style={{ transition: 'opacity 0.15s ease-in-out' }}
              />
            </div>
            {/* Thumbnails */}
            {detailGallery.length > 1 && (
              <div className="detail-gallery__thumbs">
                {detailGallery.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDetailImageChange(src, idx)}
                    className={`detail-gallery__thumb ${idx === activeDetailIdx ? 'active' : ''}`}
                    aria-label={`Görsel ${idx + 1}`}
                  >
                    <img src={src} alt={`Küçük Görsel ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description & Action Column */}
          <div className="detail-showcase__content">
            <h2 className="detail-showcase__title">{product.title}</h2>
            <span className="detail-showcase__subtitle">
              {product.category?.toUpperCase()}
            </span>
            <div className="detail-showcase__desc">
              {product.content ? (
                product.content.startsWith('<') ? (
                  <div dangerouslySetInnerHTML={{ __html: product.content }} className="space-y-4" />
                ) : (
                  <div className="whitespace-pre-line">{product.content}</div>
                )
              ) : (
                product.summary
              )}
            </div>
            <div className="detail-showcase__actions">
              <a
                href={`mailto:info@burobig.com?subject=Fiyat Teklifi: ${product.title}`}
                className="btn-primary-dark"
              >
                {translate('Fiyat Teklifi Al', 'Get a Quote')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BEYAZ ZEMİNLİ ALT BÖLGE */}
      <div className="white-bottom-area">
        {/* Product Details Menu (Accordion) */}
        <section className="product-details-menu">
          <div className="menu-list accordion">
            
            {/* 1. Dijital Mimari Veriler */}
            <div className="accordion-item">
              <button
                className={`menu-item accordion-header ${openAccordion === 'docs' ? 'active' : ''}`}
                onClick={() => toggleAccordion('docs')}
              >
                {translate('Dijital Mimari Veriler', 'Digital Architectural Data')}
                <div className="acc-toggle-icon"></div>
              </button>
              <div className={`accordion-content ${openAccordion === 'docs' ? 'active' : ''}`}>
                <ul className="doc-list">
                  <li>
                    <span>{product.title} 2D Cad Data</span>
                    <a href={product.catalogFileUrl || '#'} download>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span>{product.title} 3D Max</span>
                    <a href={product.catalogFileUrl || '#'} download>
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

            {/* 2. Yüzey & Materyal Koleksiyonu */}
            <div className="accordion-item">
              <button
                className={`menu-item accordion-header ${openAccordion === 'materials' ? 'active' : ''}`}
                onClick={() => toggleAccordion('materials')}
              >
                {translate('Yüzey & Materyal Koleksiyonu', 'Surface & Material Collection')}
                <div className="acc-toggle-icon"></div>
              </button>
              <div className={`accordion-content ${openAccordion === 'materials' ? 'active' : ''}`}>
                {/* Ahşap */}
                <div className="material-group">
                  <h4>{translate('Ahşap Serisi', 'Wood Series')}</h4>
                  <div className="swatch-grid">
                    {woodSwatches.map((sw, sIdx) => (
                      <div key={sIdx} className="swatch-item">
                        <div className="swatch-color" style={{ background: sw.color }}></div>
                        <span>{sw.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Metal */}
                <div className="material-group">
                  <h4>{translate('Metal Serisi', 'Metal Series')}</h4>
                  <div className="swatch-grid">
                    {metalSwatches.map((sw, sIdx) => (
                      <div key={sIdx} className="swatch-item">
                        <div className="swatch-color" style={{ background: sw.color }}></div>
                        <span>{sw.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Melamin */}
                <div className="material-group">
                  <h4>{translate('Melamin Serisi', 'Melamine Series')}</h4>
                  <div className="swatch-grid">
                    {melaminSwatches.map((sw, sIdx) => (
                      <div key={sIdx} className="swatch-item">
                        <div className="swatch-color" style={{ background: sw.color }}></div>
                        <span>{sw.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Teknik Spesifikasyonlar */}
            <div className="accordion-item">
              <button
                className={`menu-item accordion-header ${openAccordion === 'specs' ? 'active' : ''}`}
                onClick={() => toggleAccordion('specs')}
              >
                {translate('Teknik Spesifikasyonlar', 'Technical Specifications')}
                <div className="acc-toggle-icon"></div>
              </button>
              <div className={`accordion-content ${openAccordion === 'specs' ? 'active' : ''}`}>
                {product.technicalDetails ? (
                  <div className="specs-placeholder" style={{ marginBottom: '2rem' }}>
                    <p style={{ fontWeight: 300, lineHeight: 1.8, color: '#1a1a1a', whiteSpace: 'pre-line' }}>
                      {product.technicalDetails}
                    </p>
                  </div>
                ) : null}
                <ul className="doc-list">
                  <li>
                    <span>{product.title} {translate('Teknik Ölçüler (PDF)', 'Technical Dimensions (PDF)')}</span>
                    <a href={product.catalogFileUrl || '#'} download>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span>{product.title} {translate('Montaj Kılavuzu', 'Assembly Manual')}</span>
                    <a href={product.catalogFileUrl || '#'} download>
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

          </div>
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="related-products-carousel">
            <h3 className="related-carousel-title">{translate('İlgili Ürünler', 'Related Products')}</h3>
            <div className="related-carousel-wrapper">
              <div className="related-carousel-track">
                {/* Original set + duplicated set for seamless infinite loop */}
                {[...relatedProducts, ...relatedProducts].map((item, idx) => {
                  const itemSlug = item.slug || item.id;
                  const itemPath = getLocalizedPath(`/urunler/${itemSlug}`);

                  return (
                    <Link key={`${item.id}-${idx}`} to={itemPath} className="carousel-item">
                      <span className="carousel-item-title">{item.title}</span>
                      <img src={item.coverImageUrl} alt={item.title} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      <BurobigEcoBanner />
    </main>
  );
}
