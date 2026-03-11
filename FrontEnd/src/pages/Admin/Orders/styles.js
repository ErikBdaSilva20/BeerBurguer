import Select from 'react-select';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  padding: 8px;
  animation: ${fadeIn} 0.6s ease both;
  background-color: transparent;
  min-height: 100vh;

  .TableContainer {
    margin-top: 24px;
    background: rgba(15, 15, 15, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.7);
    overflow: hidden;
  }

  .Tc {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
    font-size: 0.88rem;
    padding: 20px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .TcName {
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    font-size: 0.92rem;
    letter-spacing: -0.2px;
  }

  thead th {
    background: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 16px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.08);
    text-align: left;
  }
`;

export const SelectProductsByFilter = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    padding: 12px;
    gap: 8px;
  }
`;

export const SelectButton = styled.button`
  border: 1px solid
    ${({ $activeStatus, theme }) =>
      $activeStatus === 'active' ? theme.primary : 'rgba(255,255,255,0.06)'};
  padding: 10px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: ${({ $activeStatus, theme }) =>
    $activeStatus === 'active' ? 'rgba(255, 238, 0, 0.12)' : 'rgba(255,255,255,0.04)'};
  color: ${({ $activeStatus, theme }) =>
    $activeStatus === 'active' ? theme.primary : 'rgba(255,255,255,0.45)'};
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    background: ${({ $activeStatus, theme }) =>
      $activeStatus === 'active' ? 'rgba(255, 238, 0, 0.18)' : 'rgba(255,255,255,0.08)'};
    color: ${({ theme }) => theme.primary};
    border-color: rgba(255, 238, 0, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  gap: 8px;
  width: fit-content;

  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'Pedido realizado':
        return 'rgba(255, 255, 255, 0.08)';
      case 'Em preparação':
        return 'rgba(255, 140, 5, 0.1)';
      case 'Pedido pronto':
        return 'rgba(34, 197, 94, 0.12)';
      case 'Entregue':
        return 'rgba(128, 255, 0, 0.12)';
      case 'Pedido cancelado':
        return 'rgba(239, 68, 68, 0.12)';
      default:
        return 'rgba(255, 255, 255, 0.08)';
    }
  }};

  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'Pedido realizado':
        return 'rgba(255, 255, 255, 0.45)';
      case 'Em preparação':
        return theme.secondary;
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
  opacity: 0.9;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    box-shadow: 0 0 10px currentColor;
  }
`;

export const SelectStatus = styled(Select).attrs({
  styles: {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '10px',
      minWidth: '180px',
      fontSize: '0.82rem',
      fontWeight: '600',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 238, 0, 0.1)' : 'none',
      '&:hover': { borderColor: 'rgba(255,238,0,0.35)' },
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'rgba(255,255,255,0.85)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(255,255,255,0.25)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#0f0f0f',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      padding: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '8px',
      fontSize: '0.82rem',
      fontWeight: '600',
      backgroundColor: state.isSelected
        ? 'rgba(255,238,0,0.1)'
        : state.isFocused
          ? 'rgba(255,255,255,0.06)'
          : 'transparent',
      color: state.isSelected ? '#ffee00' : 'rgba(255,255,255,0.7)',
      '&:active': { backgroundColor: 'rgba(255,238,0,0.15)' },
      cursor: 'pointer',
    }),
  },
})``;
