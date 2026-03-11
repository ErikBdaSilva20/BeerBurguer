import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Opção 1: variável de ambiente com JSON em string
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log('🔑 Firebase Admin: carregando via variável de ambiente.');

  } else if (existsSync('/etc/secrets/serviceAccountKey.json')) {
    // Opção 2: Secret File do Render (montado em /etc/secrets/)
    serviceAccount = JSON.parse(readFileSync('/etc/secrets/serviceAccountKey.json', 'utf8'));
    console.log('🔑 Firebase Admin: carregando via Secret File do Render.');

  } else {
    // Opção 3: arquivo local (desenvolvimento)
    const localPath = join(__dirname, '../../serviceAccountKey.json');
    if (!existsSync(localPath)) {
      throw new Error(`Arquivo não encontrado: ${localPath}`);
    }
    serviceAccount = JSON.parse(readFileSync(localPath, 'utf8'));
    console.log('🔑 Firebase Admin: carregando via arquivo local.');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('✅ Firebase Admin initialized successfully.');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.warn('⚠️ Configure FIREBASE_SERVICE_ACCOUNT, Secret File em /etc/secrets/ ou serviceAccountKey.json local.');
}

export default admin;
