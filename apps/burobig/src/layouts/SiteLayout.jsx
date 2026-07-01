import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BurobigHeader from '../BurobigHeader';
import BurobigFooter from '../BurobigFooter';
import BurobigCookieConsent from '../BurobigCookieConsent';
import { getCompanySettings } from '../../services/publicContentService';

const SiteContext = createContext(null);

/* eslint-disable-next-line react-refresh/only-export-components */
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteLayout provider');
  }
  return context;
}

export default function SiteLayout({ children, activeLang }) {
  const tenantMapping = {
    tenantId: 'burobig',
    tenantSlug: 'burobig',
    defaultLanguage: 'tr',
    enabledLanguages: ['tr', 'en', 'ar']
  };

  const [settings, setSettings] = useState(null);
  const [activePageTranslations, setActivePageTranslations] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Reset translations on route change to prevent stale mappings
  useEffect(() => {
    setActivePageTranslations(null);
  }, [location.pathname]);

  useEffect(() => {
    getCompanySettings(tenantMapping.tenantId)
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch(() => {
        // Silent catch to avoid console spam as per specification
      });
  }, [tenantMapping.tenantId]);

  useEffect(() => {
    if (activeLang) {
      document.documentElement.lang = activeLang;
      document.documentElement.dir = activeLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [activeLang]);

  // Dynamically inject link alternate hreflang tags for SEO
  useEffect(() => {
    const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingLinks.forEach(link => link.remove());

    const origin = window.location.origin;
    const pathname = window.location.pathname;

    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return;

    const currentLang = parts[0];
    const enabledLangs = ['tr', 'en', 'ar'];

    if (!enabledLangs.includes(currentLang)) return;

    const subpathParts = parts.slice(1);

    enabledLangs.forEach(lang => {
      let localizedPath = `/${lang}`;
      
      if (subpathParts.length > 0) {
        if (subpathParts.length >= 2 && (subpathParts[0] === 'urunler' || subpathParts[0] === 'blog') && activePageTranslations) {
          const detailType = subpathParts[0];
          const localizedSlug = activePageTranslations[lang];
          if (localizedSlug) {
            localizedPath = `/${lang}/${detailType}/${localizedSlug}`;
          } else {
            localizedPath = `/${lang}/${subpathParts.join('/')}`;
          }
        } else {
          localizedPath = `/${lang}/${subpathParts.join('/')}`;
        }
      }

      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${origin}${localizedPath}`;
      document.head.appendChild(link);
    });

    // Add x-default pointing to default language (tr)
    const defaultLang = 'tr';
    let defaultPath = `/${defaultLang}`;
    if (subpathParts.length > 0) {
      if (subpathParts.length >= 2 && (subpathParts[0] === 'urunler' || subpathParts[0] === 'blog') && activePageTranslations) {
        const detailType = subpathParts[0];
        const localizedSlug = activePageTranslations[defaultLang];
        if (localizedSlug) {
          defaultPath = `/${defaultLang}/${detailType}/${localizedSlug}`;
        } else {
          defaultPath = `/${defaultLang}/${subpathParts.join('/')}`;
        }
      } else {
        defaultPath = `/${defaultLang}/${subpathParts.join('/')}`;
      }
    }
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${origin}${defaultPath}`;
    document.head.appendChild(defaultLink);

  }, [location.pathname, activePageTranslations]);

  const isRtl = activeLang === 'ar';

  return (
    <SiteContext.Provider value={{ 
      tenantMapping, 
      activeLang, 
      settings, 
      activePageTranslations, 
      setActivePageTranslations 
    }}>
      <div className="burobig-theme" lang={activeLang} dir={isRtl ? 'rtl' : 'ltr'}>
        <BurobigHeader />
        <main id="main-content">
          {children}
        </main>
        <BurobigFooter />
        <BurobigCookieConsent settings={settings} activeLang={activeLang} />
      </div>
    </SiteContext.Provider>
  );
}
