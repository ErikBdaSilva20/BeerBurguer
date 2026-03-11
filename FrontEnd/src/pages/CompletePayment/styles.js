import styled, { keyframes } from 'styled-components';

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background:
    radial-gradient(circle at 30% 40%, rgba(255, 238, 0, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(255, 140, 5, 0.04) 0%, transparent 40%), #000000;
  padding: 32px 20px;
`;

export const Card = styled.div`
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 24px 80px rgba(0, 0, 0, 0.7);
  padding: 48px 40px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  animation: ${fadeInScale} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media (max-width: 600px) {
    padding: 36px 24px;
    border-radius: 20px;
  }
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${(props) => `${props.color}12`};
  border: 1px solid ${(props) => `${props.color}30`};
  margin-bottom: 24px;
  animation: ${pulse} 2.5s ease-in-out infinite;

  .status-icon {
    font-size: 44px;
    color: ${(props) => props.color};
    filter: drop-shadow(0 0 12px ${(props) => `${props.color}60`});
  }
`;

export const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
  line-height: 1.4;
`;

export const DetailsBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 20px 24px;
  width: 100%;
  margin-bottom: 28px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr:not(:last-child) td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const TableLabel = styled.td`
  padding: 10px 0;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  text-align: left;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const TableContent = styled.td`
  padding: 10px 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.85rem;
  text-align: right;
  font-family: 'Courier New', monospace;
  word-break: break-all;
`;

export const ButtonText = styled.button`
  background: linear-gradient(135deg, #ffee00 0%, #ff8c05 100%);
  color: #000000;
  padding: 15px 28px;
  border-radius: 14px;
  font-weight: 800;
  width: 100%;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 238, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`;
