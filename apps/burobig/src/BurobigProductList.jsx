import { useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';
import { getActiveProducts } from '../../services/publicContentService';
import { getLocalizedContent } from '../../utils/i18nContent';
import { resolveField } from '@coreweb/shared-ui';


export default function BurobigProductList({ products, category, subcategory }) {
  const { activeLang } = useSite();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();


  const isUstYoneticiPath = location.pathname.endsWith('/ust-yonetici-masalari');
  const isYoneticiPath = location.pathname.endsWith('/yonetici-masalari');
  const isCalismaPath = location.pathname.endsWith('/calisma-masalari') || location.pathname.endsWith('/calisma');
  const isOfisKoltuklariPath = location.pathname.endsWith('/ofis-koltuklari');
  const isOperasyonelPath = location.pathname.endsWith('/operasyonel-masalar');
  const isToplantiPath = location.pathname.endsWith('/toplanti-masalari');
  
  // Ofis Koltukları subcategories
  const isYoneticiKoltuklariPath = location.pathname.endsWith('/yonetici-koltuklari');
  const isCalismaKoltuklariPath = location.pathname.endsWith('/calisma-koltuklari');
  const isMisafirKoltuklariPath = location.pathname.endsWith('/misafir-ve-bekleme-koltuklari');
  
  // Koltuklar / Kanepeler
  const isKoltuklarPath = location.pathname.endsWith('/koltuklar');
  const isKanepelerPath = location.pathname.endsWith('/kanepeler');
  const isSandalyelerPath = location.pathname.endsWith('/sandalyeler');
  const isBeklemeAlanlariPath = location.pathname.endsWith('/bekleme-alanlari');
  const isKoltuklarKanepelerPath = location.pathname.endsWith('/koltuklar-kanepeler');

  // Depolama Sistemleri
  const isKesonlarPath = location.pathname.endsWith('/kesonlar');
  const isDolaplarPath = location.pathname.endsWith('/dolaplar');
  const isKitaplikRafPath = location.pathname.endsWith('/kitaplik-ve-raf-sistemleri');
  const isDepolamaSistemleriPath = location.pathname.endsWith('/depolama-sistemleri');

  // Tamamlayıcılar
  const isSehpalarPath = location.pathname.endsWith('/sehpalar');
  const isPuflarPath = location.pathname.endsWith('/puflar');
  const isAskiliklarPath = location.pathname.endsWith('/askiliklar');
  const isElektrifikasyonPath = location.pathname.endsWith('/elektrifikasyon');
  const isTamamlayicilarPath = location.pathname.endsWith('/tamamlayicilar');

  const isCleanPath = isUstYoneticiPath || isYoneticiPath || isCalismaPath || isOfisKoltuklariPath || isOperasyonelPath || isToplantiPath ||
                      isYoneticiKoltuklariPath || isCalismaKoltuklariPath || isMisafirKoltuklariPath ||
                      isKoltuklarPath || isKanepelerPath || isSandalyelerPath || isBeklemeAlanlariPath || isKoltuklarKanepelerPath ||
                      isKesonlarPath || isDolaplarPath || isKitaplikRafPath || isDepolamaSistemleriPath ||
                      isSehpalarPath || isPuflarPath || isAskiliklarPath || isElektrifikasyonPath || isTamamlayicilarPath;

  const catParam = searchParams.get('cat');
  const subParam = searchParams.get('sub');

  // Localized string translation helper
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  // Helper to slugify strings for robust matching
  const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .normalize('NFD')
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  };

  // Determine current active category and subcategory target slugs
  let targetCatSlug = category ? slugify(category) : (catParam ? slugify(catParam) : null);
  let targetSubcatSlug = subcategory ? slugify(subcategory) : (subParam ? slugify(subParam) : null);

  if (isUstYoneticiPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'ust-yonetici';
  } else if (isYoneticiPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'yonetici';
  } else if (isCalismaPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'calisma';
  } else if (isOfisKoltuklariPath) {
    targetCatSlug = 'ofis-koltuklari';
  } else if (isOperasyonelPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'operasyonel';
  } else if (isToplantiPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'toplanti';
  } else if (isYoneticiKoltuklariPath) {
    targetCatSlug = 'ofis-koltuklari';
    targetSubcatSlug = 'yonetici-koltuklari';
  } else if (isCalismaKoltuklariPath) {
    targetCatSlug = 'ofis-koltuklari';
    targetSubcatSlug = 'calisma-koltuklari';
  } else if (isMisafirKoltuklariPath) {
    targetCatSlug = 'ofis-koltuklari';
    targetSubcatSlug = 'misafir-ve-bekleme-koltuklari';
  } else if (isKoltuklarPath) {
    targetCatSlug = 'koltuklar-kanepeler';
    targetSubcatSlug = 'koltuklar';
  } else if (isKanepelerPath) {
    targetCatSlug = 'koltuklar-kanepeler';
    targetSubcatSlug = 'kanepeler';
  } else if (isSandalyelerPath) {
    targetCatSlug = 'koltuklar-kanepeler';
    targetSubcatSlug = 'sandalyeler';
  } else if (isBeklemeAlanlariPath) {
    targetCatSlug = 'koltuklar-kanepeler';
    targetSubcatSlug = 'bekleme-alanlari';
  } else if (isKoltuklarKanepelerPath) {
    targetCatSlug = 'koltuklar-kanepeler';
  } else if (isKesonlarPath) {
    targetCatSlug = 'depolama-sistemleri';
    targetSubcatSlug = 'kesonlar';
  } else if (isDolaplarPath) {
    targetCatSlug = 'depolama-sistemleri';
    targetSubcatSlug = 'dolaplar';
  } else if (isKitaplikRafPath) {
    targetCatSlug = 'depolama-sistemleri';
    targetSubcatSlug = 'kitaplik-raf';
  } else if (isDepolamaSistemleriPath) {
    targetCatSlug = 'depolama-sistemleri';
  } else if (isSehpalarPath) {
    targetCatSlug = 'tamamlayicilar';
    targetSubcatSlug = 'sehpalar';
  } else if (isPuflarPath) {
    targetCatSlug = 'tamamlayicilar';
    targetSubcatSlug = 'puflar';
  } else if (isAskiliklarPath) {
    targetCatSlug = 'tamamlayicilar';
    targetSubcatSlug = 'askiliklar';
  } else if (isElektrifikasyonPath) {
    targetCatSlug = 'tamamlayicilar';
    targetSubcatSlug = 'elektrifikasyon';
  } else if (isTamamlayicilarPath) {
    targetCatSlug = 'tamamlayicilar';
  }



  // Filter products dynamically
  const filteredProducts = products.filter(product => {
    const catSlug = slugify(product.category);
    const subcatSlug = slugify(product.subcategory);

    if (targetCatSlug) {
      const isCatMatch = catSlug.includes(targetCatSlug) || 
                         targetCatSlug.includes(catSlug) ||
                         (targetCatSlug === 'masalar' && (catSlug.includes('masa') || catSlug.includes('table') || catSlug.includes('desk'))) ||
                         (targetCatSlug === 'ofis-koltuklari' && !catSlug.includes('kanep') && !catSlug.includes('kanap') && catSlug !== 'koltuklar-kanepeler' && (catSlug.includes('koltuk') || catSlug.includes('chair'))) ||
                         (targetCatSlug === 'koltuklar-kanepeler' && !catSlug.includes('ofis-koltuk') && !catSlug.includes('office-chair') && (catSlug.includes('koltuk') || catSlug.includes('kanepe') || catSlug.includes('kanap') || catSlug.includes('sandalye') || catSlug.includes('sofa') || catSlug.includes('armchair') || catSlug.includes('chair')));
      if (!isCatMatch) return false;
    }

    if (targetSubcatSlug) {
      if (targetSubcatSlug === 'yonetici') {
        // Strict matching for manager: subcat must be 'yonetici' and cannot be 'ust-yonetici'
        if (subcatSlug === 'ust-yonetici' || catSlug.includes('ust-yonetici')) return false;
        if (subcatSlug !== 'yonetici' && !catSlug.includes('yonetici-masasi')) return false;
      } else if (targetSubcatSlug === 'ust-yonetici') {
        // Strict matching for executive: subcat must be 'ust-yonetici'
        if (subcatSlug !== 'ust-yonetici' && !catSlug.includes('ust-yonetici-masasi')) return false;
      } else if (targetSubcatSlug === 'yonetici-koltuklari') {
        if (subcatSlug !== 'yonetici-koltuklari' && !subcatSlug.includes('yonetici') && !catSlug.includes('yonetici-koltuk')) return false;
      } else if (targetSubcatSlug === 'calisma-koltuklari') {
        if (subcatSlug !== 'calisma-koltuklari' && !subcatSlug.includes('calisma') && !subcatSlug.includes('task') && !catSlug.includes('calisma-koltuk')) return false;
      } else if (targetSubcatSlug === 'misafir-ve-bekleme-koltuklari') {
        if (subcatSlug === 'bekleme-alanlari') return false;
        if (subcatSlug !== 'misafir-ve-bekleme-koltuklari' && !subcatSlug.includes('misafir') && !subcatSlug.includes('bekleme') && !subcatSlug.includes('guest') && !subcatSlug.includes('waiting')) return false;
      } else if (targetSubcatSlug === 'koltuklar') {
        if (catSlug.includes('ofis-koltuk') || catSlug.includes('office-chair')) return false;
        if (subcatSlug.includes('kanepe') || subcatSlug.includes('kanap') || subcatSlug.includes('sofa') || catSlug.includes('kanepe-') || catSlug.includes('kanap-') || catSlug === 'kanepeler' || catSlug === 'kanapeler' || catSlug === 'kanepe' || catSlug === 'kanap') return false;
        if (subcatSlug === 'bekleme-alanlari' || subcatSlug.includes('bekleme') || subcatSlug === 'sandalyeler' || subcatSlug.includes('sandalye') || subcatSlug.includes('chair')) return false;
        const isMatch = subcatSlug === 'koltuklar' || subcatSlug.includes('koltuk') || subcatSlug.includes('armchair') || catSlug.includes('koltuk');
        if (!isMatch) return false;
      } else if (targetSubcatSlug === 'kanepeler') {
        if (subcatSlug.includes('koltuk') || subcatSlug.includes('armchair') || catSlug.includes('koltuk-') || catSlug === 'koltuklar' || catSlug === 'koltuk') return false;
        if (subcatSlug === 'bekleme-alanlari' || subcatSlug.includes('bekleme') || subcatSlug === 'sandalyeler' || subcatSlug.includes('sandalye') || subcatSlug.includes('chair')) return false;
        const isMatch = subcatSlug === 'kanepeler' || subcatSlug === 'kanapeler' || subcatSlug.includes('kanepe') || subcatSlug.includes('kanap') || subcatSlug.includes('sofa') || catSlug.includes('kanepe') || catSlug.includes('kanap');
        if (!isMatch) return false;
      } else if (targetSubcatSlug === 'sandalyeler') {
        if (subcatSlug.includes('koltuk') || subcatSlug.includes('armchair') || subcatSlug.includes('kanepe') || subcatSlug.includes('kanap') || subcatSlug.includes('sofa')) return false;
        if (subcatSlug === 'bekleme-alanlari' || subcatSlug.includes('bekleme') || subcatSlug === 'koltuklar' || subcatSlug.includes('koltuk')) return false;
        const isMatch = subcatSlug === 'sandalyeler' || subcatSlug.includes('sandalye') || subcatSlug.includes('chair') || catSlug.includes('sandalye');
        if (!isMatch) return false;
      } else if (targetSubcatSlug === 'bekleme-alanlari') {
        if (subcatSlug.includes('koltuk') || subcatSlug.includes('armchair') || subcatSlug.includes('kanepe') || subcatSlug.includes('kanap') || subcatSlug.includes('sofa') || subcatSlug === 'sandalyeler' || subcatSlug.includes('sandalye')) return false;
        const isMatch = subcatSlug === 'bekleme-alanlari' || subcatSlug.includes('bekleme') || subcatSlug.includes('waiting');
        if (!isMatch) return false;
      } else if (targetSubcatSlug === 'kitaplik-raf') {
        const isMatch = subcatSlug === 'kitaplik-raf' || 
                        subcatSlug.includes('kitaplik') || 
                        subcatSlug.includes('raf') || 
                        subcatSlug.includes('bookcase') || 
                        subcatSlug.includes('shel');
        if (!isMatch) return false;
      } else {
        // General dynamic matching for other categories (e.g. calisma)
        const isSubcatMatch = subcatSlug === targetSubcatSlug ||
                              (subcatSlug && subcatSlug.includes(targetSubcatSlug)) ||
                              (targetSubcatSlug === 'calisma' && (subcatSlug.includes('calis') || subcatSlug.includes('work') || catSlug.includes('calis') || catSlug.includes('work')));
        if (!isSubcatMatch) return false;
      }
    }

    return true;
  });

  // Get Page Title and Subtitle dynamically
  const getPageMeta = () => {
    const slugNames = {
      'ust-yonetici': { tr: 'Üst Yönetici Masaları', en: 'Executive Desks', pathTr: 'Masalar / Üst Yönetici', pathEn: 'Desks / Executive' },
      'yonetici': { tr: 'Yönetici Masaları', en: 'Manager Desks', pathTr: 'Masalar / Yönetici', pathEn: 'Desks / Manager' },
      'calisma': { tr: 'Çalışma Masaları', en: 'Work Desks', pathTr: 'Masalar / Çalışma', pathEn: 'Desks / Work' },
      'operasyonel': { tr: 'Operasyonel Masalar', en: 'Operational Desks', pathTr: 'Masalar / Operasyonel', pathEn: 'Desks / Operational' },
      'toplanti': { tr: 'Toplantı Masaları', en: 'Meeting Tables', pathTr: 'Masalar / Toplantı', pathEn: 'Desks / Meeting' },
      
      'ofis-koltuklari': { tr: 'Ofis Koltukları', en: 'Office Chairs', pathTr: 'Bürobig / Ofis Koltukları', pathEn: 'Bürobig / Office Chairs' },
      'yonetici-koltuklari': { tr: 'Yönetici Koltukları', en: 'Executive Chairs', pathTr: 'Ofis Koltukları / Yönetici Koltukları', pathEn: 'Office Chairs / Executive Chairs' },
      'calisma-koltuklari': { tr: 'Çalışma Koltukları', en: 'Task Chairs', pathTr: 'Ofis Koltukları / Çalışma Koltukları', pathEn: 'Office Chairs / Task Chairs' },
      'misafir-ve-bekleme-koltuklari': { tr: 'Misafir ve Bekleme Koltukları', en: 'Guest & Waiting Chairs', pathTr: 'Ofis Koltukları / Misafir ve Bekleme Koltukları', pathEn: 'Office Chairs / Guest & Waiting Chairs' },

      'koltuklar': { tr: 'Koltuklar', en: 'Armchairs', pathTr: 'Koltuklar / Kanepeler / Koltuklar', pathEn: 'Armchairs & Sofas / Armchairs' },
      'kanepeler': { tr: 'Kanepeler', en: 'Sofas', pathTr: 'Koltuklar / Kanepeler / Kanepeler', pathEn: 'Armchairs & Sofas / Sofas' },
      'sandalyeler': { tr: 'Sandalyeler', en: 'Chairs', pathTr: 'Koltuklar / Kanepeler / Sandalyeler', pathEn: 'Armchairs & Sofas / Chairs' },
      'bekleme-alanlari': { tr: 'Bekleme Alanları', en: 'Waiting Areas', pathTr: 'Koltuklar / Kanepeler / Bekleme Alanları', pathEn: 'Armchairs & Sofas / Waiting Areas' },
      'koltuklar-kanepeler': { tr: 'Koltuklar ve Kanepeler', en: 'Armchairs & Sofas', pathTr: 'Bürobig / Koltuklar ve Kanepeler', pathEn: 'Bürobig / Armchairs & Sofas' },

      'masalar': { tr: 'Tüm Masalar', en: 'All Desks', pathTr: 'Bürobig / Ofis Masaları', pathEn: 'Bürobig / Office Desks' },
      'depolama-sistemleri': { tr: 'Depolama Sistemleri', en: 'Storage Systems', pathTr: 'Bürobig / Depolama Sistemleri', pathEn: 'Bürobig / Storage Systems' },
      'kesonlar': { tr: 'Kesonlar', en: 'Pedestals', pathTr: 'Depolama Sistemleri / Kesonlar', pathEn: 'Storage Systems / Pedestals' },
      'dolaplar': { tr: 'Dolaplar', en: 'Cabinets', pathTr: 'Depolama Sistemleri / Dolaplar', pathEn: 'Storage Systems / Cabinets' },
      'kitaplik-raf': { tr: 'Kitaplık ve Raf Sistemleri', en: 'Bookcases & Shelves', pathTr: 'Depolama Sistemleri / Kitaplık ve Raf Sistemleri', pathEn: 'Storage Systems / Bookcases & Shelves' },
      
      'tamamlayicilar': { tr: 'Tamamlayıcılar', en: 'Accessories', pathTr: 'Bürobig / Tamamlayıcılar', pathEn: 'Bürobig / Accessories' },
      'sehpalar': { tr: 'Sehpalar', en: 'Coffee Tables', pathTr: 'Tamamlayıcılar / Sehpalar', pathEn: 'Accessories / Coffee Tables' },
      'puflar': { tr: 'Puflar', en: 'Poufs', pathTr: 'Tamamlayıcılar / Puflar', pathEn: 'Accessories / Poufs' },
      'askiliklar': { tr: 'Askılıklar', en: 'Coat Hangers', pathTr: 'Tamamlayıcılar / Askılıklar', pathEn: 'Accessories / Coat Hangers' },
      'elektrifikasyon': { tr: 'Elektrifikasyon', en: 'Electrification', pathTr: 'Tamamlayıcılar / Elektrifikasyon', pathEn: 'Accessories / Electrification' }
    };

    const subNameMap = slugNames[targetSubcatSlug];
    if (subNameMap) {
      return {
        title: translate(subNameMap.tr, subNameMap.en),
        subtitle: translate(subNameMap.pathTr, subNameMap.pathEn)
      };
    }

    const catNameMap = slugNames[targetCatSlug];
    if (catNameMap) {
      return {
        title: translate(catNameMap.tr, catNameMap.en),
        subtitle: translate(catNameMap.pathTr, catNameMap.pathEn)
      };
    }

    if (targetSubcatSlug) {
      const sampleProduct = products.find(p => slugify(p.subcategory) === targetSubcatSlug);
      const name = sampleProduct ? sampleProduct.subcategory : subParam;
      return {
        title: translate(`${name} Koleksiyonu`, `${name} Collection`),
        subtitle: `Bürobig / ${name}`
      };
    }

    if (targetCatSlug) {
      const sampleProduct = products.find(p => slugify(p.category) === targetCatSlug);
      const name = sampleProduct ? sampleProduct.category : catParam;
      return {
        title: translate(`${name} Koleksiyonu`, `${name} Collection`),
        subtitle: `Bürobig / ${name}`
      };
    }

    return {
      title: translate('Tüm Koleksiyonlar', 'All Collections'),
      subtitle: translate('Bürobig / Ürün Kataloğu', 'Bürobig / Product Catalog')
    };
  };

  const { title, subtitle } = getPageMeta();

  useEffect(() => {
    let seoTitle = title;
    let seoDesc = translate(
      'Bürobig premium ofis mobilyaları ve ürün kataloğu.',
      'Bürobig premium office furniture and product catalog.'
    );

    if (isUstYoneticiPath) {
      seoDesc = translate(
        'Bürobig premium üst yönetici masaları koleksiyonu.',
        'Bürobig premium executive desks collection.'
      );
    } else if (isYoneticiPath) {
      seoDesc = translate(
        'Bürobig premium yönetici masaları koleksiyonu.',
        'Bürobig premium manager desks collection.'
      );
    } else if (isCalismaPath) {
      seoDesc = translate(
        'Bürobig premium çalışma masaları koleksiyonu.',
        'Bürobig premium work desks collection.'
      );
    } else if (isOfisKoltuklariPath) {
      seoDesc = translate(
        'Bürobig ergonomik ve estetik ofis koltukları koleksiyonu.',
        'Bürobig ergonomic and aesthetic office chairs collection.'
      );
    } else if (isOperasyonelPath) {
      seoDesc = translate(
        'Bürobig modern operasyonel masalar koleksiyonu.',
        'Bürobig modern operational desks collection.'
      );
    } else if (isToplantiPath) {
      seoDesc = translate(
        'Bürobig şık ve fonksiyonel toplantı masaları koleksiyonu.',
        'Bürobig stylish and functional meeting tables collection.'
      );
    }

    updateSEOMeta({
      title: seoTitle,
      description: seoDesc,
      companyName: 'Bürobig'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLang, title, isUstYoneticiPath, isYoneticiPath, isCalismaPath, isOfisKoltuklariPath, isOperasyonelPath, isToplantiPath,
      isYoneticiKoltuklariPath, isCalismaKoltuklariPath, isMisafirKoltuklariPath,
      isKoltuklarPath, isKanepelerPath, isSandalyelerPath, isBeklemeAlanlariPath, isKoltuklarKanepelerPath,
      isKesonlarPath, isDolaplarPath, isKitaplikRafPath, isDepolamaSistemleriPath,
      isSehpalarPath, isPuflarPath, isAskiliklarPath, isElektrifikasyonPath, isTamamlayicilarPath]);

  return (
    <main className="category-page">
      {/* Category Title Area */}
      <section className="category-hero">
        <div className="category-hero__container">
          <h1 className="category-hero__title">{title}</h1>
          <span className="category-hero__subtitle">{subtitle}</span>
        </div>
      </section>



      {/* Product Grid Section */}
      <section className="category-grid-section">
        <div className="category-grid-container">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-slate-100">
              <p className="text-slate-500 font-medium">
                {translate('Bu kategoride henüz ürün bulunmuyor.', 'No products found in this category.')}
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product, index) => {
                const productSlug = resolveField(product, activeLang, 'slug') || product.slug || product.id;
                const productPath = activeLang === 'tr' ? 'urunler' : 'products';
                const detailPath = getLocalizedPath(`/${productPath}/${productSlug}`);
                const cardNumber = (index + 1).toString().padStart(2, '0');
                const fallbackImage = '/assets/burobig/images/INKA 01.jpg';
                const productTitle = resolveField(product, activeLang, 'title') || resolveField(product, activeLang, 'name') || '';

                return (
                  <article key={product.id} className="product-card">
                    {product.isNewProduct ? (
                      product.newProductBadgeStyle === 'pill' ? (
                        <div className="badge-pill-new">{translate('YENİ', 'NEW')}</div>
                      ) : (
                        <div className="badge-ribbon-container">
                          <div className="badge-ribbon-new">{translate('YENİ', 'NEW')}</div>
                        </div>
                      )
                    ) : (
                      <span className="product-card__number">{cardNumber}</span>
                    )}
                    <div className="product-card__content">
                      <h2 className="product-card__title" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                        {productTitle}
                      </h2>
                    </div>
                    <div className="product-card__image-wrapper">
                      <img 
                        src={product.coverImageUrl || fallbackImage} 
                        alt={productTitle || 'Bürobig Ürün'} 
                        loading="lazy"
                      />
                    </div>
                    <div className="product-card__footer" style={{ position: 'relative', top: '7px' }}>
                      <span className="product-card__explore">{translate('Keşfet →', 'Explore →')}</span>
                      <span className="product-card__category">{product.subcategory || product.category || ''}</span>
                    </div>
                    <Link 
                      to={detailPath} 
                      className="product-card__link" 
                      aria-label={`${productTitle} ${translate('Ürün Detayı', 'Product Detail')}`}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
