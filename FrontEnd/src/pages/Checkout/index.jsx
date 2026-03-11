import { ArrowBack } from '@mui/icons-material';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckoutForm } from '../../components';
import { appearance } from '../../components/Stripe/appearance';
import { stripePromise } from '../../components/Stripe/stripePromise';

import { BackButton, Container, Content, Title } from './styles';

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { clientSecret, dpmCheckerLink } = location.state || {};

  useEffect(() => {
    if (!clientSecret) {
      toast.error('Sessão de pagamento expirada ou inválida.');
      navigate('/carrinho');
    }
  }, [clientSecret, navigate]);

  if (!clientSecret) return null;

  return (
    <Container>
      <Content>
        <header>
          <BackButton onClick={() => navigate('/carrinho')}>
            <ArrowBack /> Voltar ao carrinho
          </BackButton>
          <Title>Finalizar Pagamento</Title>
          <p className="subtitle">Escolha sua forma de pagamento preferida de forma segura.</p>
        </header>

        <section className="stripe-container">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance,
            }}
          >
            <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
          </Elements>
        </section>

        <footer>
          <div className="security-badges">
            <span className="badge">
              <i className="fas fa-lock"></i> Pagamento 100% Seguro
            </span>
            <span className="badge">
              <i className="fas fa-check-circle"></i> Processado por Stripe
            </span>
          </div>
        </footer>
      </Content>
    </Container>
  );
}
