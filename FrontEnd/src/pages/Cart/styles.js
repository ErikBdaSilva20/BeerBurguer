import styled, { keyframes } from 'styled-components';
import bannerBeerBurguer from '../../assets/BannerBeerBurguer.jpg';
import abstractBackground from '../../assets/abstractBackground.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.92)), url(${abstractBackground});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

export const Banner = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
  background-image: url(${bannerBeerBurguer});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  /* Bottom accent */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 238, 0, 0.5), transparent);
    z-index: 2;
  }

  img {
    max-height: 120px;
    width: auto;
    z-index: 3;
    position: relative;
    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8));
  }
`;

export const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  padding: 28px 24px 4px;
  animation: ${fadeInUp} 0.5s ease both;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    margin: 10px auto 0;
    border-radius: 2px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin: 24px auto;
  padding: 0 32px 48px;
  max-width: 1280px;
  gap: 40px;
  animation: ${fadeInUp} 0.6s ease both;
  animation-delay: 0.08s;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    padding: 0 24px 48px;
    gap: 28px;
  }

  @media (max-width: 600px) {
    padding: 0 16px 48px;
  }
`;
