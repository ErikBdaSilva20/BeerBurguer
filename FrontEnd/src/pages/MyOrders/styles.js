import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.fourthBlack};
  padding: 40px 20px;
  animation: ${fadeIn} 0.6s ease both;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.roadRage};
  font-size: 3rem;
  color: ${({ theme }) => theme.white};
  margin-bottom: 20px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

export const OrderCard = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 238, 0, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.3);
      font-weight: 700;
    }

    strong {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.85);
      font-family: 'Courier New', Courier, monospace;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;

  background: ${(props) => {
    switch (props.$status) {
      case 'Pedido realizado':
        return 'rgba(255, 255, 255, 0.05)';
      case 'Em preparação':
        return 'rgba(255, 140, 5, 0.1)';
      case 'Pedido pronto':
        return 'rgba(34, 197, 94, 0.12)';
      case 'Entregue':
        return 'rgba(128, 255, 0, 0.12)';
      case 'Pedido cancelado':
        return 'rgba(239, 68, 68, 0.12)';
      default:
        return 'rgba(255, 255, 255, 0.05)';
    }
  }};

  color: ${(props) => {
    switch (props.$status) {
      case 'Pedido realizado':
        return 'rgba(255, 255, 255, 0.6)';
      case 'Em preparação':
        return '#ff8c05';
      case 'Pedido pronto':
        return '#4ade80';
      case 'Entregue':
        return '#80ff00';
      case 'Pedido cancelado':
        return '#ef4444';
      default:
        return '#fff';
    }
  }};

  border: 1px solid currentColor;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
  }
`;

export const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;

    p {
      font-size: 0.88rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      margin: 0;
    }

    span {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    }
  }

  strong {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  .total-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: rgba(255, 255, 255, 0.3);
    font-weight: 700;
  }

  .total-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.primary};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 80px 20px;
  text-align: center;

  svg {
    font-size: 64px;
    color: rgba(255, 255, 255, 0.1);
  }

  p {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1rem;
  }

  button {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    padding: 10px 24px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 238, 0, 0.1);
    }
  }
`;
