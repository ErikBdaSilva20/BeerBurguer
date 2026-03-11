import admin from '../../config/firebase-admin.js';
import User from '../models/User.js';

class SessionController {
  async store(req, res) {
    try {
      const { token } = req.body;

      console.log(
        '🔹 [SessionController] Received token:',
        token ? `${token.substring(0, 20)}...` : 'MISSING'
      );

      if (!token) {
        console.warn('⚠️ [SessionController] Token is missing from request body!');
        console.log('Body received:', req.body);
        return res.status(400).json({
          error: 'Token is required',
          received: req.body,
          contentType: req.headers['content-type'],
        });
      }

      // 1. Verifica o token no Firebase
      if (!admin.apps.length) {
        console.error('❌ Firebase Admin not initialized!');
        return res.status(500).json({ error: 'Firebase Admin not initialized' });
      }

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid, email, name, picture } = decodedToken;

      console.log('🔹 [SessionController] Decoded token for user:', email || uid);

      // 2. Verifica se o usuário já existe no nosso banco local
      let user = await User.findByPk(uid);

      if (!user) {
        console.log('🔹 [SessionController] Creating new user in local database');
        // Se não existir (ex: primeiro login com Google ou erro na criação), criamos
        user = await User.create({
          id: uid,
          name: name || (email ? email.split('@')[0] : 'User'),
          email: email || `${uid}@firebase.com`, // Fallback case
          google_user: decodedToken.firebase.sign_in_provider === 'google.com',
        });
      }

      // 3. Retornamos os dados para o frontend
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        token, // Retornamos o próprio Firebase Token para manter compatibilidade
      });
    } catch (error) {
      console.error('🔥 SessionController Error:', error);

      // If the error is from Firebase verification
      if (error.code && error.code.startsWith('auth/')) {
        return res.status(401).json({ error: 'Invalid or expired token', details: error.message });
      }

      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }

  async verify(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(401).json({ error: 'User not found in local database' });
      }

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error during verification' });
    }
  }
}

export default new SessionController();
