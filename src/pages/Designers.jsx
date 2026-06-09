import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigDesigners from '../themes/burobig/BurobigDesigners';
import NotFoundSite from '../components/NotFoundSite';

export default function Designers() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Tasarımcılarımız' : 'Our Designers';
    const description = activeLang === 'tr'
      ? `${companyName} tasarım felsefesi ve mobilyalarımızı şekillendiren tasarımcılarımız.`
      : `${companyName} design philosophy and the designers who shape our furniture.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isBurobig) {
    return <BurobigDesigners />;
  }

  // Fallback for non-Burobig tenants
  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
