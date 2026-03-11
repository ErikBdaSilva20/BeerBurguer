import styled, { keyframes } from 'styled-components';
import containerBackground from '../../assets/background.jpg';
import BannerImg from '../../assets/bannerMenu.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.88)), url(${containerBackground});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding-bottom: 80px;
`;

/* ===== BANNER ===== */
export const Banner = styled.section`
  position: relative;
  height: 440px;
  width: 100%;
  background:
    linear-gradient(
      to right,
      rgba(0, 0, 0, 0.82) 0%,
      rgba(0, 0, 0, 0.35) 60%,
      rgba(0, 0, 0, 0.15) 100%
    ),
    linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%), url(${BannerImg});
  background-size: cover;
  background-position: center top 40%;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 8% 56px;
  overflow: hidden;

  /* Bottom glow strip */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 238, 0, 0.5),
      rgba(255, 140, 5, 0.4),
      transparent
    );
  }

  @media (max-width: 768px) {
    height: 360px;
    flex-direction: column;
    justify-content: flex-end;
    text-align: center;
    padding: 0 24px 40px;
    gap: 8px;

    > div {
      max-width: 100%;
    }
  }
`;

export const BannerLeft = styled.div`
  max-width: 460px;
  animation: ${fadeInUp} 0.6s ease both;

  span {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.primary};
    background: rgba(255, 238, 0, 0.08);
    border: 1px solid rgba(255, 238, 0, 0.18);
    padding: 4px 14px;
    border-radius: 100px;
    margin-bottom: 14px;
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.roadRage};
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 400;
    line-height: 1.05;
    color: ${({ theme }) => theme.white};
  }
`;

export const BannerRight = styled.div`
  max-width: 340px;
  animation: ${fadeInUp} 0.7s ease both;
  animation-delay: 0.1s;

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.white};
    line-height: 1.7;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ===== CATEGORIES FILTER ===== */
export const CategoriesMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 48px auto 16px;
  padding: 0 40px;
  max-width: 1280px;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 0 20px;
    margin-top: 32px;
  }
`;

export const CategorieButton = styled.button`
  position: relative;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 9px 22px;
  border-radius: 100px;
  background: ${(props) =>
    props.$isActiveCategory ? `rgba(255, 238, 0, 0.15)` : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid
    ${(props) => (props.$isActiveCategory ? `rgba(255, 238, 0, 0.4)` : 'rgba(255, 255, 255, 0.08)')};
  color: ${(props) => (props.$isActiveCategory ? props.theme.primary : 'rgba(255, 255, 255, 0.5)')};

  &:hover {
    background: rgba(255, 238, 0, 0.1);
    border-color: rgba(255, 238, 0, 0.3);
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 7px 16px;
  }
`;

/* ===== SEARCH BAR ===== */
export const SearchContainer = styled.div`
  max-width: 600px;
  margin: 32px auto 0;
  padding: 0 40px;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease both;
  animation-delay: 0.1s;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 0 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  svg {
    color: rgba(255, 255, 255, 0.3);
    font-size: 20px;
    transition: color 0.3s;
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 20px rgba(255, 238, 0, 0.15);

    svg {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 56px;
  background: transparent;
  border: none;
  font-size: 0.95rem;
  color: #fff;
  padding: 0 16px;
  font-weight: 500;

  &::placeholder {
    color: rgba(255, 255, 255, 1);
    letter-spacing: 0.5px;
  }

  &:focus {
    outline: none;
  }
`;

/* ===== PRODUCTS GRID ===== */
export const ProductsContainer = styled.div`
  display: grid;
  // ...
  grid-template-columns: repeat(3, 1fr);
  margin: 40px auto;
  padding: 0 40px;
  max-width: 1280px;
  gap: 28px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const NoProductsFound = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
  animation: ${fadeInUp} 0.5s ease both;

  svg {
    font-size: 48px;
    color: rgba(255, 255, 255, 0.1);
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 500;
  }
`;
