import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext.jsx';
import { createPayment } from '../../services/paymentService.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { CustomerModal } from '../CustomerModal/index.jsx';
import { PixModal } from '../PixModal/index.jsx';

import {
  Button,
  Container,
  ContainerBottom,
  ContainerTop,
  LineItem,
  PaymentOptions,
  Title,
  Total,
} from './styles.js';

export function CartResume() {
  const navigate = useNavigate();
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(200); // centavos
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);

  // Controle de modais
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixData, setPixData] = useState(null);       // { qrCode, paymentId, value }

  const { cartProducts, clearCart } = useCart();

  useEffect(() => {
    const sum = cartProducts.reduce((acc, p) => p.price * p.quantity + acc, 0);
    setFinalPrice(sum);
  }, [cartProducts]);

  // Chamado quando o usuário preenche os dados no CustomerModal
  const handleCustomerSubmit = async (customer) => {
    setShowCustomerModal(false);
    setLoading(true);

    const products = cartProducts.map((p) => ({
      id: p.id,
      quantity: p.quantity,
      price: p.price,
      name: p.name,
    }));

    try {
      const data = await createPayment({ products, paymentMethod, customer });

      if (data.method === 'pix') {
        // Exibe modal com QR Code
        setPixData({ qrCode: data.qrCode, paymentId: data.paymentId, value: data.value });
        setShowPixModal(true);
      } else {
        // Cartão → redireciona ao checkout do Asaas
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error(error);
      const msg =
        error?.response?.data?.error || 'Erro no pagamento. Tente novamente.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Chamado quando o polling confirma pagamento Pix
  const handlePixSuccess = () => {
    setShowPixModal(false);

    // Cria o pedido no backend e limpa o carrinho
    const products = cartProducts.map((p) => ({
      id: p.id,
      quantity: p.quantity,
      price: p.price,
    }));

    import('../../services/api.js').then(({ default: api }) => {
      api
        .post('/orders', {
          products,
          payment_intent_id: pixData?.paymentId,
          payment_method: 'asaas_pix',
        }, { validateStatus: () => true })
        .then(({ status }) => {
          if (status === 200 || status === 201) {
            clearCart();
            toast.success('🎉 Pedido confirmado!');
            navigate('/meus-pedidos');
          }
        })
        .catch((err) => console.error('Erro ao registrar pedido:', err));
    });
  };

  return (
    <>
      {showCustomerModal && (
        <CustomerModal
          onSubmit={handleCustomerSubmit}
          onClose={() => setShowCustomerModal(false)}
        />
      )}

      {showPixModal && pixData && (
        <PixModal
          qrCode={pixData.qrCode}
          paymentId={pixData.paymentId}
          value={pixData.value}
          onSuccess={handlePixSuccess}
          onClose={() => setShowPixModal(false)}
        />
      )}

      <Container>
        <ContainerTop>
          <Title>Resumo do Pedido</Title>

          <LineItem>
            <span>Itens</span>
            <span>{formatPrice(finalPrice)}</span>
          </LineItem>

          <LineItem>
            <span>Taxa de entrega</span>
            <span>{formatPrice(deliveryTax)}</span>
          </LineItem>
        </ContainerTop>

        <ContainerBottom>
          <Total>Total</Total>
          <Total $big>{formatPrice(finalPrice + deliveryTax)}</Total>
        </ContainerBottom>

        <PaymentOptions>
          <p>Forma de pagamento</p>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="pix"
              checked={paymentMethod === 'pix'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>
              <AccountBalanceWalletIcon style={{ color: '#00BFA5' }} /> PIX
            </span>
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>
              <CreditCardIcon style={{ color: '#4f8ef7' }} /> Cartão de Crédito
            </span>
          </label>
        </PaymentOptions>

        <Button
          onClick={() => setShowCustomerModal(true)}
          type="button"
          disabled={loading || cartProducts.length === 0}
        >
          {loading ? 'Gerando pagamento…' : 'Finalizar Pedido'}
        </Button>

        <button onClick={() => navigate('/menu')} className="backToAddMoreProducts">
          ← Adicionar mais produtos
        </button>
      </Container>
    </>
  );
}
