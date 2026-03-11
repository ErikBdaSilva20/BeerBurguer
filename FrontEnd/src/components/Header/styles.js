import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* ===== CONTAINER ===== */
export const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 72px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 238, 0, 0.1);
  transition: border-color 0.3s ease;

  &:hover {
    border-bottom-color: rgba(255, 238, 0, 0.2);
  }
`;

/* ===== CONTENT ===== */
export const Content = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

/* ===== LOGO AREA ===== */
export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 48px;
    object-fit: contain;

    @media (max-width: 640px) {
      height: 36px;
    }
  }
`;

export const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.roadRage};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 1px;
  line-height: 1;
`;

/* ===== LEFT ===== */
export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

/* ===== NAV ===== */
export const Nav = styled.nav`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    display: none;
  }
`;

/* ===== NAV LINK ===== */
export const NavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? '#ffee00' : 'rgba(255,255,255,0.65)')};
  padding: 6px 14px;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? 'rgba(255,238,0,0.1)' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: #ffee00;
    background: rgba(255, 238, 0, 0.08);
  }
`;

/* ===== RIGHT ===== */
export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

/* ===== PROFILE ===== */
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 238, 0, 0.15);
  }

  svg {
    font-size: 22px;
    color: ${({ theme }) => theme.primary};
    opacity: 0.9;
  }

  div {
    display: flex;
    flex-direction: column;
    line-height: 1.2;

    span {
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.45);
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    strong {
      font-size: 0.85rem;
      font-weight: 600;
      color: #ffffff;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ===== CART ===== */
export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  letter-spacing: 0.4px;
  transition: all 0.25s ease;

  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    color: #ffffff;
    background: rgba(255, 238, 0, 0.1);
    border-color: rgba(255, 238, 0, 0.25);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 8px;

    span {
      display: none;
    }
  }
`;

/* ===== LOGOUT ===== */
export const Logout = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 60, 60, 0.2);
  background: rgba(255, 60, 60, 0.05);
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 120, 120, 0.8);
  cursor: pointer;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 60, 60, 0.15);
    border-color: rgba(255, 60, 60, 0.4);
    color: #ff9090;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;
/* ===== NAV MOBILE ===== */
export const NavMobile = styled(Link)`
  display: none;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    font-size: 14px;
  }

  @media (max-width: 640px) {
    display: flex;
  }
`;
