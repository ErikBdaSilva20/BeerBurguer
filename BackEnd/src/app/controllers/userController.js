import * as Yup from 'yup';
import User from '../models/User.js';

/**
 * UserController
 * --------------
 * Manages user data synchronization with Firebase.
 *
 * The user is created in Firebase first (frontend),
 * then the backend receives the Firebase UID to create a local copy.
 *
 * Security:
 * - No password storage or hashing (Firebase handles authentication)
 * - Uses Firebase UID as the primary key
 *
 * Observações:
 * - Utiliza Sequelize como ORM
 * - Utiliza Yup para validação dos dados
 * - Geração de UUID para identificação dos usuários
 */

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        id: Yup.string().required(), // Firebase UID vindo do frontend após cadastro
        admin: Yup.boolean().default(false),
      });

      if (!req.body) {
        return res.status(400).json({ error: 'Body is missing' });
      }

      await schema.validate(req.body, { abortEarly: false });

      const { name, email, id, admin } = req.body;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const user = await User.create({
        id, // UID do Firebase
        name,
        email,
        admin,
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (err) {
      console.error('🔥 UserController Error:', err);

      return res.status(400).json({
        error: 'Validation or server error',
        details: err.errors || err.message,
      });
    }
  }
}

export default new UserController();
