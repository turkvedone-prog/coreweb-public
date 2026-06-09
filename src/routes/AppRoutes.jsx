import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { detectAndResolveTenant } from '../utils/tenantResolver';
import SiteLayout from '../layouts/SiteLayout';
import Home from '../pages/Home';
import BlogList from '../pages/BlogList';
import BlogDetail from '../pages/BlogDetail';
import NewsList from '../pages/NewsList';
import NewsDetail from '../pages/NewsDetail';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Contact from '../pages/Contact';
import CollectionsPage from '../pages/CollectionsPage';
import Designers from '../pages/Designers';
import History from '../pages/History';
import DesignProcess from '../pages/DesignProcess';
import Manifesto from '../pages/Manifesto';
import QualityPolicy from '../pages/QualityPolicy';
import Sustainability from '../pages/Sustainability';
import DesignPhilosophy from '../pages/DesignPhilosophy';
import NotFoundSite from '../components/NotFoundSite';
import BurcKaplamaHome from '../themes/burckaplama/BurcKaplamaHome';

function RouteResolver() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tenantMapping, setTenantMapping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolvedLang, setResolvedLang] = useState(null);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  useEffect(() => {
    let slug = null;
    if (isLocalOrPortal) {
      slug = params.tenantSlug;
    }

    const resolve = async () => {
      setLoading(true);
      try {
        const mapping = await detectAndResolveTenant(slug);
        setTenantMapping(mapping);

        if (mapping) {
          const pathSegments = location.pathname.split('/').filter(Boolean);
          // If local/demo: path is /:tenantSlug/:lang/... (lang is segment index 1)
          // If production/subdomain: path is /:lang/... (lang is segment index 0)
          const langIndex = isLocalOrPortal ? 1 : 0;
          const urlLang = pathSegments[langIndex];

          const enabledLangs = mapping.enabledLanguages || ['tr'];
          const defaultLang = mapping.defaultLanguage || 'tr';

          const isOfficialDomain = hostname === 'www.coreweb.tr' || hostname === 'coreweb.tr';
          const isCoreWeb = mapping.tenantSlug === 'coreweb' || mapping.tenantId === 'TEN-507';

          if (isCoreWeb && isOfficialDomain) {
            // Clean URL behavior for CoreWeb official domain in production
            const isExactTr = pathSegments.length === 1 && pathSegments[0] === 'tr';
            if (isExactTr) {
              // Redirect www.coreweb.tr/tr -> www.coreweb.tr
              navigate('/', { replace: true });
            } else {
              // Serve tr directly on root path / or other paths without language segment prefix
              setResolvedLang(defaultLang);
            }
          } else {
            // Original logic for other tenants or preview CoreWeb environments
            if (urlLang && enabledLangs.includes(urlLang)) {
              setResolvedLang(urlLang);
            } else {
              // Redirect to default language
              const newSegments = [...pathSegments];
              if (urlLang && !enabledLangs.includes(urlLang)) {
                newSegments[langIndex] = defaultLang;
              } else if (!urlLang || (isLocalOrPortal && newSegments.length < 2)) {
                if (isLocalOrPortal) {
                  // Ensure slug is first, then lang
                  newSegments[0] = params.tenantSlug;
                  newSegments[1] = defaultLang;
                } else {
                  newSegments[0] = defaultLang;
                }
              }
              const redirectPath = '/' + newSegments.join('/');
              navigate(redirectPath, { replace: true });
            }
          }
        }
      } catch (err) {
        console.error('Resolution failed:', err);
      } finally {
        setLoading(false);
      }
    };

    resolve();
  }, [params.tenantSlug, location.pathname, hostname, isLocalOrPortal, navigate]);

  if (loading) {
    return null;
  }

  if (!tenantMapping) {
    return <NotFoundSite reason="Web sitesi bulunamadı veya pasif durumda." />;
  }

  if (!resolvedLang) {
    return null;
  }

  const isCapilon = tenantMapping?.tenantSlug === 'capilon' || tenantMapping?.tenantId === 'TEN-CAPILON';
  const isBurcKaplama = tenantMapping?.tenantSlug === 'burckaplama' || tenantMapping?.tenantId === 'TEN-BURCKAPLAMA';

  return (
    <SiteLayout tenantMapping={tenantMapping} activeLang={resolvedLang}>
      <Routes>
        <Route path="/" element={isBurcKaplama ? <BurcKaplamaHome /> : <Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/haberler" element={<NewsList />} />
        <Route path="/haberler/:slug" element={<NewsDetail />} />
        <Route path="/urunler" element={<ProductList />} />
        <Route path="/urunler/:slug" element={<ProductDetail />} />
        <Route path="/ust-yonetici" element={<ProductList />} />
        <Route path="/ofis-koltuklari" element={<ProductList />} />
        <Route path="/operasyonel-masalar" element={<ProductList />} />
        <Route path="/toplanti-masalari" element={<ProductList />} />
        <Route path="/tasarimcilar" element={<Designers />} />
        <Route path="/kurumsal" element={<Navigate to="/hikayemiz" replace />} />
        <Route path="/hikayemiz" element={<History />} />
        <Route path="/tasarim-sureci" element={<DesignProcess />} />
        <Route path="/tasarim-felsefesi" element={<DesignPhilosophy />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/kalite-politikamiz" element={<QualityPolicy />} />
        <Route path="/surdurulebilirlik" element={<Sustainability />} />
        <Route path="/iletisim" element={<Contact />} />
        {isCapilon && <Route path="/koleksiyonlar" element={<CollectionsPage />} />}
        <Route path="*" element={<NotFoundSite reason="Sayfa bulunamadı." />} />
      </Routes>
    </SiteLayout>
  );
}

export default function AppRoutes() {
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  return (
    <BrowserRouter>
      <Routes>
        {isLocalOrPortal ? (
          <>
            <Route path="/:tenantSlug/:lang/*" element={<RouteResolver />} />
            <Route path="/:tenantSlug/*" element={<RouteResolver />} />
            <Route path="*" element={<NotFoundSite reason="Lütfen URL'e kiracı slug'ını ekleyin. Örnek: /kreatiffikirler/tr/" />} />
          </>
        ) : (
          <>
            <Route path="/:lang/*" element={<RouteResolver />} />
            <Route path="*" element={<RouteResolver />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
