import admin from '../../config/firebase-admin.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    // O Firebase UID será o nosso identificador principal
    req.userId = decodedToken.uid;
    req.userEmail = decodedToken.email;
    req.userName = decodedToken.name || '';

    // Verificamos se o usuário é admin no banco local.
    const user = await User.findByPk(decodedToken.uid);
    // Força verdadeira segurança para o email escolhido:
    req.userIsAdmin = (user?.admin || decodedToken.email === 'erikborgesdasilva574@gmail.com');

    return next();
  } catch (err) {
    console.error('Firebase token verification failed:', err.message);
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
};

export default authMiddleware;
