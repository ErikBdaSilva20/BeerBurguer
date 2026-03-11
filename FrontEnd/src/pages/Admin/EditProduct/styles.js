import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  animation: ${fadeIn} 0.6s ease both;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 520px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.7);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .checkbox {
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.primary};
    cursor: pointer;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 1.5px;

  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.primary};
    opacity: 0.8;
  }
`;

export const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.white};
  font-size: 0.95rem;
  transition: all 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    background: rgba(255, 238, 0, 0.04);
    box-shadow: 0 0 0 3px rgba(255, 238, 0, 0.08);
  }
`;

export const LabelUpload = styled.label`
  height: 140px;
  border-radius: 16px;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;

  svg {
    font-size: 36px;
    color: ${({ theme }) => theme.primary};
    opacity: 0.6;
    transition: all 0.3s;
  }

  input {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};

    svg {
      opacity: 1;
      transform: translateY(-4px);
    }
  }
`;

export const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.white};
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.3)' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C2.185 5.355 2.403 5 2.808 5h10.384a.408.408 0 0 1 .357.712l-4.796 5.48a.408.408 0 0 1-.606 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 16px) center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  background-size: 200% auto;
  color: #000;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 238, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
    transform: scale(0.98);
  }
`;

export const Deletion = styled.div`
  margin-top: 8px;
  width: 100%;
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.05);
  color: #ef4444;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;
