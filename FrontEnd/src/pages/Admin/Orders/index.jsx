import { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Typography } from '@mui/material';
import api from '../../../services/api.js';
import { useUser } from '../../../hooks/UserContext';
import { Row, createData, orderStatusOptions } from './TableRow.jsx';
import { Container, SelectButton, SelectProductsByFilter } from './styles.js';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrdersMenu, setFilteredOrdersMenu] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0); // 0 = Todos

  const [loading, setLoading] = useState(true);
  const { userInfo } = useUser();

  useEffect(() => {
    async function fetchOrders() {
      // Mock data for visitors
      if (!userInfo?.admin) {
        const mockOrders = [
          {
            _id: '1',
            user: { name: 'Erik Batata' },
            createdAt: new Date().toISOString(),
            status: 'Pedido realizado',
            products: [
              { _id: 'p1', name: 'X-Burguer Clássico', quantity: 2, price: 2590 },
              { _id: 'p2', name: 'Batata Frita G', quantity: 1, price: 1500 }
            ],
            payment_method: 'PIX'
          },
          {
            _id: '2',
            user: { name: 'João Silva' },
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            status: 'Em preparação',
            products: [
              { _id: 'p3', name: 'Combo Família', quantity: 1, price: 12000 },
              { _id: 'p4', name: 'Coca-Cola 2L', quantity: 1, price: 1200 }
            ],
            payment_method: 'Cartão de Crédito'
          },
          {
            _id: '3',
            user: { name: 'Maria Oliveira' },
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            status: 'Entregue',
            products: [
              { _id: 'p5', name: 'Milkshake Ovomaltine', quantity: 2, price: 1800 }
            ],
            payment_method: 'Dinheiro'
          }
        ];
        
        const mappedRows = mockOrders.map(createData);
        setOrders(mappedRows);
        setFilteredOrdersMenu(mappedRows);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await api.get('/orders');
        const mappedRows = data.map(createData);
        setOrders(mappedRows);
        setFilteredOrdersMenu(mappedRows);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userInfo]);

  // Atualiza filtro sempre que orders ou activeStatus mudarem
  useEffect(() => {
    if (activeStatus === 0) {
      setFilteredOrdersMenu(orders);
    } else {
      const statusValue = orderStatusOptions.find((item) => item.id === activeStatus)?.value;
      const newFilteredOrders = orders.filter((order) => order.status === statusValue);
      setFilteredOrdersMenu(newFilteredOrders);
    }
  }, [activeStatus, orders]);

  function handleStatus(option) {
    setActiveStatus(option.id);
  }

  return (
    <Container>
      <SelectProductsByFilter>
        {orderStatusOptions.map((option) => {
          // Calcula a quantidade de pedidos para cada status
          const count =
            option.id === 0
              ? orders.length
              : orders.filter((order) => order.status === option.value).length;

          return (
            <SelectButton
              key={option.id}
              $activeStatus={activeStatus === option.id ? 'active' : 'inactive'}
              onClick={() => handleStatus(option)}
            >
              {option.label} ({count})
            </SelectButton>
          );
        })}
      </SelectProductsByFilter>

      <TableContainer className="TableContainer" component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className="Tc" />
              <TableCell className="Tc">ID do pedido</TableCell>
              <TableCell className="Tc">Cliente</TableCell>
              <TableCell className="Tc">Data</TableCell>
              <TableCell className="Tc">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" style={{ padding: '60px' }}>
                  <Typography variant="h6" className="Tc">
                    Carregando pedidos...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filteredOrdersMenu.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" style={{ padding: '40px' }}>
                  <Typography variant="body1" className="Tc">
                    Nenhum pedido encontrado nesta seção.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrdersMenu.map((row) => (
                <Row
                  key={row.orderId}
                  row={row}
                  orders={orders}
                  setOrders={setOrders}
                  activeStatus={activeStatus}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
