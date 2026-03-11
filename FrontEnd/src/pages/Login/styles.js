import styled, { keyframes } from 'styled-components';
import {
  AuthContainer,
  AuthLeftContainer,
  AuthRightContainer,
  AuthTitle,
} from '../../styles/sharedStyles';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = AuthContainer;
export const LeftContainer = AuthLeftContainer;
export const RightContainer = AuthRightContainer;
export const Title = AuthTitle;

export const DontHaveAccount = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  font-weight: 400;
  text-align: center;
  margin-top: 4px;
  animation: ${fadeInUp} 0.8s ease both;
  animation-delay: 0.2s;

  button {
    color: ${({ theme }) => theme.primary};
    font-size: 0.85rem;
    font-weight: 700;
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: 4px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.75;
      text-decoration: underline;
    }
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 400px;
  animation: ${fadeInUp} 0.7s ease both;
  animation-delay: 0.15s;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  span {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  padding: 14px 24px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.white};
  font-size: 0.95rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.poppins};
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 0.3px;
  animation: ${fadeInUp} 0.75s ease both;
  animation-delay: 0.1s;

  /* Google icon */
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'/%3E%3Cpath fill='%234285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/%3E%3Cpath fill='%23FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'/%3E%3Cpath fill='%2334A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/%3E%3C/svg%3E")
      center/contain no-repeat;
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
