import { useParams } from 'react-router-dom';
import { useSite } from '../layouts/SiteLayout';
import NotFoundSite from '../components/NotFoundSite';
import themeRegistry from '../themes/themeRegistry';

export default function CollectionsPage() {
  const { slug } = useParams();
  const { tenantMapping } = useSite();
  const tenantSlug = tenantMapping?.tenantSlug;

  const theme = themeRegistry[tenantSlug];
  if (theme?.Collections) {
    const DynamicCollections = theme.Collections;
    const DynamicCategoryDetail = theme.CategoryDetail;
    if (slug && DynamicCategoryDetail) {
      return <DynamicCategoryDetail />;
    }
    return <DynamicCollections />;
  }

  return <NotFoundSite reason="Sayfa bulunamadı." />;
}
