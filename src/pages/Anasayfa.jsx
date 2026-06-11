import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import themeRegistry from '../themes/themeRegistry';
import { updateSEOMeta } from '../utils/seo';

export default function Anasayfa() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;

  const theme = themeRegistry[tenantSlug];
  
  useEffect(() => {
    const companyName = settings?.companyName || tenantSlug || 'CoreWeb';
    updateSEOMeta({
      title: activeLang === 'tr' ? 'Yeni Anasayfa' : 'New Homepage',
      description: companyName,
      companyName: companyName
    });
  }, [activeLang, tenantSlug, settings]);

  if (theme?.Anasayfa) {
    const DynamicAnasayfa = theme.Anasayfa;
    return <DynamicAnasayfa />;
  }

  // Fallback: completely empty blank container
  return <div className="bk-anasayfa-blank min-h-screen bg-white"></div>;
}
