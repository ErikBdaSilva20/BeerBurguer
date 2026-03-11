import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoImg from '../../assets/BeerBurguerLogo.png';
import { useUser } from '../../hooks/UserContext.jsx';
import { MobileMenu } from '../MobileMenu';
import {
  Cart,
  Container,
  Content,
  Left,
  Logo,
  Logout,
  Nav,
  NavLink,
  NavMobile,
  Profile,
  Right,
} from './styles.js';

export function Header() {
  const navigate = useNavigate();
  const { userInfo, logout } = useUser();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const headerOptions = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Cardápio', path: '/menu', icon: RestaurantMenuIcon },
    { label: 'Meus Pedidos', path: '/meus-pedidos', icon: AssignmentIcon },
    { label: 'Contato', path: '/contato', icon: ContactSupportIcon },
    { label: 'Painel Admin', path: '/admin', icon: AdminPanelSettingsIcon },
  ];

  return (
    <Container>
      <Content>
        <Left>
          <Logo to="/">
            <img src={LogoImg} alt="Beer Burguer Logo" />
          </Logo>
          <Nav>
            {headerOptions.map((option) => (
              <NavLink
                key={option.path}
                to={option.path}
                $active={
                  option.path === '/'
                    ? pathname === '/'
                    : pathname.includes(option.path)
                }
              >
                {option.label}
              </NavLink>
            ))}
          </Nav>
          {pathname !== '/' && (
            <NavMobile to="/">
              <ArrowBackIosNewIcon />
              <span>Voltar</span>
            </NavMobile>
          )}
        </Left>

        <Right>
          <Profile>
            <PersonOutlineIcon />
            <div>
              <span>Bem-vindo</span>
              <strong>{userInfo?.name}</strong>
            </div>
          </Profile>

          <Cart to="/carrinho">
            <ShoppingCartIcon />
            <span>Carrinho</span>
          </Cart>
          <Logout onClick={handleLogout}>Sair</Logout>

          <MobileMenu options={headerOptions} logoutFunc={handleLogout} />
        </Right>
      </Content>
    </Container>
  );
}
