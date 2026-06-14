import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import { useSite } from './layouts/SiteLayout';
import ViolaHome from './ViolaHome.jsx';
import ViolaProductDetail from './ViolaProductDetail.jsx';
import { getActiveProductBySlug } from '@coreweb/shared-ui';

// Fallback demo product if Firestore reads fail
const betaProduct = {
  slug: 'beta-koltuk',
  title: 'Beta Koleksiyonu',
  category: 'Yönetici Serisi',
  description: 'Ergonomik yapısı ve premium malzemeleriyle öne çıkan Beta, modern ofis ortamlarına uygun yönetici koltuk serisidir.',
  gallery: [
    { url: '/assets/viola/images/beta_main.png' },
    { url: '/assets/viola/images/beta_carousel_1.png' },
    { url: '/assets/viola/images/beta_carousel_2.png' },
  ],
};

function ViolaProductDetailPage() {
  const { slug } = useParams();
  const { tenantMapping, activeLang } = useSite();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tenantId = tenantMapping?.tenantId || 'TEN-VIOLA';
    getActiveProductBySlug(tenantId, slug, activeLang)
      .then((data) => {
        setProduct(data || betaProduct);
      })
      .catch(() => {
        setProduct(betaProduct);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, activeLang, tenantMapping]);

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Yükleniyor...</div>;
  }
  if (!product) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Ürün bulunamadı.</div>;
  }

  return <ViolaProductDetail product={product} />;
}

function ViolaLangWrapper() {
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
      <a href="/" style={{ color: '#6c63ff' }}>Ana Sayfaya Dön</a>
    </div>
  );
}

export default function App() {
  return (
    <div className="viola-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/:lang" element={<ViolaLangWrapper />}>
            <Route index element={<ViolaHome />} />
            <Route path="urunler/:slug" element={<ViolaProductDetailPage />} />
            <Route path="*" element={<Navigate to="/tr" replace />} />
          </Route>
          {/* Legacy or prefix-less redirects */}
          <Route path="/" element={<Navigate to="/tr" replace />} />
          <Route path="/urunler/:slug" element={<Navigate to="/tr" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
