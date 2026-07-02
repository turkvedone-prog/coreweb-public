import React, { useEffect, useState, Suspense, lazy } from 'react';
import {
  BrowserRouter, Routes, Route, Outlet,
  useParams, useNavigate, Navigate
} from 'react-router-dom';

import SiteLayout from './layouts/SiteLayout';
import { useSite } from './layouts/SiteLayout';

const BurobigHome = lazy(() => import('./BurobigHome'));
const BurobigBlogList = lazy(() => import('./BurobigBlogList'));
const BurobigBlogDetail = lazy(() => import('./BurobigBlogDetail'));
const BurobigProductList = lazy(() => import('./BurobigProductList'));
const BurobigProductDetail = lazy(() => import('./BurobigProductDetail'));
const BurobigContact = lazy(() => import('./BurobigContact'));
const BurobigDesigners = lazy(() => import('./BurobigDesigners'));
const BurobigHistory = lazy(() => import('./BurobigHistory'));
const BurobigDesignProcess = lazy(() => import('./BurobigDesignProcess'));
const BurobigDesignPhilosophy = lazy(() => import('./BurobigDesignPhilosophy'));
const BurobigManifesto = lazy(() => import('./BurobigManifesto'));
const BurobigQualityPolicy = lazy(() => import('./BurobigQualityPolicy'));
const BurobigSustainability = lazy(() => import('./BurobigSustainability'));
const BurobigLegalDetail = lazy(() => import('./BurobigLegalDetail'));

import { getActiveProducts, getActiveProductBySlug } from '../../services/publicContentService';
import { submitLead, resolveField, loadRecaptchaScript, executeRecaptcha, getCatalogMetadata, getCompanySettings, logPublicEvent } from '@coreweb/shared-ui';
import { updateSEOMeta } from '../../utils/seo';

