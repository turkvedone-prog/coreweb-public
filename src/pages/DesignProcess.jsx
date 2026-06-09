import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigDesignProcess from '../themes/burobig/BurobigDesignProcess';
import NotFoundSite from '../components/NotFoundSite';

export default function DesignProcess() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Tasarım Süreci' : 'Design Process';
    const description = activeLang === 'tr'
      ? `${companyName} tasarım süreci ve yapay zeka destekli yenilikçi yaklaşımları.`
      : `${companyName} design process and AI-assisted innovative approaches.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isBurobig) {
    return <BurobigDesignProcess />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
