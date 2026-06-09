import { useEffect, Suspense } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function QualityPolicy() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;
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

  const theme = themeRegistry[tenantSlug];
  if (theme?.QualityPolicy) {
    const DynamicQualityPolicy = theme.QualityPolicy;
    return (
      <Suspense fallback={null}>
        <DynamicQualityPolicy />
      </Suspense>
    );
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
