import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCompanySettings, getNavigation } from '../services/publicContentService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BurobigHeader from '../themes/burobig/BurobigHeader';
import BurobigFooter from '../themes/burobig/BurobigFooter';
import CapilonHeader from '../themes/capilon/CapilonHeader';
import CapilonFooter from '../themes/capilon/CapilonFooter';
import BurcKaplamaHeader from '../themes/burckaplama/BurcKaplamaHeader';
import BurcKaplamaFooter from '../themes/burckaplama/BurcKaplamaFooter';
import '../themes/burckaplama/burckaplama.css';

const SiteContext = createContext(null);

/* eslint-disable-next-line react-refresh/only-export-components */
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteLayout provider');
  }
  return context;
}

export default function SiteLayout({ children, tenantMapping, activeLang }) {
  const { tenantId } = tenantMapping;
  const [settings, setSettings] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Dynamic canonical link meta for CoreWeb
  useEffect(() => {
    if (!tenantMapping) return;

    const isCoreWeb = tenantMapping.tenantSlug === 'coreweb' || tenantMapping.tenantId === 'TEN-507';

    let canonicalTag = document.querySelector('link[rel="canonical"]');

    if (isCoreWeb) {
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      // Remove trailing slash and /tr or /tr/ prefix from path for canonical tag
      let cleanPath = location.pathname;
      if (cleanPath.startsWith('/coreweb/tr')) {
        cleanPath = cleanPath.substring(11);
      } else if (cleanPath.startsWith('/coreweb')) {
        cleanPath = cleanPath.substring(8);
      }
      
      if (cleanPath === '/tr' || cleanPath === '/tr/') {
        cleanPath = '';
      } else if (cleanPath.startsWith('/tr/')) {
        cleanPath = cleanPath.substring(3);
      }
      if (cleanPath === '/') {
        cleanPath = '';
      }
      canonicalTag.setAttribute('href', `https://www.coreweb.tr${cleanPath}`);
    } else {
      if (canonicalTag) {
        canonicalTag.remove();
      }
    }

    return () => {
      const tag = document.querySelector('link[rel="canonical"]');
      if (tag) {
        tag.remove();
      }
    };
  }, [tenantMapping, location.pathname]);

  // Dynamic robots noindex meta for staging subdomains
  useEffect(() => {
    if (!tenantMapping) return;
    
    const hostname = window.location.hostname;
    const isCoreMainDomain = hostname === 'coreweb.tr' || hostname === 'www.coreweb.tr';
    const isStagingSubdomain = hostname.endsWith('.coreweb.tr') && 
                               hostname !== 'coreweb.tr' && 
                               hostname !== 'www.coreweb.tr' && 
                               hostname !== 'panel.coreweb.tr';
                               
    const isPreviewOrStaging = tenantMapping.publishStatus === 'preview' || 
                               tenantMapping.isStaging === true;
                               
    const shouldNoIndex = !isCoreMainDomain && (isStagingSubdomain || isPreviewOrStaging);

    let robotsTag = document.querySelector('meta[name="robots"]');
    
    if (shouldNoIndex) {
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute('content', 'noindex, nofollow, noarchive');
      console.log('[SEO] Staging domain or preview state detected. Dynamic noindex applied.');
    } else {
      if (robotsTag) {
        const content = robotsTag.getAttribute('content');
        if (content && (content.includes('noindex') || content.includes('nofollow'))) {
          robotsTag.remove();
          console.log('[SEO] Production domain detected. Dynamic noindex removed.');
        }
      }
    }
  }, [tenantMapping]);

  // Synchronize HTML lang attribute with activeLang for correct local casing rules (e.g. Turkish i -> İ)
  useEffect(() => {
    if (activeLang) {
      document.documentElement.lang = activeLang;
    }
  }, [activeLang]);

  useEffect(() => {
    if (!tenantId) return;

    const fetchLayoutData = async () => {
      setLoading(true);
      try {
        const [settingsData, navigationData] = await Promise.all([
          getCompanySettings(tenantId),
          getNavigation(tenantId)
        ]);
        setSettings(settingsData);
        setNavigation(navigationData);
      } catch (error) {
        console.error('Error fetching layout data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayoutData();
  }, [tenantId]);

  if (loading) {
    return null;
  }

  const contextValue = {
    tenantMapping,
    activeLang,
    settings,
    navigation
  };

  const isBurobig = tenantMapping?.tenantSlug === 'burobig' || tenantMapping?.tenantId === 'TEN-BUROBIG';
  const isCapilon = tenantMapping?.tenantSlug === 'capilon' || tenantMapping?.tenantId === 'TEN-CAPILON';
  const isCoreWeb = tenantMapping?.tenantSlug === 'coreweb' || tenantMapping?.tenantId === 'TEN-507';
  const isBurcKaplama = tenantMapping?.tenantSlug === 'burckaplama' || tenantMapping?.tenantId === 'TEN-BURCKAPLAMA';

  if (isBurobig) {
    return (
      <SiteContext.Provider value={contextValue}>
        <div className="burobig-theme">
          <BurobigHeader />
          {children}
          <BurobigFooter />
        </div>
      </SiteContext.Provider>
    );
  }

  if (isCapilon) {
    return (
      <SiteContext.Provider value={contextValue}>
        <div className="capilon-theme">
          <CapilonHeader />
          {children}
          <CapilonFooter />
        </div>
      </SiteContext.Provider>
    );
  }

  if (isBurcKaplama) {
    return (
      <SiteContext.Provider value={contextValue}>
        <div className="burckaplama-theme">
          <BurcKaplamaHeader />
          {children}
          <BurcKaplamaFooter />
        </div>
      </SiteContext.Provider>
    );
  }

  if (isCoreWeb) {
    return (
      <SiteContext.Provider value={contextValue}>
        <div className="coreweb-theme">
          {children}
        </div>
      </SiteContext.Provider>
    );
  }

  return (
    <SiteContext.Provider value={contextValue}>
      <div className="site-container min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Header 
          settings={settings} 
          navigation={navigation} 
          tenantMapping={tenantMapping} 
          activeLang={activeLang} 
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </SiteContext.Provider>
  );
}
