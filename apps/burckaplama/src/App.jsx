import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import BurcKaplamaHome from './BurcKaplamaHome.jsx';

function BurcKaplamaLangWrapper() {
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

function NotFound() {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Sayfa Bulunamadı</h2>
      <a href="/" style={{ color: '#8B6914' }}>Ana Sayfaya Dön</a>
    </div>
  );
}

export default function App() {
  return (
    <div className="burckaplama-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/:lang" element={<BurcKaplamaLangWrapper />}>
            <Route index element={<BurcKaplamaHome />} />
            <Route path="*" element={<Navigate to="/tr" replace />} />
          </Route>
          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/tr" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
