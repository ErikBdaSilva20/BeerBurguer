import { yupResolver } from '@hookform/resolvers/yup';
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import ListIcon from '@mui/icons-material/List';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useUser } from '../../../hooks/UserContext';
import { ErrorMessage } from '../../../layouts/AdminLayout/styles.js';
import api from '../../../services/api.js';
import {
  ActionButton,
  CategoryInfo,
  CategoryItem,
  CategoryList,
  Container,
  Form,
  Input,
  InputGroup,
  Label,
  LabelUpload,
  SubmitButton,
  Title,
} from './styles.js';

/* =========================
   🔹 SCHEMA
========================= */

const schema = Yup.object({
  name: Yup.string().min(4, 'Mínimo de 4 caracteres').required('Nome obrigatório'),
  file: Yup.mixed()
    .required('Imagem obrigatória')
    .test('fileType', 'Formato inválido', (value) =>
      value?.[0] ? ['image/png', 'image/jpeg', 'image/webp'].includes(value[0].type) : false
    )
    .test('fileSize', 'Máx 5MB', (value) =>
      value?.[0] ? value[0].size <= 5 * 1024 * 1024 : false
    ),
});

/* =========================
   🔹 COMPONENTE
========================= */

export function NewCategory() {
  const [filename, setFilename] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const isSuperAdmin = userInfo?.email === 'erikborgesdasilva574@gmail.com';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  /* =========================
     🔹 LOAD CATEGORIES
  ========================== */

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }

    loadCategories();
  }, []);

  /* =========================
     🔹 SUBMIT
  ========================== */

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('file', data.file[0]);

      await toast.promise(api.post('/categories', formData), {
        pending: 'Criando categoria...',
        success: 'Categoria criada!',
        error: 'Erro ao criar categoria',
      });

      // Recarrega a lista
      const { data: updatedCategories } = await api.get('/categories');
      setCategories(updatedCategories);

      // Limpa o formulário
      setValue('name', '');
      setValue('file', null);
      setFilename(null);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      toast.error('Erro ao criar categoria.');
    }
  };

  /* =========================
     🔹 DELETE
  ========================== */

  const deleteCategory = async (id) => {
    try {
      await toast.promise(api.delete(`/categories/${id}`), {
        pending: 'Deletando categoria...',
        success: 'Categoria removida!',
        error: 'Erro ao deletar categoria. Verifique se há produtos vinculados.',
      });

      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  };

  /* =========================
     🔹 JSX
  ========================== */

  return (
    <Container style={{ flexDirection: 'column', padding: '100px 24px' }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <CategoryIcon /> Nova Categoria
        </Title>
        {/* NOME */}
        <InputGroup>
          <Label>Nome da Categoria</Label>
          <Input {...register('name')} placeholder="Ex: Bebidas" />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputGroup>

        {/* IMAGEM */}
        <InputGroup>
          <LabelUpload>
            <ImageIcon /> Enviar imagem da Categoria
            <Input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                setValue('file', e.target.files, { shouldValidate: true });
                setFilename(e.target.files?.[0]?.name || null);
              }}
            />
            {filename}
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </InputGroup>

        {isSuperAdmin && <SubmitButton type="submit">Salvar Categoria</SubmitButton>}
      </Form>

      {/* LISTA DE CATEGORIAS EXISTENTES */}
      <CategoryList>
        <Title>
          <ListIcon /> Categorias Existentes
        </Title>
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryInfo>
              <img src={category.url} alt={category.name} />
              <span>{category.name}</span>
            </CategoryInfo>

            {isSuperAdmin && (
              <ActionButton
                type="button"
                onClick={() => {
                  if (window.confirm(`Deseja realmente excluir a categoria "${category.name}"?`)) {
                    deleteCategory(category.id);
                  }
                }}
              >
                <DeleteIcon />
              </ActionButton>
            )}
          </CategoryItem>
        ))}

        {categories.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontSize: '0.9rem' }}>
            Nenhuma categoria encontrada.
          </p>
        )}
      </CategoryList>
    </Container>
  );
}
