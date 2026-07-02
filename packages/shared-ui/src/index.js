// Config
export { default as app, db } from './config/firebase';

// Services
export { submitLead, submitSubscriber } from './services/apiService';
export { resolveTenantBySlug, resolveTenantByDomain, resolveTenantBySubdomain } from './services/siteMappingService';
export {
  getCompanySettings,
  getSliders,
  getNavigation,
  getPublishedBlogs,
  getPublishedBlogBySlug,
  getPublishedNews,
  getPublishedNewsBySlug,
  getActiveProducts,
  getActiveProductBySlug,
  getCatalogMetadata
} from './services/publicContentService';

// Utils
export { getLocalizedContent } from './utils/i18nContent';
export { updateSEOMeta } from './utils/seo';
export { detectAndResolveTenant } from './utils/tenantResolver';
export { loadRecaptchaScript, executeRecaptcha } from './utils/recaptcha';
export { resolveField } from './utils/resolveField';
