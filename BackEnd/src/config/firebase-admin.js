import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let initializationError = null;

try {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Opção 1: variável de ambiente com JSON em string
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      console.log('🔑 Firebase Admin: carregando via variável de ambiente.');
    } catch (e) {
      throw new Error(`FIREBASE_SERVICE_ACCOUNT contem JSON inválido: ${e.message}`);
    }

  } else if (existsSync('/etc/secrets/serviceAccountKey.json')) {
    // Opção 2: Secret File do Render (montado em /etc/secrets/)
    serviceAccount = JSON.parse(readFileSync('/etc/secrets/serviceAccountKey.json', 'utf8'));
    console.log('🔑 Firebase Admin: carregando via Secret File do Render.');

  } else {
    // Opção 3: arquivo local (desenvolvimento)
    const localPath = join(__dirname, '../../serviceAccountKey.json');
    if (!existsSync(localPath)) {
      throw new Error(`Arquivo de configuração não encontrado (localPath: ${localPath})`);
    }
    serviceAccount = JSON.parse(readFileSync(localPath, 'utf8'));
    console.log('🔑 Firebase Admin: carregando via arquivo local.');
  }

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized successfully.');
  }

} catch (error) {
  initializationError = error.message;
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.warn('⚠️ Verifique as variáveis de ambiente FIREBASE_SERVICE_ACCOUNT ou o Secret File.');
}

export { initializationError };
export default admin;
