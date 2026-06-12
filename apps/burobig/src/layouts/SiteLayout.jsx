import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BurobigHeader from '../BurobigHeader';
import BurobigFooter from '../BurobigFooter';

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
    tenantId: 'TEN-BUROBIG',
    tenantSlug: 'burobig',
    defaultLanguage: 'tr',
    enabledLanguages: ['tr', 'en']
  };

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SiteContext.Provider value={{ tenantMapping, activeLang }}>
      <BurobigHeader />
      <main id="main-content">
        {children}
      </main>
      <BurobigFooter />
    </SiteContext.Provider>
  );
}
