import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

/*    🔹 CONFIGURAÇÃO DE PATH PARA UPLOADS
   (MESMO PADRÃO DO CATEGORY CONTROLLER) */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.resolve(__dirname, '..', '..', '..', 'uploads');

/*    🔹 HELPER PARA REMOVER IMAGEM
   (EVITA LIXO NO SERVIDOR) */

function deleteImage(filename) {
  if (!filename) return;

  const filePath = path.resolve(uploadPath, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Erro ao remover imagem:', err.message);
    }
  });
}

/**
 * ProductController
 * -----------------
 * Responsável por gerenciar os produtos da aplicação.
 *
 * Funcionalidades:
 * - Criar produtos com nome, preço, imagem e vínculo com categoria
 * - Editar produtos existentes
 * - Listar produtos com suas respectivas categorias
 *
 * Regras de negócio:
 * - Todo produto deve possuir uma categoria válida
 * - A imagem do produto é obrigatória na criação
 * - O campo "offer" indica se o produto está em promoção ou não
 *
 * Fluxo do método store (criação):
 * 1. Define e executa a validação dos dados de entrada com Yup
 *    - name, price e category_id são obrigatórios
 * 2. Valida a existência da imagem enviada via multipart/form-data
 * 3. Verifica se a categoria informada existe no banco de dados
 * 4. Cria o produto no banco com os dados validados
 * 5. Retorna o produto criado com status 201
 *
 * Fluxo do método update (edição):
 * 1. Valida os campos enviados (todos opcionais)
 * 2. Identifica o produto pelo ID (UUID)
 * 3. Atualiza a imagem apenas se um novo arquivo for enviado
 * 4. Valida a categoria, caso seja informada
 * 5. Atualiza os dados do produto no banco
 * 6. Retorna status 200 em caso de sucesso ou 404 se o produto não existir
 *
 * Fluxo do método index (listagem):
 * - Lista todos os produtos cadastrados
 * - Inclui os dados básicos da categoria associada
 *
 * Observações:
 * - Utiliza Sequelize como ORM
 * - Utiliza Yup para validação dos dados
 * - Trabalha em conjunto com middleware de upload (multer)
 * - Segue padrão REST para respostas HTTP
 */

class ProductController {
  /* ======================================================
     🔹 STORE — CRIAR PRODUTO
  ====================================================== */
  async store(req, res) {
    try {
      /* 🔹 VALIDAÇÃO DE DADOS */
      const schema = Yup.object({
        name: Yup.string().required('Nome é obrigatório'),
        price: Yup.string()
          .matches(/^\d{1,7}$/, 'Preço inválido')
          .required('Preço é obrigatório'),
        category_id: Yup.string().required('Categoria é obrigatória'),
        offer: Yup.boolean().transform((value, originalValue) => {
          if (originalValue === 'true') return true;
          if (originalValue === 'false' || originalValue === undefined) return false;
          return value;
        }),
      });

      await schema.validate(req.body, { abortEarly: false });

      const { name, price, category_id, offer } = req.body;
      const { filename } = req.file || {};

      if (!filename) {
        return res.status(400).json({ error: 'Imagem é obrigatória' });
      }

      /* 🔹 VALIDA SE A CATEGORIA EXISTE */
      const category = await Category.findByPk(category_id);
      if (!category) {
        // 🔥 LIMPA A IMAGEM SE A CATEGORIA FOR INVÁLIDA
        deleteImage(filename);

        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      /* 🔹 CRIA O PRODUTO */
      const newProduct = await Product.create({
        name,
        price,
        category_id,
        path: filename,
        offer,
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('🔥 ERRO AO CRIAR PRODUTO:', error);

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({
        message: 'Erro interno ao criar produto',
      });
    }
  }

  /* ======================================================
     🔹 UPDATE — ATUALIZAR PRODUTO
  ====================================================== */
  async update(req, res) {
    try {
      /* 🔹 VALIDAÇÃO FLEXÍVEL */
      const schema = Yup.object({
        name: Yup.string(),
        price: Yup.string().matches(/^\d{1,7}$/, 'Preço inválido'),

        category_id: Yup.string(),
        offer: Yup.boolean(),
      });

      await schema.validate(req.body, { abortEarly: false });

      const { name, price, category_id, offer } = req.body;
      const { id } = req.params;

      /* 🔹 BUSCA O PRODUTO (MELHORIA PROFISSIONAL) */
      const product = await Product.findByPk(id);

      if (!product) {
        // 🔥 SE VEIO IMAGEM, REMOVE
        if (req.file) deleteImage(req.file.filename);

        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      /* 🔹 SE INFORMAR CATEGORIA, VALIDA */
      if (category_id) {
        const category = await Category.findByPk(category_id);

        if (!category) {
          if (req.file) deleteImage(req.file.filename);

          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
      }

      /* 🔹 SE TROCOU IMAGEM, REMOVE A ANTIGA */
      if (req.file && product.path) {
        deleteImage(product.path);
      }

      /* 🔹 ATUALIZA O PRODUTO */
      await product.update({
        name: name ?? product.name,
        price: price ?? product.price,
        category_id: category_id ?? product.category_id,
        path: req.file ? req.file.filename : product.path,
        offer: offer ?? product.offer,
      });

      return res.status(200).json(product);
    } catch (error) {
      console.error('🔥 ERRO AO ATUALIZAR PRODUTO:', error);

      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({
        message: 'Erro interno ao atualizar produto',
      });
    }
  }

  /* ======================================================
     🔹 INDEX — LISTAR PRODUTOS
  ====================================================== */
  async index(_req, res) {
    try {
      const products = await Product.findAll({
        include: {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      });

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar produtos',
      });
    }
  }

  /* ======================================================
   🔹 DELETE — EXCLUIR PRODUTO
====================================================== */
  async delete(req, res) {
    try {
      const { id } = req.params;

      // 🔹 BUSCA O PRODUTO
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // 🔹 REMOVE A IMAGEM DO SERVIDOR
      if (product.path) {
        deleteImage(product.path);
      }

      // 🔹 REMOVE DO BANCO
      await product.destroy();

      return res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error('🔥 ERRO AO DELETAR PRODUTO:', error);
      return res.status(500).json({ message: 'Erro interno ao excluir produto' });
    }
  }
}

export default new ProductController();
