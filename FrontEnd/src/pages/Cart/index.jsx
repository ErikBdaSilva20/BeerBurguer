import logoCartBanner from '../../assets/BeerBurguerLogo.png';
import { CartItems, CartResume } from '../../components/index.js';
import { Banner, Container, Content, Title } from './styles.js';

export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={logoCartBanner} alt="Logo Cart" />
      </Banner>

      <Title>Checkout - Pedido</Title>

      <Content>
        <CartItems />
        <CartResume />
      </Content>
    </Container>
  );
}
