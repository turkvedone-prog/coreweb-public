import { useEffect, Suspense } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function DesignPhilosophy() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Tasarım Felsefesi' : 'Design Philosophy';
    const description = activeLang === 'tr'
      ? `${companyName} modern, minimalist ve cesur tasarım felsefesi.`
      : `${companyName} modern, minimalist and bold design philosophy.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  const theme = themeRegistry[tenantSlug];
  if (theme?.DesignPhilosophy) {
    const DynamicDesignPhilosophy = theme.DesignPhilosophy;
    return (
      <Suspense fallback={null}>
        <DynamicDesignPhilosophy />
      </Suspense>
    );
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
