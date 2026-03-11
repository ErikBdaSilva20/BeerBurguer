import styled from 'styled-components';

export const ProductImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  overflow: hidden;
  width: fit-content;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.1rem;
    color: rgba(255, 238, 0, 0.8);
    font-weight: 700;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.18s ease;

    &:hover {
      background: rgba(255, 238, 0, 0.12);
      color: ${({ theme }) => theme.primary};
    }

    &:active {
      transform: scale(0.92);
    }
  }

  span {
    font-size: 0.9rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    min-width: 32px;
    text-align: center;
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
