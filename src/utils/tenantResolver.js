import { resolveTenantBySlug, resolveTenantByDomain, resolveTenantBySubdomain } from '../services/siteMappingService';

export async function detectAndResolveTenant(pathSlug) {
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');
  const isSubdomain = hostname.endsWith('.coreweb.tr') && hostname !== 'coreweb.tr' && hostname !== 'www.coreweb.tr';

  try {
    if (isLocalOrPortal && pathSlug) {
      // Local/Demo Mode: Resolve by path slug
      return await resolveTenantBySlug(pathSlug);
    } else if (isSubdomain) {
      // Subdomain Mode: e.g. kreatiffikirler.coreweb.tr
      const slug = hostname.split('.')[0];
      // Try resolving by exact subdomain field first, then fallback to slug field
      const resolved = await resolveTenantBySubdomain(hostname);
      if (resolved) return resolved;
      return await resolveTenantBySlug(slug);
    } else if (!isLocalOrPortal) {
      // Custom Domain Mode: e.g. www.kreatiffikirler.com
      const cleanHost = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
      return await resolveTenantByDomain(cleanHost);
    }
  } catch (error) {
    console.error('Error in detectAndResolveTenant:', error);
  }
  return null;
}
