import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  background: rgba(4, 4, 4, 0.98);
  border-right: 1px solid rgba(255, 238, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 0;
  backdrop-filter: blur(15px);
  z-index: 999;
  transition: transform 0.3s ease-in-out;

  div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 32px;
    padding: 0 16px;
  }

  @media (max-width: 900px) {
    position: fixed;
    transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
  }
`;

export const Overlay = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 998;
  }
`;

export const MobileHeader = styled.header`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 20px;
    background: #000;
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 238, 0, 0.1);

    .logo-mobile {
      height: 32px;
    }
  }
`;

export const ToggleButton = styled.button`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    font-size: 28px;
    transition: all 0.2s;

    &:active {
      transform: scale(0.9);
      opacity: 0.7;
    }
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: ${(props) => (props.$isActive ? props.theme.primary : 'rgba(255, 255, 255, 0.45)')};
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$isActive ? '700' : '500')};
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
  background: ${(props) => (props.$isActive ? 'rgba(255, 238, 0, 0.1)' : 'transparent')};
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$isActive ? 'rgba(255, 238, 0, 0.2)' : 'transparent')};

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: rgba(255, 238, 0, 0.07);
    border-color: rgba(255, 238, 0, 0.12);
    transform: translateX(3px);
  }

  .icon {
    font-size: 20px;
    color: ${(props) => (props.$isActive ? props.theme.primary : 'rgba(255, 255, 255, 0.3)')};
    transition: color 0.2s;
  }
`;

export const Logo = styled.img`
  width: 180px;
  margin: 12px auto;
  padding: 8px;
  object-fit: contain;
  filter: drop-shadow(0 4px 16px rgba(255, 238, 0, 0.2));

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Footer = styled.div`
  border-top: 1px solid rgba(255, 238, 0, 0.07);
  padding: 12px 12px 0;
`;
