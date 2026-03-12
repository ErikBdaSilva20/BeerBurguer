import { Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../layouts/AdminLayout';
import { UserLayout } from '../layouts/UserLayout';

import { useUser } from '../hooks/UserContext';
import {
  Cart,
  CompletePayment,
  Contact,
  Dashboard,
  EditProduct,
  Home,
  Login,
  Menu,
  MyOrders,
  NewProduct,
  NewCategory,
  NotFoundPage,
  Orders,
  Products,
  Register,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';

export function Router() {
  const { loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      {/* User */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="carrinho" element={<Cart />} />
          <Route path="complete" element={<CompletePayment />} />
          <Route path="meus-pedidos" element={<MyOrders />} />
          <Route path="contato" element={<Contact />} />
        </Route>
      </Route>

      {/* Admin - Now public for viewing layouts */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<Products />} />
        <Route path="adicionar-produto" element={<NewProduct />} />
        <Route path="adicionar-categoria" element={<NewCategory />} />
        <Route path="editar-produto" element={<EditProduct />} />
        <Route path="pedidos" element={<Orders />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
