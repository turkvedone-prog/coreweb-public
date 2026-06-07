import { createContext, useContext, useEffect, useState } from 'react';
import { getCompanySettings, getNavigation } from '../services/publicContentService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';

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
    return <LoadingState />;
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

  if (isBurobig) {
    return (
      <SiteContext.Provider value={contextValue}>
        <div className="burobig-theme">
          {children}
        </div>
      </SiteContext.Provider>
    );
  }

  if (isCapilon) {
    return (
      <SiteContext.Provider value={contextValue}>
        <div className="capilon-theme">
          {children}
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
