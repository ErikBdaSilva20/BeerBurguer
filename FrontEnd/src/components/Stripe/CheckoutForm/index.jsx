import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext.jsx';
import api from '../../../services/api.js';
import { ErrorMessage, Form, SubmitButton, Wrrapper } from './styles.js';

export function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { cartProducts, clearCart } = useCart();

  async function createOrder() {
    const products = cartProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      price: product.price,
    }));

    return api.post('/orders', { products }, { validateStatus: () => true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    try {
      // 1. Obtém o Client Secret (que já temos ou via stripe elements)
      // O clientSecret do PaymentIntent é necessário para vincular o pedido
      const { paymentIntent, error: submitError } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (submitError) {
        setMessage(submitError.message);
        toast.error(submitError.message);
        setIsLoading(false);
        return;
      }

      if (
        paymentIntent &&
        (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')
      ) {
        // 2. Cria o pedido no backend já registrando o intent do Stripe
        const products = cartProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
        }));

        const { status } = await api.post(
          '/orders',
          {
            products,
            payment_intent_id: paymentIntent.id,
            payment_method: paymentIntent.payment_method_types[0],
          },
          { validateStatus: () => true }
        );

        if (status === 200 || status === 201) {
          toast.success('Pagamento e pedido registrados!');
          clearCart();

          navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`, {
            state: { status: 'success' },
          });
        } else {
          toast.warn(
            'Pagamento realizado, mas houve um problema ao registrar seu pedido. Entre em contato com o suporte.'
          );
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro ao processar checkout. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrrapper>
      <Form onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />

        {message && <ErrorMessage>{message}</ErrorMessage>}

        <SubmitButton type="submit" disabled={!stripe || isLoading}>
          {isLoading ? 'Confirmando...' : 'Finalizar Pagamento'}
        </SubmitButton>
      </Form>

      {dpmCheckerLink && (
        <section className="dpm-link">
          <p>
            Os métodos de pagamento são disponibilizados de acordo com sua região.{' '}
            <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer">
              Ver métodos disponíveis
            </a>
          </p>
        </section>
      )}
    </Wrrapper>
  );
}

export default CheckoutForm;
