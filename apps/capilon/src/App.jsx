import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Outlet,
  useParams, useNavigate, Navigate
} from 'react-router-dom';

import SiteLayout from './layouts/SiteLayout';
import { useSite } from './layouts/SiteLayout';
import CapilonHome from './CapilonHome';
import CapilonBlogList from './CapilonBlogList';
import CapilonBlogDetail from './CapilonBlogDetail';
import CapilonCollectionsPage from './CapilonCollectionsPage';
import CapilonContact from './CapilonContact';
import CapilonHistory from './CapilonHistory';
import CapilonProductDetail from './CapilonProductDetail';
import CapilonStores from './CapilonStores';
import CapilonCategoryDetail from './CapilonCategoryDetail';

// ─── Language Wrapper (Outlet pattern) ───────────────────────────────────────
// Validates :lang param and renders SiteLayout + child routes via <Outlet />
function CapilonLangWrapper() {
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
function CapilonContactPage() {
  const { activeLang } = useSite();
  const translate = (tr, en) => (activeLang === 'tr' ? tr : en);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', subject: ''
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
    <CapilonContact
      formData={formData}
      consentAccepted={consentAccepted}
      setConsentAccepted={setConsentAccepted}
      loading={loading}
      success={success}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      translate={translate}
    />
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const hostname = window.location.hostname;
  // Her ortamda /:lang kullan (local = production ile aynı)
  const langPath = '/:lang';
  const defaultRedirect = '/tr';

  return (
    <BrowserRouter>
      <Routes>
        {/* Language-aware layout route */}
        <Route path={langPath} element={<CapilonLangWrapper />}>
          <Route index element={<CapilonHome />} />
          <Route path="blog" element={<CapilonBlogList />} />
          <Route path="blog/:slug" element={<CapilonBlogDetail />} />
          <Route path="koleksiyonlar" element={<CapilonCollectionsPage />} />
          <Route path="koleksiyonlar/:slug" element={<CapilonCategoryDetail />} />
          <Route path="urunler/:slug" element={<CapilonProductDetail />} />
          <Route path="magazalarimiz" element={<CapilonStores />} />
          <Route path="iletisim" element={<CapilonContactPage />} />
          <Route path="hikayemiz" element={<CapilonHistory />} />
          <Route path="kategori/:slug" element={<CapilonCategoryDetail />} />
          <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
        </Route>

        {/* Catch-all → default lang home */}
        <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
