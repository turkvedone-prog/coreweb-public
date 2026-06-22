import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7_smZYZ9JSDJq0sBtjdRkSiFaEMQRZos",
  authDomain: "coreweb-panel.firebaseapp.com",
  projectId: "coreweb-panel",
  storageBucket: "coreweb-panel.firebasestorage.app",
  messagingSenderId: "136936905582",
  appId: "1:136936905582:web:db0e83b19c468d9bdabf7f"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// authReady: anonymous sign-in tamamlanana kadar fetch'leri beklet
export const authReady = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();
    if (user) {
      resolve(user);
    } else {
      signInAnonymously(auth)
        .then(resolve)
        .catch((err) => {
          console.warn('Anonymous auth failed:', err.code);
          resolve(null); // auth olmadan da dene
        });
    }
  });
});

export default app;
