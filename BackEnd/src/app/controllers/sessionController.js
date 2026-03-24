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

      // E-mail que terá acesso de administrador forçado
      const ADMIN_EMAIL = 'erikborgesdasilva574@gmail.com';
      const userEmail = email || `${uid}@firebase.com`;
      const isSuperAdmin = userEmail === ADMIN_EMAIL;

      if (!user) {
        console.log('🔹 [SessionController] Creating new user in local database');
        // Se não existir (ex: primeiro login com Google ou erro na criação), criamos
        user = await User.create({
          id: uid,
          name: name || (email ? email.split('@')[0] : 'User'),
          email: userEmail,
          admin: isSuperAdmin, // O email escolhido já vira admin aqui
          google_user: decodedToken.firebase.sign_in_provider === 'google.com',
        });
      } else if (isSuperAdmin && !user.admin) {
        // Se o usuário existir, for o super admin, mas ainda não tiver o cargo no banco, atualizamos!
        await user.update({ admin: true });
        user.admin = true;
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

      // Procura por erros específicos de migração/banco de dados
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Database validation error', details: error.errors.map(e => e.message) });
      }

      if (error.name === 'SequelizeDatabaseError') {
        console.error('💾 Database Error Details:', error.original);
        return res.status(500).json({ 
          error: 'Database error', 
          details: error.message,
          hint: 'Verifique se as migrações (como UUID para STRING) foram aplicadas em produção.' 
        });
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

      const isAdmin = user.admin || user.email === 'erikborgesdasilva574@gmail.com';

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: isAdmin,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Server error during verification' });
    }
  }
}

export default new SessionController();
