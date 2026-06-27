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
    enabledLanguages: ['tr', 'en']
  };

  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
    }
  }, [activeLang]);

  return (
    <SiteContext.Provider value={{ tenantMapping, activeLang, settings }}>
      <div className="burobig-theme" lang={activeLang}>
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
