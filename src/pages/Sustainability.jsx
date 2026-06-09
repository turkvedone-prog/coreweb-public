import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigSustainability from '../themes/burobig/BurobigSustainability';
import NotFoundSite from '../components/NotFoundSite';

export default function Sustainability() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Sürdürülebilirlik' : 'Sustainability';
    const description = activeLang === 'tr'
      ? `${companyName} çevre politikaları, sürdürülebilirlik ilkeleri ve gelecek vizyonu.`
      : `${companyName} environmental policies, sustainability principles and future vision.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isBurobig) {
    return <BurobigSustainability />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
