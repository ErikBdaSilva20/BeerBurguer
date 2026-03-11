import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glitch = keyframes`
  0% { text-shadow: 2px 0 ${({ theme }) => theme?.primary || '#ffee00'}, -2px 0 #ff8c05; }
  20% { text-shadow: -3px 0 #ffee00, 3px 0 #ff8c05; }
  40% { text-shadow: 3px 2px #ffee00, -3px -2px #ff8c05; }
  60% { text-shadow: -3px 0 #ffee00, 3px 0 #ff8c05; }
  80% { text-shadow: 2px 0 #ffee00, -2px 0 #ff8c05; }
  100% { text-shadow: none; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background:
    radial-gradient(circle at center, rgba(255, 238, 0, 0.03) 0%, transparent 60%), #000000;
  text-align: center;
  padding: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  animation: ${fadeIn} 0.6s ease both;

  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    font-weight: 500;

    span {
      font-family: 'Road Rage', sans-serif;
      font-size: clamp(6rem, 20vw, 10rem);
      color: ${({ theme }) => theme?.primary || '#ffee00'};
      line-height: 1;
      animation: ${glitch} 4s ease-in-out infinite;
      animation-delay: 2s;
    }
  }

  button {
    padding: 13px 32px;
    border-radius: 14px;
    background: rgba(255, 238, 0, 0.08);
    border: 1px solid rgba(255, 238, 0, 0.3);
    color: ${({ theme }) => theme?.primary || '#ffee00'};
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: rgba(255, 238, 0, 0.16);
      border-color: rgba(255, 238, 0, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 238, 0, 0.15);
    }
  }
`;
