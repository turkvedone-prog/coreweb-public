import { useEffect, Suspense } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function Manifesto() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;
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

  const theme = themeRegistry[tenantSlug];
  if (theme?.Manifesto) {
    const DynamicManifesto = theme.Manifesto;
    return (
      <Suspense fallback={null}>
        <DynamicManifesto />
      </Suspense>
    );
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
