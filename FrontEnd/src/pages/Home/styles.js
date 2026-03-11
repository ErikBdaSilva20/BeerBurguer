import styled, { keyframes } from 'styled-components';
import BannerImg from '../../assets/BannerBeerBurguer.jpg';
import containerBackground from '../../assets/background.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.mainBlack};
`;

/* ===== HERO BANNER ===== */
export const Banner = styled.section`
  position: relative;
  height: 620px;
  width: 100%;
  background: url(${BannerImg});
  background-size: cover;
  background-position: center 30%;
  overflow: hidden;

  /* Multi-layer overlay: dark + brand gradient at bottom */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        to right,
        rgba(0, 0, 0, 0.88) 0%,
        rgba(0, 0, 0, 0.5) 55%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 40%);
    z-index: 1;
  }

  /* Accent glow bottom strip */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 238, 0, 0.6),
      rgba(255, 140, 5, 0.6),
      transparent
    );
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 480px;
    background-position: center;
  }
`;

export const BannerContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8% 60px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 24px 40px;
    text-align: center;
    justify-content: flex-end;
  }
`;

export const BannerTag = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background: rgba(255, 238, 0, 0.1);
  border: 1px solid rgba(255, 238, 0, 0.2);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 20px;
  width: fit-content;
  animation: ${fadeInUp} 0.6s ease both;

  @media (max-width: 768px) {
    margin: 0 auto 16px;
  }
`;

export const BannerTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.roadRage};
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 400;
  line-height: 1;
  margin-bottom: 16px;
  animation: ${fadeInUp} 0.7s ease both;
  animation-delay: 0.08s;

  span {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary},
      ${({ theme }) => theme.primary}
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`;

export const BannerSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.55);
  font-weight: 400;
  max-width: 480px;
  line-height: 1.6;
  animation: ${fadeInUp} 0.75s ease both;
  animation-delay: 0.15s;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const BannerScrollIndicator = styled.div`
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  animation: ${pulse} 2s ease-in-out infinite;

  span {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.3);
  }

  &::after {
    content: '';
    width: 1px;
    height: 30px;
    background: linear-gradient(to bottom, rgba(255, 238, 0, 0.5), transparent);
  }
`;

/* ===== PRODUCTS SECTION ===== */
export const Container = styled.div`
  background:
    linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(${containerBackground});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding-top: 24px;
`;

export const SectionHeader = styled.div`
  text-align: center;
  padding: 64px 24px 16px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.roadRage};
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 400;
    color: ${({ theme }) => theme.white};
    line-height: 1;
    margin-bottom: 12px;

    span {
      color: ${({ theme }) => theme.primary};
    }
  }

  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 400;
  }
`;

export const Content = styled.div`
  padding-bottom: 80px;

  .react-multiple-carousel__arrow--right::before,
  .react-multiple-carousel__arrow--left::before {
    color: ${({ theme }) => theme.primary};
    font-size: 1.2rem;
    font-weight: bold;
  }

  .react-multiple-carousel__arrow--right,
  .react-multiple-carousel__arrow--left {
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 238, 0, 0.15);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 238, 0, 0.1);
      border-color: rgba(255, 238, 0, 0.35);
    }
  }
`;
