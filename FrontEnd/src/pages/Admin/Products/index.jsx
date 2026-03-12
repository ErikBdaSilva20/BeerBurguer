import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import api from '../../../services/api';
import { formatPrice } from '../../../utils/formatPrice';
import { useUser } from '../../../hooks/UserContext';

import { Container, ProductImage, OfferIcon, NotOfferIcon } from './styles.js';

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const isSuperAdmin = userInfo?.email === 'erikborgesdasilva574@gmail.com';

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    loadProducts();
  }, []);

  function editProduct(product) {
    navigate(`/admin/editar-produto`, { state: { product } });
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="Tabela de produtos" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Produto</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Oferta</TableCell>
              <TableCell align="center">Imagem</TableCell>
              <TableCell align="center">Categoria ID</TableCell>
              {isSuperAdmin && <TableCell align="center">Editar</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#2a2a2a' },
                }}
              >
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{formatPrice(product.price)}</TableCell>
                <TableCell align="center">
                  {product.offer ? <OfferIcon /> : <NotOfferIcon />}
                </TableCell>
                <TableCell align="center">
                  <ProductImage src={product.url} alt={product.name} />
                </TableCell>
                <TableCell align="center">{product.category_id}</TableCell>
                {isSuperAdmin && (
                  <TableCell align="center">
                    <ModeEditIcon className="icon" onClick={() => editProduct(product)} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
