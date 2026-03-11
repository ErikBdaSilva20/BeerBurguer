import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importante: O usuário precisará colocar o arquivo JSON na pasta src/config
// ou configurar via variáveis de ambiente.
// Por enquanto, vamos carregar de um arquivo esperado.

try {
  const serviceAccountPath = join(__dirname, '../../serviceAccountKey.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('✅ Firebase Admin initialized successfully.');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.warn('⚠️ Please ensure serviceAccountKey.json is present in the project root.');
}

export default admin;
