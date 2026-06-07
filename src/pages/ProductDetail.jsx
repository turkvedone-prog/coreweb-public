import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getActiveProductBySlug } from '../services/publicContentService';
import { getLocalizedContent } from '../utils/i18nContent';
import { useSite } from '../layouts/SiteLayout';
import { ShoppingBag, ChevronLeft, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { updateSEOMeta } from '../utils/seo';
import ImageWithFallback from '../components/ImageWithFallback';
import BurobigProductDetail from '../themes/burobig/BurobigProductDetail';

export default function ProductDetail() {
  const { slug } = useParams();
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    if (!tenantId || !slug) return;

    const fetchProductDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await getActiveProductBySlug(tenantId, slug, activeLang);
        if (doc) {
          const localized = getLocalizedContent(doc, activeLang);
          setProduct(localized);
          setActiveImage(localized.coverImageUrl || '');
        } else {
          setError(activeLang === 'tr' ? 'Aradığınız ürün bulunamadı.' : 'The product you are looking for could not be found.');
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError(activeLang === 'tr' ? 'Ürün yüklenirken bir hata oluştu.' : 'An error occurred while loading the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [tenantId, slug, activeLang]);

  // SEO Update
  useEffect(() => {
    if (loading) return;

    if (error || !product) {
      updateSEOMeta({
        title: activeLang === 'tr' ? 'Ürün Bulunamadı' : 'Product Not Found',
        description: activeLang === 'tr' ? 'Aradığınız ürün bulunamadı.' : 'The product you are looking for could not be found.',
        image: '',
        companyName
      });
      return;
    }

    const productName = product.title || product.name || '';
    const cleanSummary = product.summary || (product.content || product.description)?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
    
    updateSEOMeta({
      title: productName,
      description: cleanSummary,
      image: product.coverImageUrl || '',
      companyName
    });
  }, [product, loading, error, companyName, activeLang]);


  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const formatPrice = (priceVal) => {
    if (priceVal === null || priceVal === undefined || priceVal === '') return null;
    const num = parseFloat(priceVal);
    if (isNaN(num)) return priceVal;
    return num.toLocaleString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: product?.currency || (activeLang === 'tr' ? 'TRY' : 'USD'),
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `(${mb.toFixed(2)} MB)`;
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-500 font-medium">{translate('Ürün yükleniyor...', 'Loading product...')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-6">
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl inline-block">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{translate('Ürün Bulunamadı', 'Product Not Found')}</h3>
          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
            {error || translate('Aradığınız ürün bulunamadı veya yayından kaldırılmış olabilir.', 'The product you are looking for does not exist or may have been unpublished.')}
          </p>
          <div className="pt-4">
            <Link
              to={getLocalizedPath('/urunler')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{translate('Tüm Ürünlere Dön', 'Back to Products')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const productName = product.title || product.name || '';
  const productDescription = product.content || product.description || '';
  const priceString = formatPrice(product.price);
  
  // Prepare gallery: cover + gallery items
  const galleryItems = product.gallery 
    ? [...product.gallery].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';

  if (isBurobig) {
    return <BurobigProductDetail product={product} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <div className="mb-8">
          <Link
            to={getLocalizedPath('/urunler')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
            <span>{translate('Ürünlerimize Dön', 'Back to Products')}</span>
          </Link>
        </div>

        {/* Product Workspace */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm p-6 sm:p-10 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Visuals Column (Gallery) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Main Photo */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center">
                <ImageWithFallback
                  src={activeImage}
                  alt={productName}
                  className="w-full h-full object-cover transition-all duration-300"
                  fallbackIcon={ShoppingBag}
                />
              </div>

              {/* Thumbnails */}
              {galleryItems.length > 0 && (
                <div className="grid grid-cols-5 gap-3">
                  {/* Cover image thumbnail */}
                  {product.coverImageUrl && (
                    <button
                      onClick={() => setActiveImage(product.coverImageUrl)}
                      className={`aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 transition-all ${
                        activeImage === product.coverImageUrl ? 'border-indigo-600 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <ImageWithFallback src={product.coverImageUrl} alt={productName} className="w-full h-full object-cover" fallbackIcon={ShoppingBag} />
                    </button>
                  )}
                  {/* Gallery thumbnails */}
                  {galleryItems.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(img.url)}
                      className={`aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 transition-all ${
                        activeImage === img.url ? 'border-indigo-600 ring-2 ring-indigo-500/10' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <ImageWithFallback 
                        src={img.url} 
                        alt={img.altText?.[activeLang] || productName} 
                        className="w-full h-full object-cover" 
                        fallbackIcon={ShoppingBag}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              
              {/* Main Info */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  {product.category && product.category.trim() !== '' && (
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                  )}
                  {product.sku && product.sku.trim() !== '' && (
                    <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl font-semibold">
                      SKU: {product.sku}
                    </span>
                  )}
                  {product.isFallback && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl font-medium">
                      {translate(`Sadece Türkçe`, `Turkish Only`)}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {productName}
                  </h1>
                  {product.summary && product.summary.trim() !== '' && (
                    <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-medium">
                      {product.summary}
                    </p>
                  )}
                </div>

                {/* Price Box */}
                {((priceString) || (product.priceLabel && product.priceLabel.trim() !== '')) && (
                  <div className="py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-500">{translate('Birim Fiyatı', 'Unit Price')}</span>
                    {priceString ? (
                      <div className="text-2xl font-black text-slate-900">{priceString}</div>
                    ) : (
                      <div className="text-sm font-bold text-indigo-600 bg-indigo-50/50 px-3 py-1 rounded-xl">
                        {product.priceLabel}
                      </div>
                    )}
                  </div>
                )}

                {/* Stock Info */}
                {product.showStock && product.stockQuantity !== null && product.stockQuantity !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle className="h-4.5 w-4.5 text-green-500 shrink-0" />
                    <span>
                      {translate('Stok Durumu: ', 'Stock Status: ')}
                      <strong className="text-slate-950">
                        {product.stockQuantity > 0 
                          ? translate(`${product.stockQuantity} Adet Mevcut`, `${product.stockQuantity} Units in Stock`)
                          : translate('Tükendi', 'Out of Stock')}
                      </strong>
                    </span>
                  </div>
                )}

                {/* Catalog PDF */}
                {product.catalogFileUrl && product.catalogFileUrl.trim() !== '' && (
                  <div className="pt-2">
                    <a
                      href={product.catalogFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-all duration-200"
                    >
                      <Download className="h-4.5 w-4.5" />
                      <span>{translate('Kataloğu Görüntüle / İndir', 'View / Download Catalog')}</span>
                      {product.catalogFileSize > 0 && (
                        <span className="text-xs text-indigo-200 font-normal">{formatFileSize(product.catalogFileSize)}</span>
                      )}
                    </a>
                  </div>
                )}
              </div>

              {/* Specs & Description Area */}
              <div className="space-y-6 pt-8 border-t border-slate-100">
                
                {/* Description */}
                {productDescription && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                      {translate('Ürün Açıklaması', 'Product Description')}
                    </h3>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      {productDescription.startsWith('<') ? (
                        <div dangerouslySetInnerHTML={{ __html: productDescription }} className="space-y-4" />
                      ) : (
                        <div className="whitespace-pre-line">{productDescription}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Technical Details */}
                {product.technicalDetails && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                      {translate('Teknik Detaylar', 'Technical Specifications')}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {product.technicalDetails}
                    </p>
                  </div>
                )}

                {/* Usage Areas */}
                {product.usageAreas && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
                      {translate('Kullanım Alanları', 'Usage Areas')}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {product.usageAreas}
                    </p>
                  </div>
                )}

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
