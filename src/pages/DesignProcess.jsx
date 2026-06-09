import { useEffect, Suspense } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function DesignProcess() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;
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

  const theme = themeRegistry[tenantSlug];
  if (theme?.DesignProcess) {
    const DynamicDesignProcess = theme.DesignProcess;
    return (
      <Suspense fallback={null}>
        <DynamicDesignProcess />
      </Suspense>
    );
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
