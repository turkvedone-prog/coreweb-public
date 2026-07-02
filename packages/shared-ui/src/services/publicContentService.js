import { db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// ─── Cache Yardımcıları ───────────────────────────────────────────
const IS_DEV = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
const CACHE_TTL = IS_DEV ? 3 * 60 * 1000 : 5 * 60 * 1000; // Dev: 3dk, Prod: 5dk
const NO_CACHE = typeof window !== 'undefined' && window.location?.search?.includes('nocache');

function getCached(key) {
  if (NO_CACHE) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data;
    localStorage.removeItem(key);
    return null;
  } catch {
    return null;
  }
}


function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage dolu veya hata — sessizce geç
  }
}

/**
 * Belirli bir tenant'ın tüm cache'ini temizler.
 * Panel'den içerik güncellendiğinde çağrılabilir.
 */
export function invalidateCache(tenantId) {
  if (!tenantId) return;
  const prefixes = [
    `cw_products_${tenantId}`,
    `cw_sliders_${tenantId}`,
    `cw_settings_${tenantId}`,
    `cw_nav_${tenantId}`,
    `cw_blogs_${tenantId}`,
    `cw_news_${tenantId}`
  ];
  prefixes.forEach(key => {
    try { localStorage.removeItem(key); } catch { /* */ }
  });
  // In-memory cache'i de temizle
  delete memoryCache[`products_${tenantId}`];
}

// In-memory fallback (sayfa içi navigasyon için)
const memoryCache = {};


// ─── Company Settings ─────────────────────────────────────────────
export async function getCompanySettings(tenantId) {
  if (!tenantId) return null;
  if (tenantId === 'TEN-VIOLA' && import.meta.env.DEV) {
    return {
      companyName: 'Viola Mobilya',
      logos: {
        header: '',
        footer: ''
      },
      contact: {
        phone: '+90 224 123 45 67',
        email: 'info@violamobilya.com.tr',
        address: 'İnegöl, Bursa'
      }
    };
  }

  const cacheKey = `cw_settings_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const docRef = doc(db, 'tenants', tenantId, 'settings', 'company');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setCache(cacheKey, data);
      return data;
    }
    return null;
  } catch (error) {
    console.error('Error in getCompanySettings:', error);
    throw error;
  }
}

// ─── Sliders ──────────────────────────────────────────────────────
export async function getSliders(tenantId) {
  if (!tenantId) return [];
  if (tenantId === 'TEN-VIOLA' && import.meta.env.DEV) {
    return [];
  }

  const cacheKey = `cw_sliders_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const slidersRef = collection(db, 'tenants', tenantId, 'sliders');
    const q = query(
      slidersRef,
      where('status', '==', 'active'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const sliders = [];
    querySnapshot.forEach((doc) => {
      sliders.push({ id: doc.id, ...doc.data() });
    });
    setCache(cacheKey, sliders);
    return sliders;
  } catch (error) {
    console.error('Error in getSliders:', error);
    throw error;
  }
}

// ─── Navigation ───────────────────────────────────────────────────
export async function getNavigation(tenantId) {
  if (!tenantId) return [];
  if (tenantId === 'TEN-VIOLA' && import.meta.env.DEV) {
    return [
      { id: '1', title: 'Ana Sayfa', targetUrl: '/' },
      { id: '2', title: 'Ürünler', targetUrl: '/urunler' },
      { id: '3', title: 'İletişim', targetUrl: '/iletisim' }
    ];
  }

  const cacheKey = `cw_nav_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const navRef = collection(db, 'tenants', tenantId, 'navigation');
    const querySnapshot = await getDocs(navRef);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setCache(cacheKey, items);
    return items;
  } catch (error) {
    console.error('Error in getNavigation:', error);
    throw error;
  }
}

// ─── Blogs ────────────────────────────────────────────────────────
export async function getPublishedBlogs(tenantId) {
  if (!tenantId) return [];

  const cacheKey = `cw_blogs_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const blogsRef = collection(db, 'tenants', tenantId, 'blogs');
    let q;
    try {
      q = query(blogsRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      setCache(cacheKey, blogs);
      return blogs;
    } catch (indexError) {
      console.warn('Index not found for blogs, falling back to client-side sorting:', indexError);
      q = query(blogsRef, where('status', '==', 'published'));
      const querySnapshot = await getDocs(q);
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      blogs.sort((a, b) => {
        const dateA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const dateB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return dateB - dateA;
      });
      setCache(cacheKey, blogs);
      return blogs;
    }
  } catch (error) {
    console.error('Error in getPublishedBlogs:', error);
    throw error;
  }
}

export async function getPublishedBlogBySlug(tenantId, slug, activeLang) {
  if (!tenantId || !slug) return null;
  try {
    const blogs = await getPublishedBlogs(tenantId);
    const blog = blogs.find((item) => {
      if (item.id === slug) return true;
      if (item.slug === slug) return true;
      if (item.translations?.[activeLang]?.slug === slug) return true;
      const defaultLang = item.defaultLanguage || 'tr';
      if (item.translations?.[defaultLang]?.slug === slug) return true;
      return false;
    });
    return blog || null;
  } catch (error) {
    console.error('Error in getPublishedBlogBySlug:', error);
    throw error;
  }
}

// ─── News ─────────────────────────────────────────────────────────
export async function getPublishedNews(tenantId) {
  if (!tenantId) return [];

  const cacheKey = `cw_news_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const newsRef = collection(db, 'tenants', tenantId, 'news');
    let q;
    try {
      q = query(newsRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const news = [];
      querySnapshot.forEach((doc) => {
        news.push({ id: doc.id, ...doc.data() });
      });
      setCache(cacheKey, news);
      return news;
    } catch (indexError) {
      console.warn('Index not found for news, falling back to client-side sorting:', indexError);
      q = query(newsRef, where('status', '==', 'published'));
      const querySnapshot = await getDocs(q);
      const news = [];
      querySnapshot.forEach((doc) => {
        news.push({ id: doc.id, ...doc.data() });
      });
      news.sort((a, b) => {
        const dateA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const dateB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return dateB - dateA;
      });
      setCache(cacheKey, news);
      return news;
    }
  } catch (error) {
    console.error('Error in getPublishedNews:', error);
    throw error;
  }
}

export async function getPublishedNewsBySlug(tenantId, slug, activeLang) {
  if (!tenantId || !slug) return null;
  try {
    const newsList = await getPublishedNews(tenantId);
    const newsItem = newsList.find((item) => {
      if (item.slug === slug) return true;
      if (item.translations?.[activeLang]?.slug === slug) return true;
      const defaultLang = item.defaultLanguage || 'tr';
      if (item.translations?.[defaultLang]?.slug === slug) return true;
      return false;
    });
    return newsItem || null;
  } catch (error) {
    console.error('Error in getPublishedNewsBySlug:', error);
    throw error;
  }
}

// ─── Products ─────────────────────────────────────────────────────
export async function getActiveProducts(tenantId) {
  if (!tenantId) return [];
  if (tenantId === 'TEN-VIOLA' && import.meta.env.DEV) {
    return [
      {
        id: 'prod-beta',
        slug: 'beta',
        title: 'Beta',
        category: 'ÜST YÖNETİCİ GRUBU',
        coverImageUrl: '/assets/viola/images/beta_main.png',
        status: 'active',
        order: 1
      }
    ];
  }

  // 1. In-memory cache (aynı sayfa oturumu)
  if (memoryCache[`products_${tenantId}`]) {
    return memoryCache[`products_${tenantId}`];
  }

  // 2. localStorage cache (sayfalar arası)
  const cacheKey = `cw_products_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) {
    memoryCache[`products_${tenantId}`] = cached;
    return cached;
  }

  // 3. Firestore'dan çek
  try {
    const productsRef = collection(db, 'tenants', tenantId, 'products');
    let q;
    try {
      q = query(productsRef, where('status', '==', 'active'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.archived !== true && data.isDeleted !== true) {
          products.push({ id: doc.id, ...data });
        }
      });
      memoryCache[`products_${tenantId}`] = products;
      setCache(cacheKey, products);
      return products;
    } catch (indexError) {
      console.warn('Index not found for products, falling back to client-side sorting:', indexError);
      q = query(productsRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.archived !== true && data.isDeleted !== true) {
          products.push({ id: doc.id, ...data });
        }
      });
      products.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : (a.order ? parseInt(a.order, 10) : Infinity);
        const orderB = typeof b.order === 'number' ? b.order : (b.order ? parseInt(b.order, 10) : Infinity);
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        const dateA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const dateB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return dateB - dateA;
      });
      memoryCache[`products_${tenantId}`] = products;
      setCache(cacheKey, products);
      return products;
    }
  } catch (error) {
    console.error('Error in getActiveProducts:', error);
    throw error;
  }
}

