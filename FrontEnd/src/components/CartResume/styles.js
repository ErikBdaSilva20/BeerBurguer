import styled, { keyframes } from 'styled-components';

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const Container = styled.div`
  background: rgba(8, 8, 8, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 100px;
  flex-shrink: 0;
  animation: ${fadeInRight} 0.6s ease both;
  animation-delay: 0.15s;

  .backToAddMoreProducts {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    padding: 4px;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }

  @media (max-width: 1024px) {
    max-width: 600px;
    position: static;
  }
`;

export const ContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 2px;
`;

export const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.45);
    font-weight: 400;
  }

  span:last-child {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.75);
    font-weight: 600;
  }
`;

export const Items = styled.span``;

export const ItemsPrice = styled.span``;

export const DeliveryTax = styled.span``;

export const DeliveryTaxPrice = styled.span``;

export const ContainerBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const Total = styled.p`
  font-size: ${({ $big }) => ($big ? '1.4rem' : '0.85rem')};
  font-weight: ${({ $big }) => ($big ? '800' : '600')};
  color: ${({ $big, theme }) => ($big ? theme.primary : 'rgba(255,255,255,0.5)')};
  letter-spacing: ${({ $big }) => ($big ? '-0.5px' : '1.5px')};
  text-transform: ${({ $big }) => ($big ? 'normal' : 'uppercase')};
`;

export const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  border-radius: 14px;
  border: none;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  background-size: 200% auto;
  color: #000000;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 238, 0, 0.25);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.025);
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  > p {
    font-size: 0.7rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 4px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 11px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 238, 0, 0.15);
    }

    input {
      accent-color: ${({ theme }) => theme.primary};
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);

      svg {
        font-size: 18px;
      }
    }
  }
`;
