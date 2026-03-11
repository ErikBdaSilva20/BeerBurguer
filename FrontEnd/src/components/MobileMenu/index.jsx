import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  CloseButton,
  Container,
  LogoutButton,
  MenuContent,
  NavLink,
  Overlay,
  ToggleButton,
} from './styles';

export function MobileMenu({ options = [], logoutFunc = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Fecha o menu quando muda de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Impede o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Container>
      <ToggleButton onClick={toggleMenu} aria-label="Abrir menu">
        <MenuIcon />
      </ToggleButton>

      <Overlay $isOpen={isOpen} onClick={toggleMenu} />

      <MenuContent $isOpen={isOpen}>
        <CloseButton onClick={toggleMenu} aria-label="Fechar menu">
          <CloseIcon />
        </CloseButton>

        {options.map((option) => (
          <NavLink
            key={option.path}
            to={option.path}
            $isActive={pathname === option.path}
          >
            {option.icon && <option.icon />}
            {option.label}
          </NavLink>
        ))}

        {logoutFunc && (
          <LogoutButton onClick={logoutFunc}>
            <LogoutIcon />
            Sair
          </LogoutButton>
        )}
      </MenuContent>
    </Container>
  );
}

MobileMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ),
  logoutFunc: PropTypes.func,
};
