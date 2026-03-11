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
  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor' });
});

export default app;
