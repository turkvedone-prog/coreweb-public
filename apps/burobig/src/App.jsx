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

// ─── Blog Page Wrapper (provides required props to BurobigBlogList) ──────────
function BurobigBlogPage() {
  const { activeLang } = useSite();
  const getLocalizedPath = (path) => `/${activeLang}${path}`;
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString(activeLang === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return dateStr; }
  };
  // Blog içeriği gelene kadar boş liste — sayfa çökmez
  return <BurobigBlogList blogs={[]} formatDate={formatDate} getLocalizedPath={getLocalizedPath} />;
}

// ─── Language Wrapper (Outlet pattern) ───────────────────────────────────────
function BurobigLangWrapper() {
  const { lang } = useParams();
  const navigate = useNavigate();

  const hostname = window.location.hostname;
  const isLocalOrPortal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.vercel.app');

  const enabledLangs = ['tr', 'en'];

  useEffect(() => {
    if (!enabledLangs.includes(lang)) {
      navigate(isLocalOrPortal ? '/burobig/tr' : '/tr', { replace: true });
    }
  }, [lang, isLocalOrPortal, navigate]);

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
  const isLocalOrPortal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.vercel.app');

  const langPath = isLocalOrPortal ? '/burobig/:lang' : '/:lang';
  const defaultRedirect = isLocalOrPortal ? '/burobig/tr' : '/tr';

  return (
    <BrowserRouter>
      <Routes>
        <Route path={langPath} element={<BurobigLangWrapper />}>
          <Route index element={<BurobigHome />} />
          <Route path="blog" element={<BurobigBlogPage />} />
          <Route path="urunler" element={<BurobigProductList />} />
          <Route path="urunler/:slug" element={<BurobigProductDetail />} />
          <Route path="ust-yonetici" element={<BurobigProductList />} />
          <Route path="ofis-koltuklari" element={<BurobigProductList />} />
          <Route path="operasyonel-masalar" element={<BurobigProductList />} />
          <Route path="toplanti-masalari" element={<BurobigProductList />} />
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
