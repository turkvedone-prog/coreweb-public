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

import { getActiveProducts, getActiveProductBySlug } from '../../services/publicContentService';
import { submitLead, resolveField } from '@coreweb/shared-ui';
import { updateSEOMeta } from '../../utils/seo';

// Demo ürün — Firebase'den veri gelmezse gösterilir
const DEMO_PRODUCT = {
  slug: 'inka',
  title: 'Inka Yönetici Masası',
  category: 'Üst Yönetici Masası',
  coverImageUrl: '/assets/burobig/images/INKA 01.jpg',
  gallery: [
    { url: '/assets/burobig/images/INKA 01.jpg' },
    { url: '/assets/burobig/images/INKA 02.jpg' },
  ],
  defaultLanguage: 'tr',
  translations: {
    tr: {
      name: 'Inka Yönetici Masası',
      description: 'Doğadan ilham alan yenilikçi çizgilerle, geleceğin premium ofis ortamına uygun Inka yönetici masası.',
    },
    en: {
      name: 'Inka Executive Desk',
      description: 'Inka executive desk, inspired by nature with innovative lines.',
    }
  }
};



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
      return new Date(ts).toLocaleDateString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return ''; }
  };

  useEffect(() => {
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Blog & Haberler' : 'Blog & News',
      description: activeLang === 'tr' ? 'Bürobig premium ofis mobilyaları hakkında en son haberler ve blog yazıları.' : 'Latest news and blog posts about Burobig premium office furniture.',
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
const DEMO_PRODUCTS = [
  { slug: 'inka',          title: 'Inka Yönetici Masası',  category: 'Üst Yönetici Masası', coverImageUrl: '/assets/burobig/images/INKA 01.jpg' },
  { slug: 'nero',          title: 'Nero Yönetici Masası',  category: 'Üst Yönetici Masası', coverImageUrl: '/assets/burobig/images/INKA 02.jpg' },
  { slug: 'atlas-calisma', title: 'Atlas Çalışma Masası',  category: 'Operasyonel Masa',    coverImageUrl: '/assets/burobig/images/product-vetra.png' },
  { slug: 'luna-toplanti', title: 'Luna Toplantı Masası',  category: 'Toplantı Masası',     coverImageUrl: '/assets/burobig/images/product-elephant.png' },
  { slug: 'forma-koltuk',  title: 'Forma Ofis Koltuğu',    category: 'Ofis Koltuğu',        coverImageUrl: '/assets/burobig/images/product-forma.png' },
];

function BurobigProductPage() {
  const { activeLang, tenantMapping } = useSite();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tenantId = tenantMapping?.tenantId;
    getActiveProducts(tenantId)
      .then(raw => {
        if (raw && raw.length > 0) setProducts(raw);
        else setProducts(DEMO_PRODUCTS);
      })
      .catch(() => setProducts(DEMO_PRODUCTS))
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
  const { tenantMapping, activeLang } = useSite();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveProductBySlug(tenantMapping.tenantId, slug, activeLang)
      .then((data) => setProduct(data || DEMO_PRODUCT))
      .catch(() => setProduct(DEMO_PRODUCT))
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
    }
  }, [product, activeLang]);

  if (loading) {
    return <div style={{ minHeight: '75vh' }} />;
  }
  if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Ürün bulunamadı.</div>;

  return <BurobigProductDetail product={product} />;
}

function BurobigLangWrapper() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const enabledLangs = ['tr', 'en'];

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
        status: 'new'
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
          <Route path="ust-yonetici" element={<BurobigProductPage />} />
          <Route path="yonetici" element={<BurobigProductPage />} />
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
          <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
        </Route>
        <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
