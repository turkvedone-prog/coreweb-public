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
import { submitLead, resolveField, loadRecaptchaScript, executeRecaptcha } from '@coreweb/shared-ui';
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
          <Route path="urunler" element={<BurobigProductPage />} />
          <Route path="urunler/*" element={<BurobigProductDetailPage />} />
          <Route path="ust-yonetici-masalari" element={<BurobigProductPage />} />
          <Route path="yonetici-masalari" element={<BurobigProductPage />} />
          <Route path="calisma-masalari" element={<BurobigProductPage />} />
          <Route path="calisma" element={<BurobigProductPage />} />
          <Route path="ofis-koltuklari" element={<BurobigProductPage />} />
          <Route path="operasyonel-masalar" element={<BurobigProductPage />} />
          <Route path="toplanti-masalari" element={<BurobigProductPage />} />
          <Route path="yonetici-koltuklari" element={<BurobigProductPage />} />
          <Route path="calisma-koltuklari" element={<BurobigProductPage />} />
          <Route path="misafir-ve-bekleme-koltuklari" element={<BurobigProductPage />} />
          <Route path="koltuklar" element={<BurobigProductPage />} />
          <Route path="kanepeler" element={<BurobigProductPage />} />
          <Route path="sandalyeler" element={<BurobigProductPage />} />
          <Route path="bekleme-alanlari" element={<BurobigProductPage />} />
          <Route path="koltuklar-kanepeler" element={<BurobigProductPage />} />
          <Route path="kesonlar" element={<BurobigProductPage />} />
          <Route path="dolaplar" element={<BurobigProductPage />} />
          <Route path="kitaplik-ve-raf-sistemleri" element={<BurobigProductPage />} />
          <Route path="depolama-sistemleri" element={<BurobigProductPage />} />
          <Route path="sehpalar" element={<BurobigProductPage />} />
          <Route path="puflar" element={<BurobigProductPage />} />
          <Route path="askiliklar" element={<BurobigProductPage />} />
          <Route path="elektrifikasyon" element={<BurobigProductPage />} />
          <Route path="tamamlayicilar" element={<BurobigProductPage />} />
          <Route path="tasarimcilar" element={<BurobigDesigners />} />
          <Route path="hikayemiz" element={<BurobigHistory />} />
          <Route path="tasarim-sureci" element={<BurobigDesignProcess />} />
          <Route path="tasarim-felsefesi" element={<BurobigDesignPhilosophy />} />
          <Route path="manifesto" element={<BurobigManifesto />} />
          <Route path="kalite-politikamiz" element={<BurobigQualityPolicy />} />
          <Route path="surdurulebilirlik" element={<BurobigSustainability />} />
          <Route path="iletisim" element={<BurobigContactPage />} />
          <Route path=":slug" element={<BurobigLegalDetail />} />
          <Route path="*" element={<BurobigNotFound />} />
        </Route>
        <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
