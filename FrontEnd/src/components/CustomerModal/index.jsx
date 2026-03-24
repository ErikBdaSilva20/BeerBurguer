import { useState } from 'react';
import {
  CloseBtn,
  ErrorMsg,
  Field,
  Form,
  Heading,
  Overlay,
  SubmitBtn,
  Subheading,
  Wrapper,
} from './styles.js';

/**
 * Modal para coletar nome, e-mail e CPF/CNPJ do cliente antes de gerar o pagamento.
 *
 * Props:
 *  - onSubmit: (customer: { name, email, cpfCnpj }) => void
 *  - onClose: () => void
 */
export function CustomerModal({ onSubmit, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', cpfCnpj: '' });
  const [errors, setErrors] = useState({});

  const formatCpf = (value) =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
      .slice(0, 14);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'cpfCnpj' ? formatCpf(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Nome obrigatório';
    if (!form.email.includes('@')) newErrors.email = 'E-mail inválido';
    const digits = form.cpfCnpj.replace(/\D/g, '');
    if (digits.length !== 11 && digits.length !== 14)
      newErrors.cpfCnpj = 'CPF (11 dígitos) ou CNPJ (14 dígitos) inválido';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      cpfCnpj: form.cpfCnpj.replace(/\D/g, ''), // envia apenas dígitos
    });
  };

  return (
    <Overlay>
      <Wrapper>
        <CloseBtn onClick={onClose} aria-label="Fechar">×</CloseBtn>
        <Heading>Dados para pagamento</Heading>
        <Subheading>Precisamos de algumas informações para gerar sua cobrança.</Subheading>

        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="customer-name">Nome completo</label>
            <input
              id="customer-name"
              name="name"
              type="text"
              placeholder="João da Silva"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </Field>

          <Field>
            <label htmlFor="customer-email">E-mail</label>
            <input
              id="customer-email"
              name="email"
              type="email"
              placeholder="joao@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
          </Field>

          <Field>
            <label htmlFor="customer-cpf">CPF / CNPJ</label>
            <input
              id="customer-cpf"
              name="cpfCnpj"
              type="text"
              placeholder="000.000.000-00"
              value={form.cpfCnpj}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={18}
            />
            {errors.cpfCnpj && <ErrorMsg>{errors.cpfCnpj}</ErrorMsg>}
          </Field>

          <SubmitBtn type="submit">Continuar para pagamento</SubmitBtn>
        </Form>
      </Wrapper>
    </Overlay>
  );
}
