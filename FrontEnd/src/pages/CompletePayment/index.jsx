import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/CartContext';
import api from '../../services/api';
import {
  ButtonText,
  Card,
  Container,
  DetailsBox,
  StatusIcon,
  Table,
  TableContent,
  TableLabel,
  Title,
} from './styles';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const STATUS_CONTENT_MAP = {
  approved: {
    text: 'Pagamento realizado com sucesso!',
    iconColor: '#22c55e',
    icon: CheckCircleIcon,
    buttonText: 'Ver meus pedidos',
    url: '/meus-pedidos',
  },
  pending: {
    text: 'Seu pagamento está pendente / em processamento.',
    iconColor: '#64748b',
    icon: InfoIcon,
    buttonText: 'Ir para a home',
    url: '/',
  },
  failure: {
    text: 'Seu pagamento falhou ou foi rejeitado.',
    iconColor: '#ef4444',
    icon: ErrorIcon,
    buttonText: 'Voltar ao carrinho',
    url: '/carrinho',
  },
  default: {
    text: 'Eita, algo deu errado, tente novamente.',
    iconColor: '#ef4444',
    icon: ErrorIcon,
    buttonText: 'Voltar ao carrinho',
    url: '/carrinho',
  },
};

export function CompletePayment() {
  const [status, setStatus] = useState('default');
  const [paymentId, setPaymentId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartProducts, clearCart } = useCart();
  const hasCreatedOrder = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentStatus = searchParams.get('collection_status') || searchParams.get('status');
    const payment_id = searchParams.get('payment_id');

    if (paymentStatus) {
      if (['approved', 'pending', 'failure'].includes(paymentStatus)) {
        setStatus(paymentStatus);
      }
    }

    if (payment_id) {
      setPaymentId(payment_id);

      if (paymentStatus === 'approved' && !hasCreatedOrder.current && cartProducts.length > 0) {
        hasCreatedOrder.current = true;

        const products = cartProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
        }));

        api
          .post(
            '/orders',
            {
              products,
              payment_intent_id: payment_id,
              payment_method: 'mercado_pago',
            },
            { validateStatus: () => true }
          )
          .then(({ status }) => {
            if (status === 200 || status === 201) {
              clearCart();
            }
          })
          .catch((err) => console.error('Erro ao registrar pedido: ', err));
      }
    }
  }, [location, cartProducts, clearCart]);

  const content = STATUS_CONTENT_MAP[status] || STATUS_CONTENT_MAP.default;

  return (
    <Container>
      <Card>
        <StatusIcon color={content.iconColor}>
          <content.icon className="status-icon" />
        </StatusIcon>

        <Title>{content.text}</Title>

        {paymentId && (
          <DetailsBox>
            <Table>
              <tbody>
                <tr>
                  <TableLabel>ID do Pagamento</TableLabel>
                  <TableContent>{paymentId}</TableContent>
                </tr>
                <tr>
                  <TableLabel>Status</TableLabel>
                  <TableContent>{status}</TableContent>
                </tr>
              </tbody>
            </Table>
          </DetailsBox>
        )}

        <ButtonText as="button" onClick={() => navigate(content.url)}>
          {content.buttonText}
        </ButtonText>
      </Card>
    </Container>
  );
}
