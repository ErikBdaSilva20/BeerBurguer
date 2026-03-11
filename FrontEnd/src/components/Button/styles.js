import styled from 'styled-components';

export const ButtonComponent = styled.button`
  padding: 14px 28px;
  border-radius: 14px;
  background: rgba(255, 238, 0, 0.08);
  border: 1px solid rgba(255, 238, 0, 0.3);
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-family: ${({ theme }) => theme.fonts.poppins};
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 238, 0, 0.18);
    border-color: rgba(255, 238, 0, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 238, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    transform: scale(0.98);
  }
`;