// ─── 404 Not Found Page ──────────────────────────────────────────────────────
function BurobigNotFound() {
  const { activeLang } = useSite();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'ar' ? 'الصفحة غير موجودة | Bürobig Mobilya' : (activeLang === 'tr' ? 'Sayfa Bulunamadı | Bürobig Mobilya' : 'Page Not Found | Bürobig Mobilya'),
      description: activeLang === 'ar' ? 'لم يتم العثور على الصفحة التي تبحث عنها.' : (activeLang === 'tr' ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.'),
      companyName: ''
    });
  }, [activeLang]);

  return (
    <main id="main-content" className="corporate-page" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="corporate-container" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
        <h1 className="corporate-large-title" style={{ fontSize: '6rem', margin: 0, fontWeight: '300', opacity: 0.15 }}>404</h1>
        <h2 className="corporate-sub-title" style={{ fontSize: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
          {activeLang === 'ar' ? 'الصفحة غير موجودة' : (activeLang === 'tr' ? 'Aradığınız Sayfa Bulunamadı' : 'Page Not Found')}
        </h2>
        <p style={{ maxWidth: '500px', margin: '0 auto 3rem auto', opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>
          {activeLang === 'ar'
            ? 'قد تكون الصفحة التي تبحث عنها قد تمت إزالتها أو تغيير اسمها أو أنها غير متاحة مؤقتًا.'
            : (activeLang === 'tr'
                ? 'Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.'
                : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.')}
        </p>
        <button 
          onClick={() => navigate(`/${activeLang}`)}
          style={{ 
            background: '#000', 
            color: '#fff', 
            border: 'none', 
            padding: '1rem 2.5rem', 
            fontSize: '0.85rem', 
            letterSpacing: '1px', 
            textTransform: 'uppercase', 
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
          onMouseOut={(e) => e.currentTarget.style.opacity = 1}
        >
          {activeLang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : (activeLang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home')}
        </button>
      </div>
    </main>
  );
}



// ─── Blog Page Wrapper (fetches blogs from Firebase) ─────────────────────────
function BurobigBlogPage() {
  const { activeLang } = useSite();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLocalizedPath = (path) => `/${activeLang}${path}`;
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const ts = dateStr?.seconds ? dateStr.seconds * 1000 : new Date(dateStr).getTime();
    try {
      const locale = activeLang === 'ar' ? 'ar-EG' : (activeLang === 'tr' ? 'tr-TR' : 'en-US');
      return new Date(ts).toLocaleDateString(locale, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return ''; }
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'ar' ? 'المدونة والأخبار' : (activeLang === 'tr' ? 'Blog & Haberler' : 'Blog & News'),
      description: activeLang === 'ar' ? 'آخر الأخبار والمقالات حول أثاث مكتب بيروبيج الفاخر.' : (activeLang === 'tr' ? 'Bürobig premium ofis mobilyaları hakkında en son haberler ve blog yazıları.' : 'Latest news and blog posts about Burobig premium office furniture.'),
      companyName: 'Bürobig'
    });
  }, [activeLang]);

  useEffect(() => {
    import('./blogService').then(({ getPublishedBlogs }) => {
      getPublishedBlogs()
        .then(raw => {
          const localized = raw.map(b => ({
            ...b,
            title: resolveField(b, activeLang, 'title') || resolveField(b, activeLang, 'name') || '',
            summary: resolveField(b, activeLang, 'summary') || '',
            slug: resolveField(b, activeLang, 'slug') || b.slug || b.id,
          }));
          setBlogs(localized);
        })
        .catch(() => setBlogs([]))
        .finally(() => setLoading(false));
    });
  }, [activeLang]);

  if (loading) {
    return <div style={{ minHeight: '75vh' }} />;
  }

  return <BurobigBlogList blogs={blogs} formatDate={formatDate} getLocalizedPath={getLocalizedPath} />;
}

// ─── Product Page Wrapper (fetches products from Firebase) ───────────────────
function BurobigProductPage() {
  const { activeLang, tenantMapping } = useSite();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tenantId = tenantMapping?.tenantId;
    getActiveProducts(tenantId)
      .then(raw => {
        if (raw && raw.length > 0) setProducts(raw);
        else setProducts([]);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeLang, tenantMapping]);

  if (loading) {
    return <div style={{ minHeight: '75vh' }} />;
  }
  return <BurobigProductList products={products} />;
}

// ─── Product Detail Page Wrapper (fetches product by slug) ──────────────────
function BurobigProductDetailPage() {
  const params = useParams();
  let slug = params["*"] || params.slug || '';
  if (slug.endsWith('/')) {
    slug = slug.slice(0, -1);
  }
  const { tenantMapping, activeLang, setActivePageTranslations } = useSite();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveProductBySlug(tenantMapping.tenantId, slug, activeLang)
      .then((data) => setProduct(data || null))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug, activeLang, tenantMapping.tenantId]);

  useEffect(() => {
    if (product) {
      const prodTitle = resolveField(product, activeLang, 'title') || resolveField(product, activeLang, 'name') || '';
      const prodDesc = resolveField(product, activeLang, 'description') || '';
      
      const titleText = prodTitle 
        ? `${prodTitle} | Bürobig` 
        : (activeLang === 'tr' ? 'Bürobig Ürün Detay' : 'Burobig Product Detail');
      
      const descText = prodDesc 
        ? prodDesc 
        : (activeLang === 'tr' ? 'Bürobig premium ofis mobilyası ürün detayları.' : 'Burobig premium office furniture product details.');

      updateSEOMeta({
        title: titleText,
        description: descText,
        companyName: ''
      });

      // Set translation slugs for language switching
      const slugMap = {
        tr: resolveField(product, 'tr', 'slug') || product.slug || product.id,
        en: resolveField(product, 'en', 'slug') || product.slug || product.id,
        ar: resolveField(product, 'ar', 'slug') || product.slug || product.id,
      };
      setActivePageTranslations(slugMap);
    }
  }, [product, activeLang, setActivePageTranslations]);

  if (loading) {
    return <div style={{ minHeight: '75vh' }} />;
  }
  if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Ürün bulunamadı.</div>;

  return <BurobigProductDetail product={product} />;
}

const STATIC_CATALOG_METADATA = {
  categories: [
    {
      id: "masalar",
      name: "MASALAR",
      slug: "masalar",
      translations: {
        tr: { name: "MASALAR", slug: "masalar" },
        en: { name: "DESKS", slug: "desks" },
        ar: { name: "طاولات", slug: "desks" }
      }
    },
    {
      id: "ofis-koltuklari",
      name: "OFİS KOLTUKLARI",
      slug: "ofis-koltuklari",
      translations: {
        tr: { name: "OFİS KOLTUKLARI", slug: "ofis-koltuklari" },
        en: { name: "OFFICE CHAIRS", slug: "office-chairs" },
        ar: { name: "كراسي مكتب", slug: "office-chairs" }
      }
    },
    {
      id: "koltuklar-kanepeler",
      name: "KOLTUKLAR / KANEPELER",
      slug: "koltuklar-kanepeler",
      translations: {
        tr: { name: "KOLTUKLAR / KANEPELER", slug: "koltuklar-kanepeler" },
        en: { name: "ARMCHAIRS / SOFAS", slug: "armchairs-sofas" },
        ar: { name: "أرائك ومقاعد", slug: "armchairs-sofas" }
      }
    },
    {
      id: "depolama-sistemleri",
      name: "DEPOLAMA SİSTEMLERİ",
      slug: "depolama-sistemleri",
      translations: {
        tr: { name: "DEPOLAMA SİSTEMLERİ", slug: "depolama-sistemleri" },
        en: { name: "STORAGE SYSTEMS", slug: "storage-systems" },
        ar: { name: "أنظمة التخزين", slug: "storage-systems" }
      }
    },
    {
      id: "tamamlayicilar",
      name: "TAMAMLAYICILAR",
      slug: "tamamlayicilar",
      translations: {
        tr: { name: "TAMAMLAYICILAR", slug: "tamamlayicilar" },
        en: { name: "ACCESSORIES", slug: "accessories" },
        ar: { name: "إكسسوارات", slug: "accessories" }
      }
    }
  ],
  subcategories: [
    {
      categoryId: "masalar",
      name: "ÜST YÖNETİCİ",
      slug: "ust-yonetici",
      translations: {
        tr: { name: "ÜST YÖNETİCİ", slug: "ust-yonetici" },
        en: { name: "EXECUTIVE", slug: "executive" },
        ar: { name: "تنفيذي", slug: "executive" }
      }
    },
    {
      categoryId: "masalar",
      name: "YÖNETİCİ",
      slug: "yonetici",
      translations: {
        tr: { name: "YÖNETİCİ", slug: "yonetici" },
        en: { name: "MANAGER", slug: "manager" },
        ar: { name: "مدير", slug: "manager" }
      }
    },
    {
      categoryId: "masalar",
      name: "ÇALIŞMA",
      slug: "calisma",
      translations: {
        tr: { name: "ÇALIŞMA", slug: "calisma" },
        en: { name: "WORK", slug: "work" },
        ar: { name: "عمل", slug: "work" }
      }
    },
    {
      categoryId: "masalar",
      name: "OPERASYONEL",
      slug: "operasyonel",
      translations: {
        tr: { name: "OPERASYONEL", slug: "operasyonel" },
        en: { name: "OPERATIONAL", slug: "operational" },
        ar: { name: "تشغيلي", slug: "operational" }
      }
    },
    {
      categoryId: "masalar",
      name: "TOPLANTI",
      slug: "toplanti",
      translations: {
        tr: { name: "TOPLANTI", slug: "toplanti" },
        en: { name: "MEETING", slug: "meeting" },
        ar: { name: "اجتماعات", slug: "meeting" }
      }
    },
    {
      categoryId: "ofis-koltuklari",
      name: "YÖNETİCİ KOLTUKLARI",
      slug: "yonetici-koltuklari",
      translations: {
        tr: { name: "YÖNETİCİ KOLTUKLARI", slug: "yonetici-koltuklari" },
        en: { name: "EXECUTIVE CHAIRS", slug: "executive-chairs" },
        ar: { name: "كراسي مدير", slug: "executive-chairs" }
      }
    },
    {
      categoryId: "ofis-koltuklari",
      name: "ÇALIŞMA KOLTUKLARI",
      slug: "calisma-koltuklari",
      translations: {
        tr: { name: "ÇALIŞMA KOLTUKLARI", slug: "calisma-koltuklari" },
        en: { name: "TASK CHAIRS", slug: "task-chairs" },
        ar: { name: "كراسي عمل", slug: "task-chairs" }
      }
    },
    {
      categoryId: "ofis-koltuklari",
      name: "MİSAFİR VE BEKLEME KOLTUKLARI",
      slug: "misafir-ve-bekleme-koltuklari",
      translations: {
        tr: { name: "MİSAFİR VE BEKLEME KOLTUKLARI", slug: "misafir-ve-bekleme-koltuklari" },
        en: { name: "GUEST & WAITING CHAIRS", slug: "guest-waiting-chairs" },
        ar: { name: "كراسي ضيوف وانتظار", slug: "guest-waiting-chairs" }
      }
    },
    {
      categoryId: "koltuklar-kanepeler",
      name: "KOLTUKLAR",
      slug: "koltuklar",
      translations: {
        tr: { name: "KOLTUKLAR", slug: "koltuklar" },
        en: { name: "ARMCHAIRS", slug: "armchairs" },
        ar: { name: "مقاعد", slug: "armchairs" }
      }
    },
    {
      categoryId: "koltuklar-kanepeler",
      name: "KANEPELER",
      slug: "kanepeler",
      translations: {
        tr: { name: "KANEPELER", slug: "kanepeler" },
        en: { name: "SOFAS", slug: "sofas" },
        ar: { name: "أرائك", slug: "sofas" }
      }
    },
    {
      categoryId: "koltuklar-kanepeler",
      name: "SANDALYELER",
      slug: "sandalyeler",
      translations: {
        tr: { name: "SANDALYELER", slug: "sandalyeler" },
        en: { name: "CHAIRS", slug: "chairs" },
        ar: { name: "كراسي", slug: "chairs" }
      }
    },
    {
      categoryId: "koltuklar-kanepeler",
      name: "BEKLEME ALANLARI",
      slug: "bekleme-alanlari",
      translations: {
        tr: { name: "BEKLEME ALANLARI", slug: "bekleme-alanlari" },
        en: { name: "WAITING AREAS", slug: "waiting-areas" },
        ar: { name: "مناطق الانتظار", slug: "waiting-areas" }
      }
    },
    {
      categoryId: "depolama-sistemleri",
      name: "KESONLAR",
      slug: "kesonlar",
      translations: {
        tr: { name: "KESONLAR", slug: "kesonlar" },
        en: { name: "PEDESTALS", slug: "pedestals" },
        ar: { name: "أدراج", slug: "pedestals" }
      }
    },
    {
      categoryId: "depolama-sistemleri",
      name: "DOLAPLAR",
      slug: "dolaplar",
      translations: {
        tr: { name: "DOLAPLAR", slug: "dolaplar" },
        en: { name: "CABINETS", slug: "cabinets" },
        ar: { name: "خزائن", slug: "cabinets" }
      }
    },
    {
      categoryId: "depolama-sistemleri",
      name: "KİTAPLIK VE RAF SİSTEMLERİ",
      slug: "kitaplik-ve-raf-sistemleri",
      translations: {
        tr: { name: "KİTAPLIK VE RAF SİSTEMLERİ", slug: "kitaplik-ve-raf-sistemleri" },
        en: { name: "BOOKCASES & SHELVING", slug: "bookcases-shelving" },
        ar: { name: "خزائن كتب ورفوف", slug: "bookcases-shelving" }
      }
    },
    {
      categoryId: "tamamlayicilar",
      name: "SEHPALAR",
      slug: "sehpalar",
      translations: {
        tr: { name: "SEHPALAR", slug: "sehpalar" },
        en: { name: "COFFEE TABLES", slug: "coffee-tables" },
        ar: { name: "طاولات جانبية", slug: "coffee-tables" }
      }
    },
    {
      categoryId: "tamamlayicilar",
      name: "PUFLAR",
      slug: "puflar",
      translations: {
        tr: { name: "PUFLAR", slug: "puflar" },
        en: { name: "POUFS", slug: "poufs" },
        ar: { name: "مقاعد صغيرة", slug: "poufs" }
      }
    },
    {
      categoryId: "tamamlayicilar",
      name: "ASKILIKLAR",
      slug: "askiliklar",
      translations: {
        tr: { name: "ASKILIKLAR", slug: "askiliklar" },
        en: { name: "COAT HANGERS", slug: "coat-hangers" },
        ar: { name: "علاقات", slug: "coat-hangers" }
      }
    },
    {
      categoryId: "tamamlayicilar",
      name: "ELEKTRİFİKASYON",
      slug: "elektrifikasyon",
      translations: {
        tr: { name: "ELEKTRİFİKASYON", slug: "elektrifikasyon" },
        en: { name: "ELECTRIFICATION", slug: "electrification" },
        ar: { name: "كهربة", slug: "electrification" }
      }
    }
  ]
};

const LEGACY_SLUG_MAP = {
  'ust-yonetici-masalari': { name: 'ÜST YÖNETİCİ', isSubcategory: true, catSlug: 'masalar', subcatSlug: 'ust-yonetici' },
  'yonetici-masalari': { name: 'YÖNETİCİ', isSubcategory: true, catSlug: 'masalar', subcatSlug: 'yonetici' },
  'calisma-masalari': { name: 'ÇALIŞMA', isSubcategory: true, catSlug: 'masalar', subcatSlug: 'calisma' },
  'operasyonel-masalar': { name: 'OPERASYONEL', isSubcategory: true, catSlug: 'masalar', subcatSlug: 'operasyonel' },
  'toplanti-masalari': { name: 'TOPLANTI', isSubcategory: true, catSlug: 'masalar', subcatSlug: 'toplanti' },
  'yonetici-koltuklari': { name: 'YÖNETİCİ KOLTUKLARI', isSubcategory: true, catSlug: 'ofis-koltuklari', subcatSlug: 'yonetici-koltuklari' },
  'calisma-koltuklari': { name: 'ÇALIŞMA KOLTUKLARI', isSubcategory: true, catSlug: 'ofis-koltuklari', subcatSlug: 'calisma-koltuklari' },
  'misafir-ve-bekleme-koltuklari': { name: 'MİSAFİR VE BEKLEME KOLTUKLARI', isSubcategory: true, catSlug: 'ofis-koltuklari', subcatSlug: 'misafir-ve-bekleme-koltuklari' },
  'kitaplik-ve-raf-sistemleri': { name: 'KİTAPLIK VE RAF SİSTEMLERİ', isSubcategory: true, catSlug: 'depolama-sistemleri', subcatSlug: 'kitaplik-raf' },
  'bekleme-alanlari': { name: 'BEKLEME ALANLARI', isSubcategory: true, catSlug: 'koltuklar-kanepeler', subcatSlug: 'bekleme-alanlari' }
};

function DynamicCategoryPage() {
  const { categorySlug } = useParams();
  const { tenantMapping, activeLang, setActivePageTranslations } = useSite();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedCategory, setMatchedCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setMatchedCategory(null);
      setParentCategory(null);
      try {
        let catalogMeta = null;
        try {
          catalogMeta = await getCatalogMetadata(tenantMapping.tenantId);
        } catch (e) {
          console.warn('getCatalogMetadata failed, trying company settings fallback:', e);
          try {
            const companySettings = await getCompanySettings(tenantMapping.tenantId);
            if (companySettings?.catalogMetadata) {
              catalogMeta = companySettings.catalogMetadata;
            }
          } catch (compErr) {
            console.warn('Company settings fallback failed:', compErr);
          }
        }

        const categories = catalogMeta?.categories || STATIC_CATALOG_METADATA.categories;
        const subcategories = catalogMeta?.subcategories || STATIC_CATALOG_METADATA.subcategories;
        const allCategories = [...categories, ...subcategories];

        let matched = null;
        let parent = null;

        if (LEGACY_SLUG_MAP[categorySlug]) {
          const legacy = LEGACY_SLUG_MAP[categorySlug];
          matched = allCategories.find(c => c.name === legacy.name);
        }

        if (!matched) {
          matched = allCategories.find(c => {
            if (c.translations?.[activeLang]?.slug === categorySlug) return true;
            if (c.slug === categorySlug) return true;
            for (const lang of ['tr', 'en', 'ar']) {
              if (c.translations?.[lang]?.slug === categorySlug) return true;
            }
            return false;
          });
        }

        if (matched) {
          setMatchedCategory(matched);
          if (matched.categoryId) {
            parent = categories.find(c => c.id === matched.categoryId);
            setParentCategory(parent);
          }

          const slugMap = {
            tr: matched.translations?.tr?.slug || matched.slug,
            en: matched.translations?.en?.slug || matched.slug,
            ar: matched.translations?.ar?.slug || matched.slug
          };
          setActivePageTranslations(slugMap);

          const allProducts = await getActiveProducts(tenantMapping.tenantId);
          
          // Filtreleme: Orijinal (çevrilmemiş) category/subcategory ile eşleştir
          const filtered = allProducts.filter(p => 
            p.category === matched.name || p.subcategory === matched.name
          );
          
          // Görüntüleme: Çevrilen alanları ekle
          const localized = filtered.map(p => ({
            ...p,
            title: resolveField(p, activeLang, 'title') || resolveField(p, activeLang, 'name') || '',
            summary: resolveField(p, activeLang, 'summary') || '',
          }));
          setProducts(localized);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Category load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [categorySlug, activeLang, tenantMapping.tenantId, setActivePageTranslations]);

  if (loading) return <div style={{ minHeight: '75vh' }} />;
  if (!matchedCategory) return <BurobigNotFound />;

  const categoryOverride = parentCategory ? parentCategory.slug : matchedCategory.slug;
  const subcategoryOverride = parentCategory ? matchedCategory.slug : null;

  return (
    <BurobigProductList 
      products={products} 
      category={categoryOverride} 
      subcategory={subcategoryOverride} 
    />
  );
}

function BurobigLangWrapper() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const enabledLangs = ['tr', 'en', 'ar'];

  useEffect(() => {
    if (!enabledLangs.includes(lang)) {
      navigate('/tr', { replace: true });
    }
  }, [lang, navigate]);

  if (!enabledLangs.includes(lang)) return null;

  return (
    <SiteLayout activeLang={lang}>
      <Suspense fallback={<div style={{ minHeight: '75vh' }} />}>
        <Outlet />
      </Suspense>
    </SiteLayout>
  );
}

// ─── Contact Page (self-contained state) ─────────────────────────────────────
function BurobigContactPage() {
  const { activeLang, settings } = useSite();
  const translate = (tr, en) => (activeLang === 'tr' ? tr : en);

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LdUHg0tAAAAADUPLdrFQSEnyjWs6DbHXtjnROuK';

  useEffect(() => {
    loadRecaptchaScript(siteKey);
  }, [siteKey]);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '', website_dummy: ''
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Honeypot check: Fail silently/open if dummy field is filled
    if (formData.website_dummy) {
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 400);
      return;
    }

    // Validations
    if (!formData.name || !formData.name.trim()) {
      setError(translate('Lütfen adınızı ve soyadınızı girin.', 'Please enter your name.'));
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setError(translate('Lütfen geçerli bir e-posta adresi girin.', 'Please enter a valid email address.'));
      setLoading(false);
      return;
    }
    const phoneDigits = formData.phone ? formData.phone.replace(/\D/g, '') : '';
    if (!formData.phone || phoneDigits.length < 10) {
      setError(translate('Lütfen en az 10 haneli geçerli bir telefon numarası girin.', 'Please enter a valid phone number with at least 10 digits.'));
      setLoading(false);
      return;
    }
    if (!formData.subject || !formData.subject.trim()) {
      setError(translate('Lütfen mesaj konusunu girin.', 'Please enter the message subject.'));
      setLoading(false);
      return;
    }
    if (!formData.message || !formData.message.trim()) {
      setError(translate('Lütfen mesajınızı girin.', 'Please enter your message.'));
      setLoading(false);
      return;
    }
    if (!consentAccepted) {
      setError(translate('Lütfen KVKK onay metnini kabul edin.', 'Please accept the KVKK consent.'));
      setLoading(false);
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
        type: 'contact',
        formType: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        consentAccepted: consentAccepted,
        website_dummy: formData.website_dummy,
        pageUrl: window.location.href,
        createdAt: new Date().toISOString(),
        status: 'new',
        recaptchaToken
      };

      await submitLead(payload);
      setSuccess(true);
    } catch (err) {
      setError(err.message || translate(
        'Bir hata oluştu, lütfen tekrar deneyin.',
        'An error occurred, please try again.'
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <BurobigContact
      formData={formData}
      consentAccepted={consentAccepted}
      setConsentAccepted={setConsentAccepted}
      loading={loading}
      success={success}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      settings={settings}
    />
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const hostname = window.location.hostname;
  const langPath = '/:lang';
  const defaultRedirect = '/tr';

  return (
    <BrowserRouter>
      <Routes>
        <Route path={langPath} element={<BurobigLangWrapper />}>
          <Route index element={<BurobigHome />} />
          <Route path="blog" element={<BurobigBlogPage />} />
          <Route path="blog/:slug" element={<BurobigBlogDetail />} />

          {/* Products & Details */}
          <Route path="urunler" element={<BurobigProductPage />} />
          <Route path="urunler/*" element={<BurobigProductDetailPage />} />
          <Route path="products" element={<BurobigProductPage />} />
          <Route path="products/*" element={<BurobigProductDetailPage />} />

          {/* Corporate Static Pages */}
          <Route path="tasarimcilar" element={<BurobigDesigners />} />
          <Route path="designers" element={<BurobigDesigners />} />
          <Route path="hikayemiz" element={<BurobigHistory />} />
          <Route path="our-story" element={<BurobigHistory />} />
          <Route path="tasarim-sureci" element={<BurobigDesignProcess />} />
          <Route path="design-process" element={<BurobigDesignProcess />} />
          <Route path="tasarim-felsefesi" element={<BurobigDesignPhilosophy />} />
          <Route path="design-philosophy" element={<BurobigDesignPhilosophy />} />
          <Route path="manifesto" element={<BurobigManifesto />} />
          <Route path="kalite-politikamiz" element={<BurobigQualityPolicy />} />
          <Route path="quality-policy" element={<BurobigQualityPolicy />} />
          <Route path="surdurulebilirlik" element={<BurobigSustainability />} />
          <Route path="sustainability" element={<BurobigSustainability />} />
          <Route path="iletisim" element={<BurobigContactPage />} />
          <Route path="contact" element={<BurobigContactPage />} />

          {/* Dynamic Categories Catch-All */}
          <Route path=":categorySlug" element={<DynamicCategoryPage />} />

          {/* Legal Pages Catch-All */}
          <Route path=":slug" element={<BurobigLegalDetail />} />

          <Route path="*" element={<BurobigNotFound />} />
        </Route>
        <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
