import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigQualityPolicy from '../themes/burobig/BurobigQualityPolicy';
import NotFoundSite from '../components/NotFoundSite';

export default function QualityPolicy() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Kalite Politikamız' : 'Quality Policy';
    const description = activeLang === 'tr'
      ? `${companyName} üretim standartları ve kalite politikası.`
      : `${companyName} production standards and quality policy.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isBurobig) {
    return <BurobigQualityPolicy />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
