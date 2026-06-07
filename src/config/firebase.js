import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD7_smZYZ9JSDJq0sBtjdRkSiFaEMQRZos",
  authDomain: "coreweb-panel.firebaseapp.com",
  projectId: "coreweb-panel",
  storageBucket: "coreweb-panel.firebasestorage.app",
  messagingSenderId: "136936905582",
  appId: "1:136936905582:web:db0e83b19c468d9bdabf7f",
  measurementId: "G-0Y4JN4MERK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    console.log('🔥 Connected to local Firestore emulator.');
  } catch (err) {
    console.warn('⚠️ Firestore emulator connection warning:', err.message);
  }
}

export default app;
