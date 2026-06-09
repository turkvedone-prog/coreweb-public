import { useEffect, Suspense } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function Designers() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantSlug } = tenantMapping;
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

  const theme = themeRegistry[tenantSlug];
  if (theme?.Designers) {
    const DynamicDesigners = theme.Designers;
    return (
      <Suspense fallback={null}>
        <DynamicDesigners />
      </Suspense>
    );
  }

  // Fallback for non-Burobig tenants
  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
