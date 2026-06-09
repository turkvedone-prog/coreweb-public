import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigDesignPhilosophy from '../themes/burobig/BurobigDesignPhilosophy';
import NotFoundSite from '../components/NotFoundSite';

export default function DesignPhilosophy() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
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

  if (isBurobig) {
    return <BurobigDesignPhilosophy />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
