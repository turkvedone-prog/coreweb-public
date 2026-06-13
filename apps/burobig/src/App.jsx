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
          // Dil içeriğini lokalize et (tr_content / en_content desteği)
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
function BurobigProductPage() {
  const { activeLang } = useSite();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('./productService').then(({ getActiveProducts }) => {
      getActiveProducts()
        .then(raw => {
          // Dil lokalizasyonu
          const localized = raw.map(p => ({
            ...p,
            name: (activeLang === 'tr' ? p.name_tr : p.name_en) || p.name || '',
            description: (activeLang === 'tr' ? p.description_tr : p.description_en) || p.description || '',
          }));
          setProducts(localized);
        })
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    });
  }, [activeLang]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Yükleniyor...</div>;
  return <BurobigProductList products={products} />;
}

// ─── Language Wrapper (Outlet pattern) ───────────────────────────────────────
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
          <Route path="urunler/:slug" element={<BurobigProductDetail />} />
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
