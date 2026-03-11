import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext.jsx';
import api from '../../services/api.js';
import { formatPrice } from '../../utils/formatPrice.js';

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
  const Navigate = useNavigate();
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(200);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const { cartProducts } = useCart();

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setFinalPrice(sumAllItems);
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = cartProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      price: product.price,
      name: product.name,
    }));

    try {
      const { data } = await api.post('/create-payment-preference', { products, paymentMethod });
      window.location.href = data.init_point;
    } catch (error) {
      console.log(error);
      toast.error('Erro no sistema. Tente novamente');
    }
  };

  return (
    <>
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

        <Button onClick={submitOrder}>Finalizar Pedido</Button>

        <button onClick={() => Navigate('/menu')} className="backToAddMoreProducts">
          ← Adicionar mais produtos
        </button>
      </Container>
    </>
  );
}
