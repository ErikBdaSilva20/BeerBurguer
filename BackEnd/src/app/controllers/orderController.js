import mongoose from 'mongoose';
import * as Yup from 'yup';
import Mail from '../../lib/Mail.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../schemas/Orders.js';

/**
 * OrderController
 * ----------------
 * Responsável pelo gerenciamento de pedidos.
 *
 * Funcionalidades:
 * - Criar pedidos
 * - Atualizar status de pedidos
 * - Listar pedidos
 *
 * Tecnologias envolvidas:
 * - MongoDB (Mongoose) → pedidos
 * - PostgreSQL / Sequelize → produtos e categorias
 * - Yup → validação de dados
 *
 * Observação importante:
 * - O pedido salva uma "foto" dos produtos no momento da compra,
 *   evitando inconsistência caso o produto mude no futuro.
 */

class OrderController {
  /**
   * Criar um novo pedido
   * --------------------
   * Fluxo:
   * 1️⃣ Valida os dados recebidos (products)
   * 2️⃣ Extrai dados do usuário autenticado
   * 3️⃣ Busca os produtos no banco
   * 4️⃣ Valida se todos os produtos existem
   * 5️⃣ Monta o pedido com snapshot dos produtos
   * 6️⃣ Salva o pedido no MongoDB
   */
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.string().required(),
            quantity: Yup.number().integer().min(1).required(),
          })
        ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false, strict: true });

      const { userId, userName } = req;
      const { products, payment_intent_id, payment_method } = req.body;

      const productsIds = products.map((product) => product.id);

      const findedProducts = await Product.findAll({
        where: { id: productsIds },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
      });

      const findedIds = findedProducts.map((p) => p.id);

      const invalidProducts = products.filter((p) => !findedIds.includes(p.id));

      if (invalidProducts.length > 0) {
        return res.status(400).json({
          error: 'Produtos inválidos encontrados',
          invalidProducts,
        });
      }

      const mapedProducts = findedProducts.map((product) => {
        const quantity = products.find((p) => p.id === product.id).quantity;

        return {
          id: product.id,
          name: product.name,
          price: product.price,
          url: product.url,
          category: product.category.name,
          quantity,
        };
      });

      const order = {
        user: { id: userId, name: userName },
        products: mapedProducts,
        status: 'Pedido realizado',
        payment_intent_id,
        payment_method,
      };

      const newOrder = await Order.create(order);

      // Envia comprovante por email (especialmente util para validar PIX em testes locais)
      if (req.userEmail) {
        Mail.sendReceipt(req.userEmail, newOrder).catch((err) =>
          console.error('🔥 Erro ao enviar email:', err)
        );
      }

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: 'Erro ao criar pedido',
      });
    }
  }

  /**
   * Atualizar status do pedido
   * --------------------------
   * Fluxo:
   * 1️⃣ Valida o status recebido
   * 2️⃣ Valida se o ID é um ObjectId válido
   * 3️⃣ Busca o pedido
   * 4️⃣ Atualiza o status
   */
  async update(req, res) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false, strict: true });

      const { status } = req.body;
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: 'ID do pedido inválido.',
        });
      }

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          error: 'Pedido não encontrado.',
        });
      }

      order.status = status;
      await order.save();

      return res.json({
        message: 'Status do pedido atualizado com sucesso.',
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: 'Erro ao atualizar pedido',
      });
    }
  }

  /**
   * Listar pedidos
   * --------------
   * Retorna todos os pedidos cadastrados
   */

  async index(req, res) {
    try {
      const { userIsAdmin, userId } = req;

      const query = userIsAdmin ? {} : { 'user.id': userId };

      const orders = await Order.find(query).sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: 'Erro ao buscar pedidos',
      });
    }
  }
}

export default new OrderController();
