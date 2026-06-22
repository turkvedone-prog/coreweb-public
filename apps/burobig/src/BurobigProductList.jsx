import { useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';
import { getActiveProducts } from '../../services/publicContentService';
import { getLocalizedContent } from '../../utils/i18nContent';
import { resolveField } from '@coreweb/shared-ui';


export default function BurobigProductList({ products }) {
  const { activeLang } = useSite();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();


  const isUstYoneticiPath = location.pathname.endsWith('/ust-yonetici');
  const isOfisKoltuklariPath = location.pathname.endsWith('/ofis-koltuklari');
  const isOperasyonelPath = location.pathname.endsWith('/operasyonel-masalar');
  const isToplantiPath = location.pathname.endsWith('/toplanti-masalari');
  const isCleanPath = isUstYoneticiPath || isOfisKoltuklariPath || isOperasyonelPath || isToplantiPath;

  const catParam = searchParams.get('cat');
  const subParam = searchParams.get('sub');

  // Localized string translation helper
  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  // Determine current active filter tab
  const getActiveTab = () => {
    if (isUstYoneticiPath || subParam === 'ust-yonetici') {
      return 'ust-yonetici';
    }
    if (isOfisKoltuklariPath || catParam === 'ofis-koltuklari') {
      return 'ofis-koltuklari';
    }
    if (isOperasyonelPath || subParam === 'operasyonel') {
      return 'operasyonel';
    }
    if (isToplantiPath || subParam === 'toplanti') {
      return 'toplanti';
    }
    if (catParam === 'masalar') {
      return 'masalar';
    }
    return 'all';
  };

  const activeTab = getActiveTab();

  // Handle Tab Switch
  const handleTabClick = (tab) => {
    if (tab === 'all') {
      setSearchParams({});
    } else if (tab === 'ust-yonetici') {
      setSearchParams({ cat: 'masalar', sub: 'ust-yonetici' });
    } else if (tab === 'ofis-koltuklari') {
      setSearchParams({ cat: 'ofis-koltuklari' });
    }
  };

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

  // Filter products based on active tab
  const filteredProducts = products.filter(product => {
    const catSlug = slugify(product.category);
    const subcatSlug = slugify(product.subcategory);

    if (activeTab === 'ust-yonetici') {
      return subcatSlug === 'ust-yonetici' || product.category === 'Üst Yönetici Masası';
    }
    if (activeTab === 'ofis-koltuklari') {
      return catSlug === 'ofis-koltuklari' || product.category === 'Ofis Koltuğu';
    }
    if (activeTab === 'operasyonel') {
      return subcatSlug === 'operasyonel' || product.category === 'Operasyonel Masa';
    }
    if (activeTab === 'toplanti') {
      return subcatSlug === 'toplanti' || product.category === 'Toplantı Masası';
    }
    if (activeTab === 'masalar') {
      return catSlug === 'masalar' || 
             subcatSlug === 'ust-yonetici' || 
             subcatSlug === 'operasyonel' || 
             subcatSlug === 'toplanti' ||
             product.category === 'Üst Yönetici Masası' || 
             product.category === 'Operasyonel Masa' || 
             product.category === 'Toplantı Masası';
    }
    return true; // 'all'
  });

  // Get Page Title and Subtitle dynamically
  const getPageMeta = () => {
    if (activeTab === 'ust-yonetici') {
      return {
        title: translate('Üst Yönetici Masaları', 'Executive Desks'),
        subtitle: translate('Masalar / Üst Yönetici', 'Desks / Executive')
      };
    }
    if (activeTab === 'ofis-koltuklari') {
      return {
        title: translate('Ofis Koltukları', 'Office Chairs'),
        subtitle: translate('Koltuklar / Ofis Koltukları', 'Chairs / Office Chairs')
      };
    }
    if (activeTab === 'operasyonel') {
      return {
        title: translate('Operasyonel Masalar', 'Operational Desks'),
        subtitle: translate('Masalar / Operasyonel', 'Desks / Operational')
      };
    }
    if (activeTab === 'toplanti') {
      return {
        title: translate('Toplantı Masaları', 'Meeting Tables'),
        subtitle: translate('Masalar / Toplantı', 'Desks / Meeting')
      };
    }
    if (activeTab === 'masalar') {
      return {
        title: translate('Tüm Masalar', 'All Desks'),
        subtitle: translate('Bürobig / Ofis Masaları', 'Bürobig / Office Desks')
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
  }, [activeLang, title, isUstYoneticiPath, isOfisKoltuklariPath, isOperasyonelPath, isToplantiPath]);

  return (
    <main className="category-page">
      {/* Category Title Area */}
      <section className="category-hero">
        <div className="category-hero__container">
          <h1 className="category-hero__title">{title}</h1>
          <span className="category-hero__subtitle">{subtitle}</span>
        </div>
      </section>

      {/* Category Tab Filter Bar (Premium UI Enhancement) */}
      {!isCleanPath && (
        <section className="bg-white border-b border-slate-100 py-6">
          <div className="max-w-[1440px] mx-auto px-[5%] flex justify-center gap-8">
            <button
              onClick={() => handleTabClick('all')}
              className={`pb-2 text-sm font-medium tracking-wider uppercase transition-colors relative ${
                activeTab === 'all'
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {translate('Tümü', 'All')}
            </button>
            <button
              onClick={() => handleTabClick('ust-yonetici')}
              className={`pb-2 text-sm font-medium tracking-wider uppercase transition-colors relative ${
                activeTab === 'ust-yonetici'
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {translate('Üst Yönetici Masaları', 'Executive Desks')}
            </button>
            <button
              onClick={() => handleTabClick('ofis-koltuklari')}
              className={`pb-2 text-sm font-medium tracking-wider uppercase transition-colors relative ${
                activeTab === 'ofis-koltuklari'
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {translate('Ofis Koltukları', 'Office Chairs')}
            </button>
          </div>
        </section>
      )}

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
                const productSlug = product.slug || product.id;
                const detailPath = getLocalizedPath(`/urunler/${productSlug}`);
                const cardNumber = (index + 1).toString().padStart(2, '0');
                const fallbackImage = '/assets/burobig/images/INKA 01.jpg';
                const productTitle = resolveField(product, activeLang, 'title') || resolveField(product, activeLang, 'name') || '';

                return (
                  <article key={product.id} className="product-card">
                    <span className="product-card__number">{cardNumber}</span>
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
