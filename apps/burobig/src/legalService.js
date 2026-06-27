import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TENANT_ID = 'burobig';
let cachedLegalTexts = null;

export async function getPublishedLegalTexts() {
  if (cachedLegalTexts) return cachedLegalTexts;
  try {
    const ref = collection(db, 'tenants', TENANT_ID, 'legal_texts');
    const q = query(ref, where('status', '==', 'published'));
    const snap = await getDocs(q);
    const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    cachedLegalTexts = docs;
    return docs;
  } catch (err) {
    console.error('Error fetching legal texts:', err);
    return [];
  }
}
