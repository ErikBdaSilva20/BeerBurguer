import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.fourthBlack || '#000'};
  padding: 60px 20px;
  animation: ${fadeIn} 0.8s ease both;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-family: ${({ theme }) => theme.fonts.roadRage};
    font-size: clamp(3rem, 8vw, 5rem);
    color: ${({ theme }) => theme.white};
    margin-bottom: 12px;
    letter-spacing: 2px;

    span {
      color: ${({ theme }) => theme.primary};
    }
  }

  p {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactCard = styled.div`
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.primary};
    opacity: 0.5;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 238, 0, 0.2);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);

    &::before {
      opacity: 1;
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background: rgba(255, 238, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${({ theme }) => theme.primary};
      font-size: 24px;
    }
  }

  h2 {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.25);
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 500;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      filter: brightness(1.2);
      text-decoration: underline;
    }
  }
`;

export const MapSection = styled.div`
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  overflow: hidden;
  height: 400px;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    filter: grayscale(1) invert(0.9) contrast(1.2);
    opacity: 0.8;
  }

  .map-overlay {
    position: absolute;
    bottom: 24px;
    left: 24px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: 16px 24px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 300px;

    em {
      display: block;
      font-style: normal;
      color: ${({ theme }) => theme.primary};
      font-weight: 800;
      font-size: 0.8rem;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    address {
      color: rgba(255, 255, 255, 0.7);
      font-style: normal;
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
`;
