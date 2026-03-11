import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import api from '../../services/api.js';
import { CardProduct } from '../CardProduct';
import { Container, SectionLabel, Title, TitleBadge } from './styles.js';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      const onlyOffers = data.filter((product) => product.offer);

      setOffers(onlyOffers);
    }

    loadProducts();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1280 }, items: 4 },
    tablet: { breakpoint: { max: 1280, min: 690 }, items: 3 },
    mobile: { breakpoint: { max: 690, min: 0 }, items: 2 },
  };

  return (
    <Container>
      <SectionLabel>
        <TitleBadge>Destaques</TitleBadge>
      </SectionLabel>
      <Title>
        Nossas <span>Ofertas</span>
      </Title>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3500}
        itemClass="carousel-item"
      >
        {offers.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </Carousel>
    </Container>
  );
}
