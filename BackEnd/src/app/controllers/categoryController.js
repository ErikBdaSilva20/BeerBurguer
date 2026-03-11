import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { fileURLToPath } from 'url';
import * as Yup from 'yup';
import Category from '../models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.resolve(__dirname, '..', '..', '..', 'uploads');

// 🔹 helper para remover imagens do ess
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
 * CategoryController
 * -------------------
 * Responsável por gerenciar as categorias da aplicação.
 *
 * Funcionalidades:
 * - Criar categorias com nome e imagem
 * - Listar todas as categorias cadastradas
 *
 * Fluxo do método store (criação):
 * 1. Define um schema de validação com Yup
 *    - Valida se o campo "name" foi enviado no body
 * 2. Valida os dados da requisição (req.body)
 *    - Retorna erros detalhados se a validação falhar
 * 3. Extrai os dados necessários:
 *    - name (do body)
 *    - filename (da imagem enviada via multipart/form-data)
 * 4. Verifica no banco se já existe uma categoria com o mesmo nome
 *    - Evita duplicidade de categorias
 * 5. Cria a nova categoria no banco de dados
 *    - Salva o nome e o caminho da imagem
 * 6. Retorna a categoria criada com status 201
 *
 * Fluxo do método index (listagem):
 * - Busca todas as categorias no banco de dados
 * - Retorna a lista completa em formato JSON
 *
 */

class CategoryController {
  async store(req, res) {
    try {
      const schema = Yup.object({
        name: Yup.string().required('Nome é obrigatório'),
      });

      await schema.validate(req.body, { abortEarly: false });

      const { name } = req.body;

      const existingCategory = await Category.findOne({ where: { name } });

      if (existingCategory) {
        if (req.file) {
          const filePath = path.resolve(__dirname, '..', '..', '..', 'uploads', req.file.filename);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Erro ao remover imagem:', err.message);
            }
          });
        }

        return res.status(409).json({ error: 'Category already exists' });
      }

      const newCategory = await Category.create({
        name,
        path: req.file ? req.file.filename : null,
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object({
        name: Yup.string(),
      });

      await schema.validate(req.body, { abortEarly: false });

      const { name } = req.body;
      const { id } = req.params;

      // 🔹 BUSCA A CATEGORIA ATUAL (NOVO)
      const category = await Category.findByPk(id);

      if (!category) {
        if (req.file) deleteImage(req.file.filename);
        return res.status(404).json({ error: 'Category not found' });
      }

      // 🔹 VERIFICA SE HOUVE ALTERAÇÃO REAL (NOVO)
      const nameChanged = name && name !== category.name;
      const imageChanged = !!req.file;

      // 🔹 SE NADA MUDOU, BLOQUEIA E LIMPA IMAGEM (NOVO)
      if (!nameChanged && !imageChanged) {
        if (req.file) deleteImage(req.file.filename);

        return res.status(400).json({
          error: 'Nenhuma alteração detectada',
        });
      }

      // 🔹 BLOQUEIA NOME DUPLICADO EM OUTRA CATEGORIA
      if (nameChanged) {
        const existingCategory = await Category.findOne({
          where: {
            name,
            id: { [Op.ne]: id },
          },
        });

        if (existingCategory) {
          if (req.file) deleteImage(req.file.filename);

          return res.status(400).json({ error: 'Category already exists' });
        }
      }

      // 🔹 SE TROCOU A IMAGEM, REMOVE A ANTIGA (NOVO)
      if (imageChanged && category.path) {
        deleteImage(category.path);
      }

      // 🔹 ATUALIZA DE FATO
      await category.update({
        name: name ?? category.name,
        path: imageChanged ? req.file.filename : category.path,
      });

      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ message: error.message });
    }
  }

  async index(_req, res) {
    try {
      const categories = await Category.findAll();
      console.log(_req.userId);

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar categorias',
      });
    }
  }
}

export default new CategoryController();
