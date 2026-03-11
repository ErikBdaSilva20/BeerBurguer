import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  padding: 40px 20px;
  overflow: hidden;
  margin-top: 40px;

  .react-multi-carousel-list {
    overflow: hidden;
  }

  .carousel-item {
    padding: 0 10px;
  }
`;

export const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const TitleBadge = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background: rgba(255, 238, 0, 0.08);
  border: 1px solid rgba(255, 238, 0, 0.18);
  padding: 4px 12px;
  border-radius: 100px;
`;

export const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.fonts.roadRage};
  line-height: 1;
  margin-bottom: 40px;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

export const GridSlide = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  animation: ${fadeIn} 0.8s ease both;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.div`
  position: relative;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;
  background: url(${(props) => props.$imageurl}) center/cover no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.2) 60%,
      transparent 100%
    );
    z-index: 1;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 238, 0, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);

    &::before {
      opacity: 0.8;
    }

    img {
      transform: scale(1.1);
    }
  }
`;

export const CategoryContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    color: ${({ theme }) => theme.white};
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin: 0;
    transition: color 0.3s;
  }

  span {
    color: ${({ theme }) => theme.primary};
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s;
  }

  ${CategoryCard}:hover & {
    p {
      color: ${({ theme }) => theme.primary};
    }
    span {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
