import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

import {
  Container,
  Content,
  EmptyState,
  OrderCard,
  OrderFooter,
  OrderHeader,
  ProductItem,
  ProductsList,
  StatusBadge,
  Title,
} from './styles';

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <Container>
        <Title>Carregando...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Title>
          Meus <span>Pedidos</span>
        </Title>

        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order._id}>
              <OrderHeader>
                <div>
                  <span>ID do Pedido</span>
                  <strong>{order._id.substring(0, 8).toUpperCase()}</strong>
                </div>
                <div>
                  <span>Data</span>
                  <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
                </div>
                <StatusBadge $status={order.status}>{order.status}</StatusBadge>
              </OrderHeader>

              <ProductsList>
                {order.products.map((product) => (
                  <ProductItem key={product.id}>
                    <img src={product.url} alt={product.name} />
                    <div>
                      <p>{product.name}</p>
                      <span>
                        {product.quantity}x {formatPrice(product.price)}
                      </span>
                    </div>
                    <strong>{formatPrice(product.price * product.quantity)}</strong>
                  </ProductItem>
                ))}
              </ProductsList>

              <OrderFooter>
                <span className="total-label">Total do Pedido</span>
                <span className="total-value">
                  {formatPrice(
                    order.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                  )}
                </span>
              </OrderFooter>
            </OrderCard>
          ))
        ) : (
          <EmptyState>
            <ShoppingBagIcon />
            <p>Você ainda não realizou nenhum pedido.</p>
            <button onClick={() => navigate('/menu')}>Ver Cardápio</button>
          </EmptyState>
        )}
      </Content>
    </Container>
  );
}
