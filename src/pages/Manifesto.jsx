import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigManifesto from '../themes/burobig/BurobigManifesto';
import NotFoundSite from '../components/NotFoundSite';

export default function Manifesto() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Manifesto' : 'Manifesto';
    const description = activeLang === 'tr'
      ? `${companyName} tasarım manifestosu ve felsefesi.`
      : `${companyName} design manifesto and philosophy.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isBurobig) {
    return <BurobigManifesto />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
