import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';

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

// Wrapper: BurobigContact is a presentational component that needs props injected
function BurobigContactPage() {
  const { activeLang } = useSite();
  const translate = (tr, en) => activeLang === 'tr' ? tr : en;

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: ''
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
    } catch {
      setError(translate('Bir hata oluştu, lütfen tekrar deneyin.', 'An error occurred, please try again.'));
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



function BurobigRouteResolver() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [resolvedLang, setResolvedLang] = useState(null);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langIndex = isLocalOrPortal ? 1 : 0;
    const urlLang = pathSegments[langIndex];
    const enabledLangs = ['tr', 'en'];
    const defaultLang = 'tr';

    if (urlLang && enabledLangs.includes(urlLang)) {
      setResolvedLang(urlLang);
    } else {
      // Redirect to default language
      const newSegments = [...pathSegments];
      if (urlLang && !enabledLangs.includes(urlLang)) {
        newSegments[langIndex] = defaultLang;
      } else if (!urlLang || (isLocalOrPortal && newSegments.length < 2)) {
        if (isLocalOrPortal) {
          newSegments[0] = 'burobig';
          newSegments[1] = defaultLang;
        } else {
          newSegments[0] = defaultLang;
        }
      }
      const redirectPath = '/' + newSegments.join('/');
      navigate(redirectPath, { replace: true });
    }
  }, [params.lang, location.pathname, isLocalOrPortal, navigate]);

  if (!resolvedLang) {
    return null;
  }

  return (
    <SiteLayout activeLang={resolvedLang}>
      <Routes>
        <Route path="/" element={<BurobigHome />} />
        <Route path="/blog" element={<BurobigBlogList />} />
        <Route path="/urunler" element={<BurobigProductList />} />
        <Route path="/urunler/:slug" element={<BurobigProductDetail />} />
        <Route path="/ust-yonetici" element={<BurobigProductList />} />
        <Route path="/ofis-koltuklari" element={<BurobigProductList />} />
        <Route path="/operasyonel-masalar" element={<BurobigProductList />} />
        <Route path="/toplanti-masalari" element={<BurobigProductList />} />
        <Route path="/tasarimcilar" element={<BurobigDesigners />} />
        <Route path="/hikayemiz" element={<BurobigHistory />} />
        <Route path="/tasarim-sureci" element={<BurobigDesignProcess />} />
        <Route path="/tasarim-felsefesi" element={<BurobigDesignPhilosophy />} />
        <Route path="/manifesto" element={<BurobigManifesto />} />
        <Route path="/kalite-politikamiz" element={<BurobigQualityPolicy />} />
        <Route path="/surdurulebilirlik" element={<BurobigSustainability />} />
        <Route path="/iletisim" element={<BurobigContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default function App() {
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  return (
    <BrowserRouter>
      <Routes>
        {isLocalOrPortal ? (
          <>
            <Route path="/burobig/:lang/*" element={<BurobigRouteResolver />} />
            <Route path="/burobig/*" element={<BurobigRouteResolver />} />
            <Route path="*" element={<Navigate to="/burobig/tr" replace />} />
          </>
        ) : (
          <>
            <Route path="/:lang/*" element={<BurobigRouteResolver />} />
            <Route path="*" element={<BurobigRouteResolver />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
