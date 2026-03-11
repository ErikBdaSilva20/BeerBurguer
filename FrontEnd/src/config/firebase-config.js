import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/**
 * Firebase Configuration
 * ----------------------
 * As chaves abaixo devem ser configuradas no seu arquivo .env
 * do FrontEnd para que a integração funcione corretamente.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Log de verificação (apenas para debug, pode remover depois)
if (!firebaseConfig.apiKey) {
  console.error('Firebase API Key is missing! Check your .env file and restart the dev server.');
}

// Inicializa o Firebase Authentication e exporta para uso no projeto
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
