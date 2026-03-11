import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../hooks/CartContext.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { Table } from './Table/index.jsx';
import { ButtonGroup, ProductImg } from './styles.js';

export function CartItems() {
  const { cartProducts, increaseOneProduct, decreaseOneProduct, deleteProduct } = useCart();

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Item</Table.Th>
            <Table.Th>Preço</Table.Th>
            <Table.Th>Quantidade</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Header>

        <Table.Body>
          {cartProducts.length > 0 ? (
            cartProducts.map((product) => (
              <Table.Tr key={product.id}>
                {/* Imagem */}
                <Table.Td>
                  <ProductImg src={product.url} alt={`Imagem de ${product.name}`} />
                </Table.Td>

                {/* Nome */}
                <Table.Td>{product.name}</Table.Td>

                {/* Preço unitário */}
                <Table.Td className="price">{formatPrice(product.price)}</Table.Td>

                {/* Quantidade */}
                <Table.Td>
                  <ButtonGroup>
                    <button type="button" onClick={() => decreaseOneProduct(product.id)}>
                      -
                    </button>

                    <span>{product.quantity}</span>

                    <button type="button" onClick={() => increaseOneProduct(product.id)}>
                      +
                    </button>
                  </ButtonGroup>
                </Table.Td>

                {/* Total */}
                <Table.Td className="price">
                  {formatPrice(product.price * product.quantity)}
                </Table.Td>

                {/* Remover */}
                <Table.Td>
                  <DeleteIcon className="icon" onClick={() => deleteProduct(product.id)} />
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5}>Nenhum item no carrinho</Table.Td>
            </Table.Tr>
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
}
