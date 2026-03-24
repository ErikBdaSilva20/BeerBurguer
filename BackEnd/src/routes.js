import { Router } from 'express';
import multer from 'multer';
import DashboardController from './app/controllers/DashboardController.js';
import OrderController from './app/controllers/orderController.js';
import CategoryController from './app/controllers/categoryController.js';
import AsaasPaymentController from './app/controllers/asaas/AsaasPaymentController.js';
import ProductController from './app/controllers/productController.js';
import SessionController from './app/controllers/sessionController.js';
import UserController from './app/controllers/userController.js';
import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';
import multerConfig from './config/multer.cjs';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Webhook do Asaas — deve ficar ANTES do authMiddleware (Asaas não envia token)
routes.post('/webhooks/asaas', AsaasPaymentController.webhook);

routes.use(authMiddleware);
routes.get('/session-verify', SessionController.verify);

routes.post('/products', adminMiddleware, upload.single('file'), ProductController.store);
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductController.update);
routes.get('/products', ProductController.index);
routes.delete('/products/:id', adminMiddleware, ProductController.delete);

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index);
routes.delete('/categories/:id', adminMiddleware, CategoryController.delete);

routes.post('/orders', OrderController.store);
routes.get('/orders/', OrderController.index);
routes.put('/orders/:id', adminMiddleware, OrderController.update);

routes.get('/dashboard', adminMiddleware, DashboardController.index);

// Rotas de pagamento via Asaas
routes.post('/create-payment', AsaasPaymentController.store);
routes.get('/payment-status/:id', AsaasPaymentController.status);

export default routes;
