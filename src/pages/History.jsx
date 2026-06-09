import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigHistory from '../themes/burobig/BurobigHistory';
import NotFoundSite from '../components/NotFoundSite';

export default function History() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Hikayemiz' : 'Our Story';
    const description = activeLang === 'tr'
      ? `${companyName} kurumsal hikayesi ve kökenleri.`
      : `${companyName} corporate history and origin story.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isBurobig) {
    return <BurobigHistory />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
