import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoImg from '../../assets/BeerBurguerLogo.png';
import { useUser } from '../../hooks/UserContext';
import { Container, Footer, Logo, MobileHeader, NavLink, Overlay, ToggleButton } from './styles';

const menuOptions = [
  {
    id: 1,
    label: 'Dashboard',
    path: '/admin',
    icon: DashboardIcon,
  },
  {
    id: 2,
    label: 'Pedidos',
    path: '/admin/pedidos',
    icon: ShoppingBagIcon,
  },
  {
    id: 3,
    label: 'Produtos',
    path: '/admin/produtos',
    icon: ShoppingCartIcon,
  },
  {
    id: 4,
    label: 'Novo Produto',
    path: '/admin/adicionar-produto',
    icon: AddShoppingCartIcon,
  },
  {
    id: 5,
    label: 'Nova Categoria',
    path: '/admin/adicionar-categoria',
    icon: AddShoppingCartIcon,
  },
  {
    id: 6,
    label: 'Home',
    path: '/',
    icon: HomeIcon,
  },
];

export function SideNavAdmin() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, userInfo } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o menu lateral quando muda de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Se não for admin, oculta a opção "Novo Produto" para apenas visualização
  const isSuperAdmin = userInfo?.email === 'erikborgesdasilva574@gmail.com';
  const visibleOptions = isSuperAdmin
    ? menuOptions
    : menuOptions.filter(
        (item) => item.path !== '/admin/adicionar-produto' && item.path !== '/admin/adicionar-categoria'
      );

  return (
    <>
      <MobileHeader>
        <img src={LogoImg} alt="Logo DevBurguer" className="logo-mobile" />
        <ToggleButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </ToggleButton>
      </MobileHeader>

      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <Container $isOpen={isOpen}>
        <Logo src={LogoImg} alt="Logo DevBurguer" />
        <div>
          {visibleOptions.map((item) => (
            <NavLink key={item.id} to={item.path} $isActive={pathname === item.path}>
              <item.icon className="icon" />
              {item.label}
            </NavLink>
          ))}
        </div>
        <Footer>
          <NavLink to="/login" onClick={handleLogout}>
            <LogoutIcon className="icon" />
            Sair
          </NavLink>
        </Footer>
      </Container>
    </>
  );
}
