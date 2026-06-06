import { db } from '../config/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const CACHE_PREFIX = 'cw_mapping_';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

function getCachedMapping(key) {
  try {
    const cached = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL_MS) {
      return data;
    }
    sessionStorage.removeItem(CACHE_PREFIX + key);
  } catch (e) {
    console.warn('Error reading from sessionStorage cache', e);
  }
  return null;
}

function setCachedMapping(key, data) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Error writing to sessionStorage cache', e);
  }
}

function extractMinimalFields(docData) {
  if (!docData) return null;
  return {
    tenantId: docData.tenantId || '',
    tenantSlug: docData.tenantSlug || '',
    defaultLanguage: docData.defaultLanguage || 'tr',
    enabledLanguages: docData.enabledLanguages || ['tr'],
    themeKey: docData.themeKey || 'default',
    customDomain: docData.customDomain || null,
    subdomain: docData.subdomain || '',
    publishStatus: docData.publishStatus || '',
    isStaging: docData.isStaging || false
  };
}

async function executeMappingQuery(field, value) {
  const mappingsRef = collection(db, 'siteMappings');
  
  // Query 1: Active + Published
  const q1 = query(
    mappingsRef,
    where(field, '==', value),
    where('status', '==', 'active'),
    where('publishStatus', '==', 'published'),
    limit(1)
  );
  const snap1 = await getDocs(q1);
  if (!snap1.empty) {
    return snap1.docs[0].data();
  }

  // Query 2: Active + Preview + Staging
  const q2 = query(
    mappingsRef,
    where(field, '==', value),
    where('status', '==', 'active'),
    where('publishStatus', '==', 'preview'),
    where('isStaging', '==', true),
    limit(1)
  );
  const snap2 = await getDocs(q2);
  if (!snap2.empty) {
    return snap2.docs[0].data();
  }

  return null;
}

export async function resolveTenantBySlug(slug) {
  if (!slug) return null;
  const cached = getCachedMapping('slug_' + slug);
  if (cached) return cached;

  try {
    const docData = await executeMappingQuery('tenantSlug', slug);
    if (!docData) return null;

    const data = extractMinimalFields(docData);
    if (data) {
      setCachedMapping('slug_' + slug, data);
    }
    return data;
  } catch (error) {
    console.error('Error in resolveTenantBySlug:', error);
    throw error;
  }
}

export async function resolveTenantByDomain(hostname) {
  if (!hostname) return null;
  const cached = getCachedMapping('domain_' + hostname);
  if (cached) return cached;

  const cleanHost = hostname.startsWith('www.') ? hostname.substring(4) : hostname;
  const wwwHost = 'www.' + cleanHost;

  try {
    // Try customDomain with cleanHost
    let docData = await executeMappingQuery('customDomain', cleanHost);

    // Try customDomain with wwwHost
    if (!docData) {
      docData = await executeMappingQuery('customDomain', wwwHost);
    }

    // Try productionDomain with cleanHost
    if (!docData) {
      docData = await executeMappingQuery('productionDomain', cleanHost);
    }

    // Try productionDomain with wwwHost
    if (!docData) {
      docData = await executeMappingQuery('productionDomain', wwwHost);
    }

    if (!docData) return null;

    const data = extractMinimalFields(docData);
    if (data) {
      setCachedMapping('domain_' + hostname, data);
    }
    return data;
  } catch (error) {
    console.error('Error in resolveTenantByDomain:', error);
    throw error;
  }
}

export async function resolveTenantBySubdomain(hostname) {
  if (!hostname) return null;
  const cached = getCachedMapping('subdomain_' + hostname);
  if (cached) return cached;

  try {
    // 1. Try subdomain
    let docData = await executeMappingQuery('subdomain', hostname);

    // 2. Try stagingDomain
    if (!docData) {
      docData = await executeMappingQuery('stagingDomain', hostname);
    }

    // 3. Try activeDomain
    if (!docData) {
      docData = await executeMappingQuery('activeDomain', hostname);
    }

    if (!docData) return null;

    const data = extractMinimalFields(docData);
    if (data) {
      setCachedMapping('subdomain_' + hostname, data);
    }
    return data;
  } catch (error) {
    console.error('Error in resolveTenantBySubdomain:', error);
    throw error;
  }
}
