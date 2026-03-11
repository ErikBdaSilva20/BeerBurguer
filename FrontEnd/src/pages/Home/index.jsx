import { useUser } from '../../hooks/UserContext.jsx';
import {
  Banner,
  BannerContent,
  BannerScrollIndicator,
  BannerSubtitle,
  BannerTag,
  BannerTitle,
  Container,
  Content,
  Main,
  SectionHeader,
} from './styles.js';

import { CategoriesCarousel, OffersCarousel } from '../../components';

export function Home() {
  const { userInfo } = useUser();

  return (
    <>
      <Main>
        {/* ===== HERO BANNER ===== */}
        <Banner>
          <BannerContent>
            <BannerTag>🍔 Beer Burguer — Est. 2024</BannerTag>
            <BannerTitle>
              Vai de <span>Podrão?</span>
              <br />
              Ou de Breja?
            </BannerTitle>
            <BannerSubtitle>
              Os melhores hambúrgueres artesanais e cervejas geladas, direto pra você.
            </BannerSubtitle>
          </BannerContent>

          <BannerScrollIndicator>
            <span>👇</span>
          </BannerScrollIndicator>
        </Banner>

        {/* ===== PRODUCTS SECTION ===== */}
        <Container>
          <SectionHeader>
            <h1>
              Nossos <span>Produtos</span>
            </h1>
            <p>Escolha o seu favorito e adicione ao carrinho</p>
          </SectionHeader>

          <Content>
            <CategoriesCarousel />
            <OffersCarousel />
          </Content>
        </Container>
      </Main>
    </>
  );
}
