import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSite } from '../layouts/SiteLayout';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function CollectionsPage() {
  const { slug } = useParams();
  const { tenantMapping } = useSite();
  
  const theme = themeRegistry[tenantMapping?.tenantSlug];
  if (theme) {
    if (slug && theme.CategoryDetail) {
      const DynamicCategoryDetail = theme.CategoryDetail;
      return (
        <Suspense fallback={null}>
          <DynamicCategoryDetail />
        </Suspense>
      );
    }
    if (!slug && theme.CollectionsPage) {
      const DynamicCollectionsPage = theme.CollectionsPage;
      return (
        <Suspense fallback={null}>
          <DynamicCollectionsPage />
        </Suspense>
      );
    }
  }

  return <NotFoundSite reason="Sayfa bulunamadı." />;
}
