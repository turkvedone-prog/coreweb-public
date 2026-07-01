import { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import BurobigEcoBanner from './BurobigEcoBanner';


import { getActiveProducts } from '../../services/publicContentService';
import { getLocalizedContent } from '../../utils/i18nContent';
import { resolveField, submitLead, loadRecaptchaScript, executeRecaptcha } from '@coreweb/shared-ui';

const getSubcategoryColor = (subcategory, category) => {
  const name = (subcategory || category || '').toLowerCase().trim();
  
  // Masalar
  if (name.includes('üst yönetici') || name.includes('ust-yonetici') || name.includes('ust yönetici') || name.includes('ust_yonetici')) return '#f2ece4'; // Soft premium ivory beige
  if (name.includes('yönetici masaları') || name.includes('yonetici-masalari') || name.includes('yönetici-masaları')) return '#e5dfd9'; // Soft clay taupe
  if (name.includes('çalışma masaları') || name.includes('calisma-masalari') || name.includes('çalışma-masaları')) return '#dae1e0'; // Soft sage teal mist
  if (name.includes('operasyonel') || name.includes('operasyonel-masalar')) return '#e2e4e1'; // Soft ash gray
  if (name.includes('toplantı') || name.includes('toplanti')) return '#dee0d9'; // Soft olive gray/sage
  
  // Ofis Koltukları
  if (name.includes('yönetici koltukları') || name.includes('yonetici-koltuklari') || name.includes('yönetici-koltukaları') || name.includes('yönetici-koltukları')) return '#ebdcd5'; // Soft deep taupe
  if (name.includes('çalışma koltukları') || name.includes('calisma-koltuklari') || name.includes('çalışma-koltukları')) return '#dbe1e1'; // Soft mist gray
  if (name.includes('misafir') || name.includes('bekleme koltuk') || name.includes('bekleme-koltuk')) return '#eddcd2'; // Soft peach beige
  
  // Koltuklar / Kanepeler
  if (name.includes('koltuklar') && !name.includes('ofis') && !name.includes('yönetici') && !name.includes('çalışma')) return '#ebdcd9'; // Soft powder rose
  if (name.includes('kanepeler')) return '#e6dfd9'; // Soft warm plaster
  if (name.includes('sandalyeler')) return '#dfdfd9'; // Soft slate beige
  if (name.includes('bekleme alanları') || name.includes('bekleme-alanlari') || name.includes('bekleme-alanları')) return '#eddcd2'; // Soft desert sand
  
  // Depolama Sistemleri
  if (name.includes('kesonlar')) return '#dae2e0'; // Soft teal gray
  if (name.includes('dolaplar')) return '#eeded1'; // Soft almond
  if (name.includes('kitaplık') || name.includes('kitaplik') || name.includes('raf')) return '#dae1e6'; // Soft mist blue
  
  // Tamamlayıcılar
  if (name.includes('sehpalar')) return '#e9dfd8'; // Soft dry clay
  if (name.includes('puflar')) return '#dfdae3'; // Soft lilac gray
  if (name.includes('askılıklar') || name.includes('askiliklar')) return '#eaeae5'; // Soft bone white
  if (name.includes('elektrifikasyon')) return '#e5e8e8'; // Soft cool silver

  return '#f3f1ec'; // Default fallback zemin color
};

export default function BurobigProductDetail({ product }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdUHg0tAAAAADUPLdrFQSEnyjWs6DbHXtjnROuK';

  useEffect(() => {
    loadRecaptchaScript(siteKey);
  }, [siteKey]);

  const productTitle = resolveField(product, activeLang, 'title') || resolveField(product, activeLang, 'name') || '';
  const productSummary = resolveField(product, activeLang, 'summary') || '';
  const productDescription = resolveField(product, activeLang, 'description') || resolveField(product, activeLang, 'content') || '';
  const technicalDetails = resolveField(product, activeLang, 'technicalDetails') || product?.technicalDetails || '';
  const usageAreas = resolveField(product, activeLang, 'usageAreas') || product?.usageAreas || '';
  const productSlug = resolveField(product, activeLang, 'slug') || product?.slug || product?.id;

  const getCategoryPath = (cat, subcat, titleStr, slugStr) => {
    const c = (cat || '').toLocaleLowerCase('tr-TR').trim();
    const s = (subcat || '').toLocaleLowerCase('tr-TR').trim();
    const t = (titleStr || '').toLocaleLowerCase('tr-TR').trim();
    const sl = (slugStr || '').toLocaleLowerCase('tr-TR').trim();

    // 1. Ofis Koltukları (subcategories first to avoid greediness)
    if (c.includes('ofis') || c.includes('office') || s.includes('ofis-kolt') || s.includes('office-chair')) {
      if (s.includes('üst yönetici') || s.includes('ust yonetici') || s.includes('executive')) {
        return '/yonetici-koltuklari'; 
      }
      if (s.includes('yönetici') || s.includes('yonetici') || s.includes('manager')) {
        return '/yonetici-koltuklari';
      }
      if (s.includes('çalışma') || s.includes('calisma') || s.includes('task') || s.includes('work')) {
        return '/calisma-koltuklari';
      }
      if (s.includes('misafir') || s.includes('bekleme') || s.includes('guest') || s.includes('wait')) {
        return '/misafir-ve-bekleme-koltuklari';
      }
      return '/ofis-koltuklari';
    }

    // 2. Masalar (subcategories first)
    if (c.includes('masa') || c.includes('table') || c.includes('desk') || t.includes('masa') || sl.includes('masa')) {
      if (s.includes('üst yönetici') || s.includes('ust yonetici') || s.includes('executive')) {
        return '/ust-yonetici-masalari';
      }
      if (s.includes('yönetici') || s.includes('yonetici') || s.includes('manager')) {
        return '/yonetici-masalari';
      }
      if (s.includes('çalışma') || s.includes('calisma') || s.includes('work')) {
        return '/calisma-masalari';
      }
      if (s.includes('operasyonel') || s.includes('operational')) {
        return '/operasyonel-masalar';
      }
      if (s.includes('toplantı') || s.includes('toplanti') || s.includes('meeting')) {
        return '/toplanti-masalari';
      }
      return '/urunler';
    }

    // 3. Koltuklar / Kanepeler
    if (c.includes('kanepe') || c.includes('kanap') || c.includes('sofa') || c.includes('koltuk') || c.includes('armchair') || t.includes('kanepe') || t.includes('kanap') || t.includes('sofa') || sl.includes('kanepe') || sl.includes('kanap') || sl.includes('sofa')) {
      // Kanepeler Check
      if (s.includes('kanepe') || s.includes('kanap') || s.includes('sofa') || (!s.includes('koltuk') && !s.includes('armchair') && (c === 'kanepeler' || c === 'kanapeler' || c === 'kanepe' || c === 'kanap' || t.includes('kanepe') || t.includes('kanap') || t.includes('sofa') || sl.includes('kanepe') || sl.includes('kanap') || sl.includes('sofa')))) {
        return '/kanepeler';
      }
      if (s.includes('sandalye') || s.includes('chair')) {
        return '/sandalyeler';
      }
      if (s.includes('bekleme') || s.includes('waiting')) {
        return '/bekleme-alanlari';
      }
      if (s.includes('koltuk') || s.includes('armchair') || c.includes('koltuk') || c.includes('armchair')) {
        return '/koltuklar';
      }
      return '/koltuklar-kanepeler';
    }

    // 4. Depolama Sistemleri
    if (c.includes('depolama') || c.includes('storage')) {
      if (s.includes('keson') || s.includes('pedestal')) {
        return '/kesonlar';
      }
      if (s.includes('dolap') || s.includes('cabinet')) {
        return '/dolaplar';
      }
      if (s.includes('kitap') || s.includes('raf') || s.includes('bookcase') || s.includes('shel')) {
        return '/kitaplik-ve-raf-sistemleri';
      }
      return '/depolama-sistemleri';
    }

    // 5. Tamamlayıcılar
    if (c.includes('tamamlayıcı') || c.includes('tamamlayici') || c.includes('accessori')) {
      if (s.includes('sehpa') || s.includes('table')) {
        return '/sehpalar';
      }
      if (s.includes('puf') || s.includes('pouf')) {
        return '/puflar';
      }
      if (s.includes('askılık') || s.includes('askilik') || s.includes('coat') || s.includes('hanger')) {
        return '/askiliklar';
      }
      if (s.includes('elektrifikasyon') || s.includes('electrifi')) {
        return '/elektrifikasyon';
      }
      return '/tamamlayicilar';
    }

    return '/urunler';
  };

  const categoryPath = getCategoryPath(product?.category, product?.subcategory, productTitle, productSlug);

  const FALLBACK_IMAGE = '/assets/burobig/images/INKA 01.jpg';

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeDetailImage, setActiveDetailImage] = useState(product?.coverImageUrl || FALLBACK_IMAGE);
  const [activeDetailIdx, setActiveDetailIdx] = useState(0);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const detailImgRef = useRef(null);
  const [isInitial, setIsInitial] = useState(true);

  // Proposal modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedExtraProducts, setSelectedExtraProducts] = useState([]);
  const [proposalData, setProposalData] = useState({
    name: '', email: '', phone: '', message: '', website_dummy: ''
  });
  const [proposalConsent, setProposalConsent] = useState(false);
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [proposalError, setProposalError] = useState(null);

  // Storing information from previous renders to adjust state on product change without useEffect
  const [prevProduct, setPrevProduct] = useState(product);
  const prevSlug = resolveField(prevProduct, activeLang, 'slug') || prevProduct?.slug || prevProduct?.id;
  if (product && prevProduct && productSlug !== prevSlug) {
    setPrevProduct(product);
    setActiveDetailImage(product.coverImageUrl || FALLBACK_IMAGE);
    setActiveDetailIdx(0);
    setThumbStartIndex(0);
    // Reset modal states
    setIsModalOpen(false);
    setProposalSuccess(false);
    setProposalError(null);
    setProposalConsent(false);
    setProposalData({ name: '', email: '', phone: '', message: '', website_dummy: '' });
    setSelectedExtraProducts([]);
  }

  useEffect(() => {
    setThumbStartIndex(activeDetailIdx);
  }, [activeDetailIdx]);

  useEffect(() => {
    setIsInitial(true);
    const timer = setTimeout(() => setIsInitial(false), 200);
    return () => clearTimeout(timer);
  }, [productSlug]);

  // Helper to slugify strings for robust matching
  const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[ğĞ]/g, 'g')
      .replace(/[üÜ]/g, 'u')
      .replace(/[şŞ]/g, 's')
      .replace(/[ıİ]/g, 'i')
      .replace(/[öÖ]/g, 'o')
      .replace(/[çÇ]/g, 'c')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  };

  // Fetch related products
  useEffect(() => {
    if (!tenantId || !productSlug) return;
    getActiveProducts(tenantId)
      .then(raw => {
        const localized = raw
          .map(doc => getLocalizedContent(doc, activeLang))
          .filter(Boolean);

        // Filter out current product
        const otherProducts = localized.filter(p => (p.slug || p.id) !== productSlug);

        const currentCatSlug = slugify(product?.category);
        const currentSubcatSlug = slugify(product?.subcategory);

        // 1. Match subcategory first
        let filtered = otherProducts.filter(p => slugify(p.subcategory) === currentSubcatSlug);

        // 2. If we need more (less than 6), add same category products
        if (filtered.length < 6 && currentCatSlug) {
          const sameCategory = otherProducts.filter(p => 
            slugify(p.category) === currentCatSlug && 
            !filtered.some(f => (f.slug || f.id) === (p.slug || p.id))
          );
          filtered = [...filtered, ...sameCategory];
        }

        // 3. If we still need more (less than 6), add any other products
        if (filtered.length < 6) {
          const rest = otherProducts.filter(p => 
            !filtered.some(f => (f.slug || f.id) === (p.slug || p.id))
          );
          filtered = [...filtered, ...rest];
        }

        setRelatedProducts(filtered.slice(0, 10));
        setAllProducts(localized);
      })
      .catch(e => console.error(e));
  }, [tenantId, productSlug, activeLang, product?.category, product?.subcategory]);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

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

  const handleProposalChange = (e) => {
    setProposalData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddExtraProduct = (e) => {
    const selectedSlug = e.target.value;
    if (!selectedSlug) return;
    const found = allProducts.find(p => (p.slug || p.id) === selectedSlug);
    if (found && !selectedExtraProducts.some(p => (p.slug || p.id) === selectedSlug)) {
      setSelectedExtraProducts(prev => [...prev, found]);
    }
    e.target.value = ''; // reset dropdown
  };

  const handleRemoveExtraProduct = (slug) => {
    setSelectedExtraProducts(prev => prev.filter(p => (p.slug || p.id) !== slug));
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    setProposalLoading(true);
    setProposalError(null);

    // Honeypot check
    if (proposalData.website_dummy) {
      setTimeout(() => {
        setProposalSuccess(true);
        setProposalLoading(false);
      }, 400);
      return;
    }

    if (!proposalData.name || !proposalData.name.trim()) {
      setProposalError(translate('Lütfen adınızı ve soyadınızı girin.', 'Please enter your name.'));
      setProposalLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!proposalData.email || !emailRegex.test(proposalData.email)) {
      setProposalError(translate('Lütfen geçerli bir e-posta adresi girin.', 'Please enter a valid email address.'));
      setProposalLoading(false);
      return;
    }
    const phoneDigits = proposalData.phone ? proposalData.phone.replace(/\D/g, '') : '';
    if (!proposalData.phone || phoneDigits.length < 10) {
      setProposalError(translate('Lütfen en az 10 haneli geçerli bir telefon numarası girin.', 'Please enter a valid phone number with at least 10 digits.'));
      setProposalLoading(false);
      return;
    }
    if (!proposalData.message || !proposalData.message.trim()) {
      setProposalError(translate('Lütfen mesajınızı girin.', 'Please enter your message.'));
      setProposalLoading(false);
      return;
    }
    if (!proposalConsent) {
      setProposalError(translate('Lütfen KVKK onay metnini kabul edin.', 'Please accept the KVKK consent.'));
      setProposalLoading(false);
      return;
    }

    try {
      let recaptchaToken = '';
      if (window.grecaptcha && window.grecaptcha.enterprise) {
        recaptchaToken = await window.grecaptcha.enterprise.execute(siteKey, { action: 'submitLead' });
      } else {
        try {
          recaptchaToken = await executeRecaptcha(siteKey, 'submitLead');
        } catch (err) {
          // Silent fallback
        }
      }

      const payload = {
        tenantId: 'burobig',
        tenantSlug: 'burobig',
        source: 'burobig-website',
        type: 'proposal',
        formType: 'proposal',
        name: proposalData.name,
        email: proposalData.email,
        phone: proposalData.phone,
        message: proposalData.message,
        consentAccepted: proposalConsent,
        website_dummy: proposalData.website_dummy,
        pageUrl: window.location.href,
        createdAt: new Date().toISOString(),
        status: 'new',
        recaptchaToken,
        extraData: {
          "Ürün Adı": productTitle,
          "Ürün Linki": window.location.href,
          "Ek Ürünler": selectedExtraProducts.map(p => p.title || p.id).join(', ') || translate('Yok', 'None')
        }
      };

      await submitLead(payload);
      setProposalSuccess(true);
    } catch (err) {
      setProposalError(err.message || translate(
        'Bir hata oluştu, lütfen tekrar deneyin.',
        'An error occurred, please try again.'
      ));
    } finally {
      setProposalLoading(false);
    }
  };

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

  const productSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productTitle,
      "image": product?.coverImageUrl ? `https://www.burobig.com.tr${product.coverImageUrl}` : undefined,
      "description": productSummary || productDescription.replace(/<[^>]*>/g, '').substring(0, 160),
      "category": product?.category,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "0",
        "offerCount": "1",
        "availability": "https://schema.org/InStock"
      }
    };
  }, [productTitle, product, productSummary, productDescription]);

  const resolvedBgColor = product.customPageSettings?.backgroundColor || getSubcategoryColor(product.subcategory, product.category);

  return (
    <main className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section 
        className="product-hero-premium"
        style={{ backgroundColor: resolvedBgColor }}
      >
        {(product.customPageSettings?.backgroundImageUrl || product.coverImageUrl) && (
          <div 
            className="product-premium-gallery"
            style={{ 
              backgroundColor: resolvedBgColor,
              isolation: 'isolate'
            }}
          >
            <img
              src={product.customPageSettings?.backgroundImageUrl || product.coverImageUrl}
              alt={`${productTitle} Hero`}
              className="hero-premium-img active"
              style={!product.customPageSettings?.backgroundImageUrl ? { 
                objectFit: 'contain', 
                objectPosition: 'right center', 
                width: '100%', 
                height: '100%', 
                mixBlendMode: 'multiply',
                transform: 'scale(1.2)',
                transformOrigin: 'right center'
              } : {}}
            />
          </div>
        )}
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
                loading="eager"
                fetchpriority="high"
                decoding="async"
                style={{ transition: 'opacity 0.15s ease-in-out' }}
              />
            </div>
            {/* Thumbnails */}
            {detailGallery.length > 1 && (
              <div className="detail-gallery__thumbs-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
                {/* Vertical Up/Down Controls on the Left */}
                {detailGallery.length > 1 && (
                  <div className="detail-gallery__scroll-controls" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button 
                      onClick={() => {
                        const prevIdx = (activeDetailIdx - 1 + detailGallery.length) % detailGallery.length;
                        handleDetailImageChange(detailGallery[prevIdx], prevIdx);
                      }}
                      className="control-btn" 
                      style={{ width: '36px', height: '36px', border: 'none' }}
                      aria-label="Önceki görseller"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        const nextIdx = (activeDetailIdx + 1) % detailGallery.length;
                        handleDetailImageChange(detailGallery[nextIdx], nextIdx);
                      }}
                      className="control-btn" 
                      style={{ width: '36px', height: '36px', border: 'none' }}
                      aria-label="Sonraki görseller"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                )}
                
                <div className="detail-gallery__thumbs" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'nowrap', overflow: 'hidden', padding: '4px 2px' }}>
                  {(() => {
                    const visibleThumbs = [];
                    const count = Math.min(5, detailGallery.length);
                    for (let i = 0; i < count; i++) {
                      const idx = (thumbStartIndex + i) % detailGallery.length;
                      visibleThumbs.push({ src: detailGallery[idx], index: idx });
                    }
                    return visibleThumbs.map((item) => (
                      <button
                        key={item.index}
                        onClick={() => handleDetailImageChange(item.src, item.index)}
                        className={`detail-gallery__thumb ${item.index === activeDetailIdx ? 'active' : ''}`}
                        aria-label={`Görsel ${item.index + 1}`}
                      >
                        <img src={item.src} alt={`Küçük Görsel ${item.index + 1}`} loading="lazy" decoding="async" />
                      </button>
                    ));
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Description & Action Column */}
          <div className="detail-showcase__content">
            <h2 className="detail-showcase__title">{productTitle}</h2>
            <Link to={getLocalizedPath(categoryPath)} className="detail-showcase__subtitle">
              {(product.subcategory || product.category)?.toUpperCase()}
            </Link>
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary-dark"
                style={{ cursor: 'pointer', border: 'none' }}
              >
                {translate('Fiyat Teklifi Al', 'Get a Quote')}
              </button>
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
                    {product.cad2dFileUrl ? (
                      <a href={product.cad2dFileUrl} download>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </a>
                    ) : null}
                  </li>
                  <li>
                    <span>{productTitle} 3D Max</span>
                    {product.max3dFileUrl ? (
                      <a href={product.max3dFileUrl} download>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </a>
                    ) : null}
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
                {technicalDetails && technicalDetails.replace(/<[^>]*>/g, '').trim() !== '' ? (
                  <div className="specs-placeholder" style={{ marginBottom: '2rem' }}>
                    {technicalDetails.trim().startsWith('<') ? (
                      <div 
                        style={{ fontWeight: 300, lineHeight: 1.8, color: '#1a1a1a' }} 
                        dangerouslySetInnerHTML={{ __html: technicalDetails }} 
                      />
                    ) : (
                      <p style={{ fontWeight: 300, lineHeight: 1.8, color: '#1a1a1a', whiteSpace: 'pre-line' }}>
                        {technicalDetails}
                      </p>
                    )}
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
                    {product.catalogFileUrl ? (
                      <a href={product.catalogFileUrl} download>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </a>
                    ) : null}
                  </li>
                  <li>
                    <span>{productTitle} {translate('Montaj Kılavuzu', 'Assembly Manual')}</span>
                    {product.assemblyManualUrl ? (
                      <a href={product.assemblyManualUrl} download>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </a>
                    ) : null}
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
                      {item.isNewProduct && (
                        item.newProductBadgeStyle === 'pill' ? (
                          <div className="badge-pill-new" style={{ top: '1rem', right: '1rem' }}>{translate('YENİ', 'NEW')}</div>
                        ) : (
                          <div className="badge-ribbon-container">
                            <div className="badge-ribbon-new">{translate('YENİ', 'NEW')}</div>
                          </div>
                        )
                      )}
                      <span className="carousel-item-title">{item.title}</span>
                      <img src={item.coverImageUrl || FALLBACK_IMAGE} alt={item.title || ''} loading="lazy" decoding="async" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      <BurobigEcoBanner />

      {/* Proposal Modal */}
      {isModalOpen && (
        <div className="proposal-modal">
          <div className="proposal-modal__backdrop" onClick={() => setIsModalOpen(false)} />
          <div className="proposal-modal__content">
            <button className="proposal-modal__close" onClick={() => setIsModalOpen(false)} aria-label={translate('Kapat', 'Close')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {proposalSuccess ? (
              <div className="proposal-modal__success">
                <div className="proposal-modal__success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3>{translate('Teklif Talebiniz Alındı', 'Quote Request Received')}</h3>
                <p>
                  {translate(
                    'İnka Üst Yönetici için teklif talebiniz başarıyla kaydedilmiştir. En kısa sürede sizinle iletişime geçeceğiz.',
                    'Your quote request for İnka Üst Yönetici has been successfully registered. We will contact you as soon as possible.'
                  ).replace('İnka Üst Yönetici', productTitle)}
                </p>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                  {translate('Kapat', 'Close')}
                </button>
              </div>
            ) : (
              <div className="proposal-modal__grid">
                {/* Left Column: Product Selection & Info */}
                <div className="proposal-modal__left">
                  <h3 className="proposal-modal__title">{translate('Fiyat Teklifi Al', 'Get a Quote')}</h3>
                  <p className="proposal-modal__subtitle" style={{ marginBottom: '1.5rem' }}>
                    {translate(
                      'Seçtiğiniz ürünler için özel fiyat teklifi talep edebilirsiniz.',
                      'You can request a custom price quote for your selected products.'
                    )}
                  </p>

                  <div className="proposal-product-label" style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                    {translate('Seçili Ürün', 'Selected Product')}
                  </div>
                  <div className="proposal-product-preview">
                    <img src={product.coverImageUrl || FALLBACK_IMAGE} alt={productTitle} />
                    <div className="proposal-product-preview__info">
                      <span className="proposal-product-preview__title">{productTitle}</span>
                      <span className="proposal-product-preview__category">{(product.subcategory || product.category)?.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Add Extra Products */}
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">{translate('Ek Ürün Ekle (İsteğe Bağlı)', 'Add Extra Products (Optional)')}</label>
                    <div className="proposal-select-wrapper">
                      <select 
                        className="proposal-select" 
                        onChange={handleAddExtraProduct} 
                        defaultValue=""
                      >
                        <option value="" disabled>{translate('-- Ürün Seçin --', '-- Select Product --')}</option>
                        {allProducts
                          .filter(p => (p.slug || p.id) !== productSlug && !selectedExtraProducts.some(sep => (sep.slug || sep.id) === (p.slug || p.id)))
                          .map(p => (
                            <option key={p.id || p.slug} value={p.slug || p.id}>
                              {p.title}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Chips for Selected Extra Products */}
                  {selectedExtraProducts.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>
                        {translate('Eklenen Diğer Ürünler:', 'Other Added Products:')}
                      </div>
                      <div className="proposal-chips-container">
                        {selectedExtraProducts.map(p => (
                          <span key={p.slug || p.id} className="proposal-chip">
                            {p.title}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveExtraProduct(p.slug || p.id)}
                              aria-label={translate('Kaldır', 'Remove')}
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Contact Form */}
                <div className="proposal-modal__right">
                  <form onSubmit={handleProposalSubmit} className="proposal-form" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    {proposalError && (
                      <div className="proposal-form__error">
                        <span>{proposalError}</span>
                      </div>
                    )}

                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="website_dummy"
                      value={proposalData.website_dummy}
                      onChange={handleProposalChange}
                      style={{ display: 'none' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />

                    <div className="form-group">
                      <label htmlFor="name" className="form-label">{translate('Ad Soyad *', 'Name *')}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={proposalData.name}
                        onChange={handleProposalChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">{translate('E-Posta *', 'Email *')}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={proposalData.email}
                        onChange={handleProposalChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">{translate('Telefon *', 'Phone *')}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={proposalData.phone}
                        onChange={handleProposalChange}
                        className="form-input"
                        placeholder="05xx xxx xx xx"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">{translate('Ek Not / Mesaj *', 'Extra Note / Message *')}</label>
                      <textarea
                        id="message"
                        name="message"
                        value={proposalData.message}
                        onChange={handleProposalChange}
                        className="form-textarea"
                        placeholder={translate('Talebinize eklemek istediğiniz notlar...', 'Notes you want to add to your request...')}
                        required
                      />
                    </div>

                    <label className="form-checkbox-label">
                      <input
                        type="checkbox"
                        checked={proposalConsent}
                        onChange={(e) => setProposalConsent(e.target.checked)}
                        className="form-checkbox"
                        required
                      />
                      <span>
                        {translate(
                          'KVKK kapsamında kişisel verilerimin işlenmesini ve iletişim bilgilerim üzerinden benimle iletişime geçilmesini kabul ediyorum.',
                          'I accept the processing of my personal data under KVKK and consent to be contacted via my communication details.'
                        )}
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="btn-submit"
                      disabled={proposalLoading}
                    >
                      {proposalLoading ? (
                        translate('Gönderiliyor...', 'Sending...')
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-45deg)', marginTop: '-2px' }}>
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                          {translate('Teklifi Gönder', 'Submit Request')}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
