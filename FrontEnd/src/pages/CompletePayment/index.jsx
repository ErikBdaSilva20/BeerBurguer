import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
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

// Mapeamento de status do Asaas → conteúdo da tela
const STATUS_CONTENT_MAP = {
  // Asaas retorna: RECEIVED | CONFIRMED | PENDING | OVERDUE | REFUNDED
  RECEIVED: {
    text: 'Pagamento recebido com sucesso! 🎉',
    iconColor: '#22c55e',
    icon: CheckCircleIcon,
    buttonText: 'Ver meus pedidos',
    url: '/meus-pedidos',
    shouldCreateOrder: true,
  },
  CONFIRMED: {
    text: 'Pagamento confirmado com sucesso! 🎉',
    iconColor: '#22c55e',
    icon: CheckCircleIcon,
    buttonText: 'Ver meus pedidos',
    url: '/meus-pedidos',
    shouldCreateOrder: true,
  },
  PENDING: {
    text: 'Seu pagamento está em processamento.',
    iconColor: '#facc15',
    icon: InfoIcon,
    buttonText: 'Ir para a home',
    url: '/',
    shouldCreateOrder: false,
  },
  OVERDUE: {
    text: 'O prazo do pagamento expirou.',
    iconColor: '#ef4444',
    icon: ErrorIcon,
    buttonText: 'Voltar ao carrinho',
    url: '/carrinho',
    shouldCreateOrder: false,
  },
  // Parâmetro genérico de sucesso que o Asaas pode enviar via URL
  success: {
    text: 'Pagamento realizado com sucesso! 🎉',
    iconColor: '#22c55e',
    icon: CheckCircleIcon,
    buttonText: 'Ver meus pedidos',
    url: '/meus-pedidos',
    shouldCreateOrder: true,
  },
  failure: {
    text: 'Seu pagamento falhou ou foi recusado.',
    iconColor: '#ef4444',
    icon: ErrorIcon,
    buttonText: 'Voltar ao carrinho',
    url: '/carrinho',
    shouldCreateOrder: false,
  },
  default: {
    text: 'Não foi possível confirmar seu pagamento.',
    iconColor: '#ef4444',
    icon: ErrorIcon,
    buttonText: 'Voltar ao carrinho',
    url: '/carrinho',
    shouldCreateOrder: false,
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
    const params = new URLSearchParams(location.search);

    // Asaas envia: ?status=success&paymentId=pay_xxx  (ou similar)
    // Também suporta o padrão legado do Mercado Pago por compatibilidade
    const rawStatus =
      params.get('status') ||
      params.get('collection_status') ||
      'default';

    const pid =
      params.get('paymentId') ||
      params.get('payment_id') ||
      null;

    // Normaliza status para a chave do mapa
    const normalizedStatus = STATUS_CONTENT_MAP[rawStatus] ? rawStatus : 'default';
    setStatus(normalizedStatus);

    if (pid) setPaymentId(pid);

    const content = STATUS_CONTENT_MAP[normalizedStatus];

    if (content?.shouldCreateOrder && pid && !hasCreatedOrder.current && cartProducts.length > 0) {
      hasCreatedOrder.current = true;

      const products = cartProducts.map((p) => ({
        id: p.id,
        quantity: p.quantity,
        price: p.price,
      }));

      api
        .post(
          '/orders',
          {
            products,
            payment_intent_id: pid,
            payment_method: 'asaas',
          },
          { validateStatus: () => true }
        )
        .then(({ status: httpStatus }) => {
          if (httpStatus === 200 || httpStatus === 201) {
            clearCart();
          }
        })
        .catch((err) => console.error('Erro ao registrar pedido:', err));
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
