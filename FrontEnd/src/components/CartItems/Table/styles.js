import styled from 'styled-components';

export const Root = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  background: rgba(10, 10, 10, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const Header = styled.thead``;

export const Tr = styled.tr`
  transition: background 0.2s ease;

  &:hover td {
    background: rgba(255, 255, 255, 0.025);
  }

  .price {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    font-family: ${({ theme }) => theme.fonts.poppins};
  }
`;

export const Th = styled.th`
  padding: 16px 20px;
  text-align: left;
  background: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 600px) {
    padding: 12px 12px;
    font-size: 0.65rem;
  }
`;

export const Td = styled.td`
  padding: 16px 20px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: middle;

  .icon {
    transition: all 0.25s ease;
    cursor: pointer;
    color: rgba(255, 100, 100, 0.6);

    &:hover {
      color: #ff5555;
      transform: scale(1.2);
    }
  }

  @media (max-width: 600px) {
    padding: 12px 12px;
  }
`;

export const Body = styled.tbody`
  tr:last-child td {
    border-bottom: none;
  }
`;
