import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    align-items: center;
  }
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:active {
    background: rgba(255, 238, 0, 0.1);
    transform: scale(0.95);
  }

  svg {
    font-size: 28px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  transition: opacity 0.3s ease;
`;

export const MenuContent = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.98);
  border-left: 1px solid rgba(255, 238, 0, 0.15);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  padding: 80px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $isActive }) => ($isActive ? '#ffee00' : 'rgba(255, 255, 255, 0.7)')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(255, 238, 0, 0.1)' : 'transparent')};
  border-radius: 12px;
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(255, 238, 0, 0.2)' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: #ffee00;
    background: rgba(255, 238, 0, 0.08);
  }

  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: rotate(90deg);
  }

  svg {
    font-size: 24px;
  }
`;

export const LogoutButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  background: rgba(255, 60, 60, 0.05);
  border: 1px solid rgba(255, 60, 60, 0.2);
  border-radius: 12px;
  color: #ff9090;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 60, 60, 0.15);
    border-color: rgba(255, 60, 60, 0.4);
  }

  svg {
    font-size: 20px;
  }
`;
