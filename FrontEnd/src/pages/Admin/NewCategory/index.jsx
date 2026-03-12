import { yupResolver } from '@hookform/resolvers/yup';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useUser } from '../../../hooks/UserContext';
import { ErrorMessage } from '../../../layouts/AdminLayout/styles.js';
import api from '../../../services/api.js';
import { Container, Form, Input, InputGroup, Label, LabelUpload, SubmitButton } from './styles.js';

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

      setTimeout(() => {
        navigate('/admin/produtos'); // redireciona de volta
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      toast.error('Erro ao criar categoria.');
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
            <CategoryIcon /> Nome da Categoria
          </Label>
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
    </Container>
  );
}
