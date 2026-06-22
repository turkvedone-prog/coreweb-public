import { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import BurobigEcoBanner from './BurobigEcoBanner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { getActiveProducts } from '../../services/publicContentService';
import { getLocalizedContent } from '../../utils/i18nContent';
import { resolveField } from '@coreweb/shared-ui';

export default function BurobigProductDetail({ product }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;

  const productTitle = resolveField(product, activeLang, 'title') || resolveField(product, activeLang, 'name') || '';
  const productSummary = resolveField(product, activeLang, 'summary') || '';
  const productDescription = resolveField(product, activeLang, 'description') || resolveField(product, activeLang, 'content') || '';
  const technicalDetails = resolveField(product, activeLang, 'technicalDetails') || product?.technicalDetails || '';
  const usageAreas = resolveField(product, activeLang, 'usageAreas') || product?.usageAreas || '';

  const FALLBACK_IMAGE = '/assets/burobig/images/INKA 01.jpg';

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [activeDetailImage, setActiveDetailImage] = useState(product?.coverImageUrl || FALLBACK_IMAGE);
  const [activeDetailIdx, setActiveDetailIdx] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const detailImgRef = useRef(null);

  // Storing information from previous renders to adjust state on product change without useEffect
  const [prevProduct, setPrevProduct] = useState(product);
  if (product && prevProduct && product.slug !== prevProduct.slug) {
    setPrevProduct(product);
    setActiveDetailImage(product.coverImageUrl || FALLBACK_IMAGE);
    setActiveDetailIdx(0);
    setActiveHeroIdx(0);
    setThumbStartIndex(0);
  }

  // Fetch related products
  useEffect(() => {
    if (!tenantId || !product?.slug) return;
    getActiveProducts(tenantId)
      .then(raw => {
        const localized = raw
          .map(doc => getLocalizedContent(doc, activeLang))
          .filter(Boolean);
        setRelatedProducts(localized.filter(p => p.slug !== product.slug));
      })
      .catch(e => console.error(e));
  }, [tenantId, product?.slug, activeLang]);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  // Determine Hero image slider list — tüm ürünler Firebase gallery kullanır
  const heroImages = useMemo(() => {
    const galleryImages = (product?.gallery || [])
      .map(img => img?.url)
      .filter(Boolean);
    return galleryImages.length > 0 
      ? galleryImages 
      : [product?.coverImageUrl || FALLBACK_IMAGE];
  }, [product]);

  const detailGallery = useMemo(() => {
    if (!product) return [];
    const images = [];
    if (product.coverImageUrl) images.push(product.coverImageUrl);
    (product.gallery || []).forEach(img => {
      if (img?.url) images.push(img.url);
    });
    const uniqueImages = Array.from(new Set(images)).filter(Boolean);
    return uniqueImages.length > 0 ? uniqueImages : [FALLBACK_IMAGE];
  }, [product]);

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

  // Auto-adjust thumbnail sliding window when active index changes (e.g. via auto-cycle or clicks)
  useEffect(() => {
    if (activeDetailIdx < thumbStartIndex) {
      setThumbStartIndex(activeDetailIdx);
    } else if (activeDetailIdx >= thumbStartIndex + 5) {
      setThumbStartIndex(activeDetailIdx - 4);
    }
  }, [activeDetailIdx, thumbStartIndex]);

  // Early return for missing product placed AFTER all hooks
  if (!product) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>
          {translate('Ürün Bulunamadı', 'Product Not Found')}
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          {translate('Aradığınız ürün sistemde bulunmamaktadır veya kaldırılmış olabilir.', 'The product you are looking for does not exist or may have been removed.')}
        </p>
        <Link to={getLocalizedPath('/urunler')} className="btn-primary-dark" style={{ display: 'inline-block' }}>
          {translate('Tüm Ürünlere Dön', 'Back to All Products')}
        </Link>
      </div>
    );
  }

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
              alt={`${productTitle} Showcase ${index + 1}`}
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
                alt={`${productTitle} Detay`}
                className="detail-gallery__main-img"
                style={{ transition: 'opacity 0.15s ease-in-out' }}
              />
            </div>
            {/* Thumbnails */}
            {detailGallery.length > 1 && (
              <div className="detail-gallery__thumbs-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                {detailGallery.length > 5 && (
                  <button 
                    onClick={() => setThumbStartIndex(prev => Math.max(0, prev - 1))}
                    disabled={thumbStartIndex === 0}
                    className="detail-gallery__nav-btn"
                    aria-label="Önceki görseller"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                
                <div className="detail-gallery__thumbs" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'nowrap', overflow: 'hidden', padding: '4px 2px' }}>
                  {detailGallery.slice(thumbStartIndex, thumbStartIndex + 5).map((src, sliceIdx) => {
                    const idx = thumbStartIndex + sliceIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleDetailImageChange(src, idx)}
                        className={`detail-gallery__thumb ${idx === activeDetailIdx ? 'active' : ''}`}
                        aria-label={`Görsel ${idx + 1}`}
                      >
                        <img src={src} alt={`Küçük Görsel ${idx + 1}`} />
                      </button>
                    );
                  })}
                </div>

                {detailGallery.length > 5 && (
                  <button 
                    onClick={() => setThumbStartIndex(prev => Math.min(detailGallery.length - 5, prev + 1))}
                    disabled={thumbStartIndex + 5 >= detailGallery.length}
                    className="detail-gallery__nav-btn"
                    aria-label="Sonraki görseller"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Description & Action Column */}
          <div className="detail-showcase__content">
            <h2 className="detail-showcase__title">{productTitle}</h2>
            <span className="detail-showcase__subtitle">
              {(product.subcategory || product.category)?.toUpperCase()}
            </span>
            <div className="detail-showcase__desc">
              {productDescription ? (
                productDescription.startsWith('<') ? (
                  <div dangerouslySetInnerHTML={{ __html: productDescription }} className="space-y-4" />
                ) : (
                  <div className="whitespace-pre-line">{productDescription}</div>
                )
              ) : (
                productSummary
              )}
            </div>
            <div className="detail-showcase__actions">
              <a
                href={`mailto:info@burobig.com?subject=Fiyat Teklifi: ${productTitle}`}
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
                    <span>{productTitle} 2D Cad Data</span>
                    <a href={product.catalogFileUrl || '#'} download>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span>{productTitle} 3D Max</span>
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
                {technicalDetails ? (
                  <div className="specs-placeholder" style={{ marginBottom: '2rem' }}>
                    <p style={{ fontWeight: 300, lineHeight: 1.8, color: '#1a1a1a', whiteSpace: 'pre-line' }}>
                      {technicalDetails}
                    </p>
                  </div>
                ) : null}
                <ul className="doc-list">
                  {usageAreas && (
                    <li>
                      <span style={{ fontWeight: 400 }}>{translate('Kullanım Alanları', 'Usage Areas')}:</span>
                      <span style={{ color: '#666' }}>{usageAreas}</span>
                    </li>
                  )}
                  <li>
                    <span>{productTitle} {translate('Teknik Ölçüler (PDF)', 'Technical Dimensions (PDF)')}</span>
                    <a href={product.catalogFileUrl || '#'} download>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span>{productTitle} {translate('Montaj Kılavuzu', 'Assembly Manual')}</span>
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
                      <img src={item.coverImageUrl || FALLBACK_IMAGE} alt={item.title || ''} />
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
