import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Adicionar produto no carrinho
  function putAProductInCart(product) {
    setCartProducts((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);

      let newCart;
      if (productIndex >= 0) {
        newCart = prevCart.map((item, index) =>
          index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateLocalStorage(newCart);
      return newCart;
    });
  }

  /*   useEffect(() => {
    console.log('cartProducts', cartProducts);
  }); */

  // Remover produtos do carrinho
  function deleteProduct(productId) {
    const newCart = cartProducts.filter((item) => item.id !== productId);
    setCartProducts(newCart);

    updateLocalStorage(newCart);
  }

  // Adicionar mais do mesmo produto no carrinho
  function increaseOneProduct(productId) {
    const newCart = cartProducts.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartProducts(newCart);

    updateLocalStorage(newCart);
  }

  // Diminuir mais do mesmo produto no carrinho
  function decreaseOneProduct(productId) {
    const cartIndex = cartProducts.findIndex((item) => item.id === productId);

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((item) => {
        return item.id === productId ? { ...item, quantity: item.quantity - 1 } : item;
      });

      setCartProducts(newCart);

      updateLocalStorage(newCart);
    } else {
      deleteProduct(productId);
    }
  }

  function updateLocalStorage(cartProducts) {
    localStorage.setItem('beerBurguer:cartInfo', JSON.stringify(cartProducts));
  }

  // Pegar informações do localstorage quando o carrinho abrir
  useEffect(() => {
    const clientCartData = localStorage.getItem('beerBurguer:cartInfo');

    if (clientCartData) {
      setCartProducts(JSON.parse(clientCartData));
    }
  }, []);

  // Limpar carrinho
  function clearCart() {
    setCartProducts([]);

    updateLocalStorage([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        updateLocalStorage,
        clearCart,
        putAProductInCart,
        deleteProduct,
        increaseOneProduct,
        decreaseOneProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
