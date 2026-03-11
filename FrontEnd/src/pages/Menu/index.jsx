import SearchIcon from '@mui/icons-material/Search';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardProduct } from '../../components/CardProduct';
import api from '../../services/api';
import {
  Banner,
  BannerLeft,
  BannerRight,
  CategorieButton,
  CategoriesMenu,
  Container,
  NoProductsFound,
  ProductsContainer,
  SearchContainer,
  SearchInput,
  SearchWrapper,
} from './styles';

export function Menu() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // categoria ativa SEMPRE string
  const [activeCategory, setActiveCategory] = useState('0');
  const [searchQuery, setSearchQuery] = useState('');

  // carregar categorias e produtos
  useEffect(() => {
    async function loadData() {
      const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
        api.get('/categories'),
        api.get('/products'),
      ]);

      setCategories([{ id: '0', name: 'Todas' }, ...categoriesData]);
      setProducts(productsData);
      setFilteredProducts(productsData);
    }

    loadData();
  }, []);

  // ler categoria da URL
  useEffect(() => {
    const params = new URLSearchParams(search);
    setActiveCategory(params.get('categoria') || '0');
  }, [search]);

  // filtrar produtos
  useEffect(() => {
    let filtered = products;

    // Filter by Category
    if (activeCategory !== '0') {
      filtered = filtered.filter((p) => p.category_id === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, products]);

  return (
    <Container>
      <Banner>
        <BannerLeft>
          <span>🍺 Cardápio</span>
          <h1>
            O Melhor
            <br />
            Hamburguer
            <br />e a Melhor Cerveja
          </h1>
        </BannerLeft>

        <BannerRight>
          <p>
            Quem resiste a esse cardápio? <br />
            Aproveite! Explore nossas categorias e escolha o seu favorito.
          </p>
        </BannerRight>
      </Banner>

      <CategoriesMenu>
        {categories.map((category) => (
          <CategorieButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() =>
              navigate(
                {
                  pathname: '/menu',
                  search: `?categoria=${category.id}`,
                },
                { replace: true }
              )
            }
          >
            {category.name}
          </CategorieButton>
        ))}
      </CategoriesMenu>

      <SearchContainer>
        <SearchWrapper>
          <SearchIcon />
          <SearchInput
            placeholder="O que você deseja saborear hoje?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchWrapper>
      </SearchContainer>

      <ProductsContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <CardProduct key={product.id} product={product} />)
        ) : (
          <NoProductsFound>
            <SentimentVeryDissatisfiedIcon />
            <p>Nenhum produto encontrado com este nome.</p>
          </NoProductsFound>
        )}
      </ProductsContainer>
    </Container>
  );
}
