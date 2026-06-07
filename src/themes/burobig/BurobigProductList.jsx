import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';

export default function BurobigProductList({ products }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const [searchParams, setSearchParams] = useSearchParams();

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const catParam = searchParams.get('cat');
  const subParam = searchParams.get('sub');

  // Localized string translation helper
  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  // Determine current active filter tab
  const getActiveTab = () => {
    if (subParam === 'ust-yonetici' || catParam === 'masalar') {
      return 'ust-yonetici';
    }
    if (catParam === 'ofis-koltuklari') {
      return 'ofis-koltuklari';
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

  // Filter products based on active tab
  const filteredProducts = products.filter(product => {
    if (activeTab === 'ust-yonetici') {
      return product.category === 'Üst Yönetici Masası';
    }
    if (activeTab === 'ofis-koltuklari') {
      return product.category === 'Ofis Koltuğu';
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
    return {
      title: translate('Tüm Koleksiyonlar', 'All Collections'),
      subtitle: translate('Bürobig / Ürün Kataloğu', 'Bürobig / Product Catalog')
    };
  };

  const { title, subtitle } = getPageMeta();

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

                return (
                  <article key={product.id} className="product-card">
                    <span className="product-card__number">{cardNumber}</span>
                    <div className="product-card__content">
                      <h2 className="product-card__title" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                        {product.title}
                      </h2>
                    </div>
                    <div className="product-card__image-wrapper">
                      <img 
                        src={product.coverImageUrl} 
                        alt={product.title} 
                        loading="lazy"
                      />
                    </div>
                    <div className="product-card__footer" style={{ position: 'relative', top: '7px' }}>
                      <span className="product-card__explore">{translate('Keşfet →', 'Explore →')}</span>
                      <span className="product-card__category">{product.category}</span>
                    </div>
                    <Link 
                      to={detailPath} 
                      className="product-card__link" 
                      aria-label={`${product.title} ${translate('Ürün Detayı', 'Product Detail')}`}
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
