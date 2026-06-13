import { db } from './firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const TENANT_ID = 'TEN-BUROBIG';

export async function getActiveProducts() {
  try {
    const productsRef = collection(db, 'tenants', TENANT_ID, 'products');
    let q;
    try {
      q = query(productsRef, where('status', '==', 'active'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch {
      // Index yoksa client-side sort
      q = query(productsRef, where('status', '==', 'active'));
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      products.sort((a, b) => (a.order || 0) - (b.order || 0));
      return products;
    }
  } catch (err) {
    console.error('Product fetch error:', err);
    return [];
  }
}
