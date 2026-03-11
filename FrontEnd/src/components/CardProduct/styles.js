import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ===== CARD PRINCIPAL ===== */
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 340px;
  padding: 20px 16px 16px;
  background: rgba(10, 10, 10, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: ${fadeIn} 0.5s ease both;

  /* Subtle top accent line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 238, 0, 0.3), transparent);
    transition:
      left 0.3s ease,
      right 0.3s ease,
      opacity 0.3s;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(255, 238, 0, 0.2);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 238, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    background: rgba(14, 14, 14, 0.95);

    &::before {
      left: 5%;
      right: 5%;
      opacity: 1;
    }
  }

  button {
    width: 100%;
    margin-top: auto;
    padding: 12px 24px;
    border: 1px solid rgba(255, 238, 0, 0.25);
    border-radius: 12px;
    background: rgba(255, 238, 0, 0.07);
    color: ${({ theme }) => theme.primary};
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    svg {
      font-size: 18px;
    }

    &:hover {
      background: rgba(255, 238, 0, 0.15);
      border-color: rgba(255, 238, 0, 0.5);
      transform: none;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

/* ===== IMAGEM ===== */
export const CardImage = styled.div`
  width: 200px;
  height: 175px;
  background-image: url(${(props) => props.$imageurl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 4px;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));

  ${Container}:hover & {
    transform: scale(1.06) translateY(-4px);
    filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.7));
  }
`;

/* ===== INFORMAÇÕES ===== */
export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 12px 0 16px;
  width: 100%;
  padding: 0 4px;

  p {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.3;
  }

  strong {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
    font-family: ${({ theme }) => theme.fonts.poppins};
    letter-spacing: -0.5px;
  }
`;
