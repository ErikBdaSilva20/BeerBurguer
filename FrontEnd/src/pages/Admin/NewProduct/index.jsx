import { yupResolver } from '@hookform/resolvers/yup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useUser } from '../../../hooks/UserContext';
import { ErrorMessage } from '../../../layouts/AdminLayout/styles.js';
import api from '../../../services/api.js';
import {
  Container,
  Form,
  Input,
  InputGroup,
  Label,
  LabelUpload,
  Select,
  SubmitButton,
} from './styles.js';

/* =========================
   🔹 SCHEMA
========================= */

const schema = Yup.object({
  name: Yup.string().min(4, 'Mínimo de 4 caracteres').required('Nome obrigatório'),
  price: Yup.string()
    .matches(/^\d{1,7}$/, 'Preço inválido')
    .required('Preço obrigatório'),
  category_id: Yup.string().required('Categoria obrigatória'),
  offer: Yup.boolean(),
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

export function NewProduct() {
  const [categories, setCategories] = useState([]);
  const [filename, setFilename] = useState(null);
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
     🔹 CARREGA CATEGORIAS
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
      formData.append('price', data.price);
      formData.append('category_id', data.category_id);
      formData.append('offer', data.offer ? 'true' : 'false'); // envia como string
      formData.append('file', data.file[0]);

      await toast.promise(api.post('/products', formData), {
        pending: 'Criando produto...',
        success: 'Produto criado!',
        error: 'Erro ao criar produto',
      });

      setTimeout(() => {
        navigate('/admin/produtos');
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      toast.error('Erro ao criar produto.');
    }
  };

  /* =========================
     🔹 JSX
  ========================== */

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* NOME */}
        <InputGroup>
          <Label>
            <LocalOfferIcon /> Nome do produto
          </Label>
          <Input {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputGroup>

        {/* PREÇO */}
        <InputGroup>
          <Label>
            <AttachMoneyIcon /> Valor do produto
          </Label>
          <Input type="text" inputMode="numeric" maxLength={7} {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </InputGroup>

        {/* IMAGEM */}
        <InputGroup>
          <LabelUpload>
            <ImageIcon /> Enviar imagem
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

        {/* CATEGORIA */}
        <InputGroup>
          <Label>
            <CategoryIcon /> Categoria
          </Label>
          <Select {...register('category_id')}>
            <option value="">Selecione</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <ErrorMessage>{errors.category_id?.message}</ErrorMessage>
        </InputGroup>

        {/* OFFER */}
        <InputGroup>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input className="checkbox" type="checkbox" {...register('offer')} />
            <Label>Produto em Oferta ?</Label>
          </div>
        </InputGroup>

        {isSuperAdmin && <SubmitButton type="submit">Salvar</SubmitButton>}
      </Form>
    </Container>
  );
}
