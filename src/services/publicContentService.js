import { db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export async function getCompanySettings(tenantId) {
  if (!tenantId) return null;
  try {
    const docRef = doc(db, 'tenants', tenantId, 'settings', 'company');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error in getCompanySettings:', error);
    throw error;
  }
}

export async function getSliders(tenantId) {
  if (!tenantId) return [];
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
    return sliders;
  } catch (error) {
    console.error('Error in getSliders:', error);
    throw error;
  }
}

export async function getNavigation(tenantId) {
  if (!tenantId) return [];
  try {
    const navRef = collection(db, 'tenants', tenantId, 'navigation');
    const querySnapshot = await getDocs(navRef);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error('Error in getNavigation:', error);
    throw error;
  }
}

export async function getPublishedBlogs(tenantId) {
  if (!tenantId) return [];
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

export async function getPublishedNews(tenantId) {
  if (!tenantId) return [];
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

export async function getActiveProducts(tenantId) {
  if (!tenantId) return [];
  try {
    const productsRef = collection(db, 'tenants', tenantId, 'products');
    let q;
    try {
      q = query(productsRef, where('status', '==', 'active'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (indexError) {
      console.warn('Index not found for products, falling back to client-side sorting:', indexError);
      q = query(productsRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
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
      return products;
    }
  } catch (error) {
    console.error('Error in getActiveProducts:', error);
    throw error;
  }
}

export async function getActiveProductBySlug(tenantId, slug, activeLang) {
  if (!tenantId || !slug) return null;
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