export async function getActiveProductBySlug(tenantId, slug, activeLang) {
  if (!tenantId || !slug) return null;
  if (tenantId === 'TEN-VIOLA' && slug === 'beta' && import.meta.env.DEV) {
    return {
      id: 'prod-beta',
      slug: 'beta',
      title: 'Beta',
      category: 'ÜST YÖNETİCİ GRUBU',
      summary: 'Beta Yönetici Masası, modern ve şık tasarımıyla profesyonel ofis ortamlarına estetik bir dokunuş katıyor.',
      coverImageUrl: '/assets/viola/images/beta_main.png',
      gallery: [
        { id: 'img-1', url: '/assets/viola/images/beta_main.png', order: 1 },
        { id: 'img-2', url: '/assets/viola/images/product-lenta-2.png', order: 2 },
        { id: 'img-3', url: '/assets/viola/images/product-lenta-3.png', order: 3 }
      ],
      description: 'Beta Yönetici Masası, modern ve şık tasarımıyla profesyonel ofis ortamlarına estetik bir dokunuş katıyor. Zarif detayları ve ergonomik yapısıyla hem işlevsellik hem de konfor sunar. Yüksek kaliteli malzemelerle üretilmiş olan bu masa, dayanıklılığı ve uzun ömürlü kullanımı garanti eder. Yönetici ofisleri için özel olarak tasarlanmış olan Beta, prestij ve profesyonellik simgesi olarak öne çıkıyor.',
      technicalDetails: 'Beta Teknik Ölçüler (PDF) ve Montaj Kılavuzu mimari veriler sekmesindedir.',
      status: 'active',
      order: 1
    };
  }
  try {
    const products = await getActiveProducts(tenantId);
    const product = products.find((item) => {
      if (item.slug === slug) return true;
      if (item.translations?.[activeLang]?.slug === slug) return true;
      const defaultLang = item.defaultLanguage || 'tr';
      if (item.translations?.[defaultLang]?.slug === slug) return true;
      return false;
    });
    return product || null;
  } catch (error) {
    console.error('Error in getActiveProductBySlug:', error);
    throw error;
  }
}

export async function getCatalogMetadata(tenantId) {
  if (!tenantId) return null;
  const cacheKey = `cw_catalog_${tenantId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  try {
    const docRef = doc(db, 'tenants', tenantId, 'settings', 'catalog_metadata');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setCache(cacheKey, data);
      return data;
    }
    return null;
  } catch (error) {
    console.error('Error in getCatalogMetadata:', error);
    return null;
  }
}
