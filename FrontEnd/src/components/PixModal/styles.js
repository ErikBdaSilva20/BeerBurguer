import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
`;

export const Wrapper = styled.div`
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 36px 32px;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  position: relative;
  animation: ${fadeIn} 0.25s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 18px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 26px;
  cursor: pointer;
  line-height: 1;
  &:hover { color: #fff; }
`;

export const Heading = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const Subheading = styled.p`
  font-size: 0.95rem;
  color: #94a3b8;
  margin: 0;
  strong { color: #00BFA5; }
`;

export const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${({ $success }) => ($success ? 'rgba(34,197,94,0.15)' : 'rgba(250,204,21,0.12)')};
  color: ${({ $success }) => ($success ? '#22c55e' : '#facc15')};
  border: 1px solid ${({ $success }) => ($success ? 'rgba(34,197,94,0.3)' : 'rgba(250,204,21,0.2)')};
`;

export const QRImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  object-fit: contain;
  background: #fff;
  padding: 8px;
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 4px 0;
`;

export const Instruction = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
`;

export const PixCode = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #cbd5e1;
  font-size: 0.75rem;
  font-family: monospace;
  padding: 10px 12px;
  resize: none;
  height: 72px;
  outline: none;
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s;
  background: ${({ $copied }) => ($copied ? '#22c55e' : '#00BFA5')};
  color: #fff;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
`;
