import DangerousIcon from '@mui/icons-material/Dangerous';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px;
  animation: fadeIn 0.6s ease both;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .icon {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.45);
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.primary};
      transform: scale(1.1);
    }
  }

  .MuiTableCell-root {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding: 16px;
    font-family: inherit;
  }

  .MuiTableHead-root {
    .MuiTableCell-root {
      background: rgba(0, 0, 0, 0.6);
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.08);
    }
  }

  .MuiTableContainer-root {
    background: rgba(15, 15, 15, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }

  .MuiTableRow-root {
    transition: background 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.02);
    }
  }
`;

export const ProductImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 4px;
`;

export const OfferIcon = styled(VerifiedUserIcon)`
  color: ${({ theme }) => theme.success};
  filter: drop-shadow(0 0 8px ${({ theme }) => theme.success}40);
`;

export const NotOfferIcon = styled(DangerousIcon)`
  color: ${({ theme }) => theme.danger};
  opacity: 0.5;
`;

export const PriceCell = styled.td`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;
