import { CartProvider } from './CartContext.jsx';
import { UserProvider } from './UserContext.jsx';

const AppProvider = ({ children }) => (
  <UserProvider>
    <CartProvider>{children}</CartProvider>
  </UserProvider>
);

export default AppProvider;
