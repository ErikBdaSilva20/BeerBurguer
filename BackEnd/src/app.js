import cors from 'cors';
import express, { urlencoded } from 'express';
import fileRouteConfig from './config/fileRoutes.cjs';
import routes from './routes.js';

const app = express();
// Alterar em produção

app.use(cors());

// Permite receber JSON e dados de formulário
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method !== 'GET') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Serve arquivos de produtos
app.use('/product-file', fileRouteConfig);
app.use('/category-file', fileRouteConfig);

// Rotas da API
app.use(routes);

// Middleware de tratamento de erros genérico
app.use((err, _req, res, _next) => {
  console.error('🔥 Generic Error Handler caught:', err);

  // If the error is from Firebase verification
  if (err.code && err.code.startsWith('auth/')) {
    return res.status(401).json({ error: 'Invalid or expired token', details: err.message });
  }

  // Procura por erros específicos de migração/banco de dados
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Database validation error', details: err.errors.map(e => e.message) });
  }

  if (err.name === 'SequelizeDatabaseError') {
    console.error('💾 Database Error Details:', err.original);
    return res.status(500).json({
      error: 'Database error',
      details: err.message,
      hint: 'Possible migration issue or schema mismatch'
    });
  }

  return res.status(500).json({ error: 'Internal server error', details: err.message });
});

export default app;
