import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  let serviceAccount;

  // Produção (Render): usa variável de ambiente com o JSON em string
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('🔑 Firebase Admin: carregando credenciais via variável de ambiente.');
  } else {
    // Desenvolvimento local: usa o arquivo serviceAccountKey.json
    const serviceAccountPath = join(__dirname, '../../serviceAccountKey.json');

    if (!existsSync(serviceAccountPath)) {
      throw new Error(`Arquivo não encontrado: ${serviceAccountPath}`);
    }

    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    console.log('🔑 Firebase Admin: carregando credenciais via arquivo local.');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('✅ Firebase Admin initialized successfully.');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.warn('⚠️ Configure FIREBASE_SERVICE_ACCOUNT (produção) ou serviceAccountKey.json (local).');
}

export default admin;
