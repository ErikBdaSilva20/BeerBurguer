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
  z-index: 9998;
  padding: 16px;
`;

export const Wrapper = styled.div`
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 36px 32px;
  max-width: 400px;
  width: 100%;
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
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
`;

export const Subheading = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.82rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 0.95rem;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s;

    &::placeholder { color: #475569; }
    &:focus { border-color: #00BFA5; }
  }
`;

export const ErrorMsg = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

export const SubmitBtn = styled.button`
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00BFA5, #0284c7);
  color: #fff;
  transition: opacity 0.2s, transform 0.15s;
  margin-top: 8px;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active { transform: translateY(0); }
`;
