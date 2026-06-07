import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActiveProducts } from '../services/publicContentService';
import { getLocalizedContent } from '../utils/i18nContent';
import { useSite } from '../layouts/SiteLayout';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { updateSEOMeta } from '../utils/seo';
import ImageWithFallback from '../components/ImageWithFallback';
import BurobigProductList from '../themes/burobig/BurobigProductList';

export default function ProductList() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    if (!tenantId) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const rawProducts = await getActiveProducts(tenantId);
        const localizedProducts = rawProducts.map(doc => getLocalizedContent(doc, activeLang)).filter(Boolean);
        setProducts(localizedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(activeLang === 'tr' ? 'Ürünler yüklenirken bir hata oluştu.' : 'An error occurred while loading products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tenantId, activeLang]);

  // SEO Update
  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Ürünlerimiz' : 'Our Products',
      description: activeLang === 'tr'
        ? `${companyName} ürün kataloğu, hizmetleri ve detaylı ürün listesi.`
        : `${companyName} product catalog, services, and detailed product lists.`,
      companyName
    });
  }, [activeLang, companyName]);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const formatPrice = (priceVal) => {
    if (priceVal === null || priceVal === undefined || priceVal === '') return null;
    const num = parseFloat(priceVal);
    if (isNaN(num)) return priceVal; // Fallback if string
    return num.toLocaleString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: activeLang === 'tr' ? 'TRY' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-500 font-medium">{translate('Ürünler yükleniyor...', 'Loading products...')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-800">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';

  if (isBurobig) {
    return <BurobigProductList products={products} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {translate('Ürünlerimiz', 'Our Products')}
          </h1>
          <p className="text-lg text-slate-600">
            {translate(
              'Yüksek standartlarda ürettiğimiz yenilikçi ve kaliteli ürün gruplarımızı inceleyin.',
              'Explore our innovative and high-quality product ranges manufactured to the highest standards.'
            )}
          </p>
        </div>

        {/* Product List Grid */}
        {products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="p-3 bg-slate-100 text-slate-400 rounded-2xl inline-block">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{translate('Ürün Bulunmuyor', 'No Products Found')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {translate('Bu kiracı için henüz yayınlanmış bir ürün bulunmamaktadır.', 'There are no published products for this tenant yet.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const productSlug = product.slug || product.id;
              const detailPath = getLocalizedPath(`/urunler/${productSlug}`);
              const priceString = formatPrice(product.price);

              return (
                <div key={product.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                  {/* Image Container */}
                  <div className="aspect-square w-full bg-slate-100 overflow-hidden relative">
                    <ImageWithFallback 
                      src={product.coverImageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackIcon={ShoppingBag}
                    />
                    {product.category && (
                      <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5 flex flex-col flex-grow space-y-3">
                    <h2 className="text-lg font-bold text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors">
                      <Link to={detailPath}>{product.title}</Link>
                    </h2>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-grow">
                      {product.summary || product.content?.replace(/<[^>]*>/g, '').substring(0, 100)}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      {priceString ? (
                        <span className="text-base font-extrabold text-slate-900">{priceString}</span>
                      ) : (
                        <span className="text-xs text-slate-400 font-semibold">{translate('Fiyat Sorunuz', 'Contact for Price')}</span>
                      )}
                      
                      <Link
                        to={detailPath}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        <span>{translate('İncele', 'View')}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {product.isFallback && (
                      <div className="pt-1">
                        <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                          {translate(`Sadece Türkçe`, `Turkish Only`)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
