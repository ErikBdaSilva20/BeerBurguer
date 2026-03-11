import PropTypes from 'prop-types';
import * as React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from '../../../services/api.js';
import { formatDate } from '../../../utils/formatDate.js';
import { formatPrice } from '../../../utils/formatPrice.js';
import { useUser } from '../../../hooks/UserContext';
import { SelectStatus, StatusBadge } from './styles.js';

// Opções de status do pedido
export const orderStatusOptions = [
  { id: 0, value: 'Todos', label: 'Todos' },
  { id: 1, value: 'Pedido realizado', label: 'Pedido Realizado' },
  { id: 2, value: 'Em preparação', label: 'Em Preparação' },
  { id: 3, value: 'Pedido pronto', label: 'Pedido Pronto' },
  { id: 4, value: 'Pedido a caminho', label: 'Pedido a Caminho' },
  { id: 5, value: 'Entregue', label: 'Entregue' },
  { id: 6, value: 'Pedido cancelado', label: 'Cancelado' },
];

// Função auxiliar
export function createData(order) {
  return {
    orderId: order._id,
    name: order.user.name,
    date: order.createdAt,
    status: order.status,
    products: order.products,
    payment_intent_id: order.payment_intent_id,
    payment_method: order.payment_method,
  };
}

export function Row({ row, setOrders, orders, activeStatus }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { userInfo } = useUser();

  async function newStatusOrder(orderId, status) {
    // 1. Snapshot da ordem anterior para recuperação em caso de erro
    const previousOrders = [...orders];

    try {
      setLoading(true);

      // 2. Atualização Otimista: altera o estado local imediatamente
      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);

      // 3. Chamada à API
      await api.put(`/orders/${orderId}`, { status });
    } catch (error) {
      // 4. Se der erro, reverte para o estado anterior
      setOrders(previousOrders);
      console.error('Erro ao atualizar status do pedido', error);
      // Aqui você poderia adicionar um toast de erro
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton className="Tr" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className="Tc">{row.orderId}</TableCell>
        <TableCell className="TcName">{row.name}</TableCell>
        <TableCell className="Tc">{formatDate(row.date)}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StatusBadge $status={row.status}>{row.status}</StatusBadge>
            {userInfo?.admin && (
              <SelectStatus
                options={orderStatusOptions.filter((option) => option.id !== 0)}
                value={orderStatusOptions.find((option) => option.value === row.status)}
                onChange={(e) => newStatusOrder(row.orderId, e.value)}
                placeholder={row.status}
                isLoading={loading}
                menuPortalTarget={document.body}
              />
            )}
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom className="Tc">
                Detalhes do pedido
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="Tc">Produto</TableCell>
                    <TableCell className="Tc">Quantidade</TableCell>
                    <TableCell className="Tc">Preço</TableCell>
                    <TableCell className="Tc">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id || product._id}>
                      <TableCell className="Tc">{product.name}</TableCell>
                      <TableCell className="Tc">{product.quantity}</TableCell>
                      <TableCell className="Tc">{formatPrice(product.price)}</TableCell>
                      <TableCell className="Tc">
                        {formatPrice(product.price * product.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {(row.payment_intent_id || row.payment_method) && (
                <Box sx={{ marginTop: 2, padding: 2, backgroundColor: '#1a1a1a', borderRadius: 2 }}>
                  <Typography variant="body2" className="Tc" sx={{ opacity: 0.7 }}>
                    Informações de Pagamento:
                  </Typography>
                  <Typography variant="body2" className="Tc">
                    <strong>Método:</strong> {row.payment_method || 'Não informado'}
                  </Typography>
                  {row.payment_intent_id && (
                    <Typography variant="body2" className="Tc">
                      <strong>ID Stripe:</strong> {row.payment_intent_id}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// PropTypes
Row.propTypes = {
  setOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  activeStatus: PropTypes.number.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    payment_intent_id: PropTypes.string,
    payment_method: PropTypes.string,
  }).isRequired,
};
