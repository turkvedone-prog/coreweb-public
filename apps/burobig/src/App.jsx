import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Outlet,
  useParams, useNavigate, Navigate
} from 'react-router-dom';

import SiteLayout from './layouts/SiteLayout';
import { useSite } from './layouts/SiteLayout';
import BurobigHome from './BurobigHome';
import BurobigBlogList from './BurobigBlogList';
import BurobigProductList from './BurobigProductList';
import BurobigProductDetail from './BurobigProductDetail';
import BurobigContact from './BurobigContact';
import BurobigDesigners from './BurobigDesigners';
import BurobigHistory from './BurobigHistory';
import BurobigDesignProcess from './BurobigDesignProcess';
import BurobigDesignPhilosophy from './BurobigDesignPhilosophy';
import BurobigManifesto from './BurobigManifesto';
import BurobigQualityPolicy from './BurobigQualityPolicy';
import BurobigSustainability from './BurobigSustainability';
import { getActiveProducts, getActiveProductBySlug } from '../../services/publicContentService';

// Demo ürün — Firebase'den veri gelmezse gösterilir
const DEMO_PRODUCT = {
  slug: 'inka',
  title: 'Inka Yönetici Masaı',
  category: 'Üst Yönetici Masaı',
  coverImageUrl: '/assets/burobig/images/inka_main.png',
  gallery: [
    { url: '/assets/burobig/images/inka_main.png' },
    { url: '/assets/burobig/images/inka_detail_1.png' },
  ],
  description_tr: 'Doğadan ilham alan yenilikçi çizgilerle, geleçeğin premium ofis orta mına uygun Inka yönetici masaı.',
  description_en: 'Inka executive desk, inspired by nature with innovative lines.',
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
    import('./blogService').then(({ getPublishedBlogs }) => {
      getPublishedBlogs()
        .then(raw => {
          const localized = raw.map(b => ({
            ...b,
            title: (activeLang === 'tr' ? b.title_tr : b.title_en) || b.title || '',
            summary: (activeLang === 'tr' ? b.summary_tr : b.summary_en) || b.summary || '',
          }));
          setBlogs(localized);
        })
        .catch(() => setBlogs([]))
        .finally(() => setLoading(false));
    });
  }, [activeLang]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Yükleniyor...</div>;

  return <BurobigBlogList blogs={blogs} formatDate={formatDate} getLocalizedPath={getLocalizedPath} />;
}

// ─── Product Page Wrapper (fetches products from Firebase) ───────────────────
const DEMO_PRODUCTS = [
  { slug: 'inka',          title: 'Inka Yönetici Masası',  category: 'Üst Yönetici Masası', coverImageUrl: '/assets/burobig/images/inka_main.png' },
  { slug: 'nero',          title: 'Nero Yönetici Masası',  category: 'Üst Yönetici Masası', coverImageUrl: '/assets/burobig/images/inka_main.png' },
  { slug: 'atlas-calisma', title: 'Atlas Çalışma Masası',  category: 'Operasyonel Masa',    coverImageUrl: '/assets/burobig/images/inka_main.png' },
  { slug: 'luna-toplanti', title: 'Luna Toplantı Masası',  category: 'Toplantı Masası',     coverImageUrl: '/assets/burobig/images/inka_main.png' },
  { slug: 'forma-koltuk',  title: 'Forma Ofis Koltuğu',    category: 'Ofis Koltuğu',        coverImageUrl: '/assets/burobig/images/inka_main.png' },
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

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Yükleniyor...</div>;
  return <BurobigProductList products={products} />;
}

// ─── Product Detail Page Wrapper (fetches product by slug) ──────────────────
function BurobigProductDetailPage() {
  const { slug } = useParams();
  const { tenantMapping, activeLang } = useSite();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveProductBySlug(tenantMapping.tenantId, slug, activeLang)
      .then((data) => setProduct(data || DEMO_PRODUCT))
      .catch(() => setProduct(DEMO_PRODUCT))
      .finally(() => setLoading(false));
  }, [slug, activeLang, tenantMapping.tenantId]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Yükleniyor...</div>;
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
      <Outlet />
    </SiteLayout>
  );
}

// ─── Contact Page (self-contained state) ─────────────────────────────────────
function BurobigContactPage() {
  const { activeLang } = useSite();
  const translate = (tr, en) => (activeLang === 'tr' ? tr : en);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: ''
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSuccess(true);
    } catch {
      setError(
        translate(
          'Bir hata oluştu, lütfen tekrar deneyin.',
          'An error occurred, please try again.'
        )
      );
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
          <Route path="urunler" element={<BurobigProductPage />} />
          <Route path="urunler/:slug" element={<BurobigProductDetailPage />} />
          <Route path="ust-yonetici" element={<BurobigProductPage />} />
          <Route path="ofis-koltuklari" element={<BurobigProductPage />} />
          <Route path="operasyonel-masalar" element={<BurobigProductPage />} />
          <Route path="toplanti-masalari" element={<BurobigProductPage />} />
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
