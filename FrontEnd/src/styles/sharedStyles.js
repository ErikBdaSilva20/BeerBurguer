import styled, { keyframes } from 'styled-components';

/* ======================================
   ANIMATION KEYFRAMES
====================================== */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ======================================
   AUTH SHARED STYLES (Login / Register)
====================================== */
export const AuthContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.mainBlack};
`;

export const AuthLeftContainer = styled.div`
  position: relative;
  background: url(${(props) => props.$background});
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  max-width: 52%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* Dark overlay with gradient */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
  }

  /* Accent glow strip on the right edge */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(255, 238, 0, 0.4), transparent);
    z-index: 2;
  }

  img {
    height: 42%;
    width: auto;
    z-index: 3;
    position: relative;
    filter: drop-shadow(0 0 40px rgba(255, 238, 0, 0.3));
    animation: ${fadeInUp} 0.8s ease both;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const AuthRightContainer = styled.div`
  background-image: url(${(props) => props.$background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 48%;
  color: ${({ theme }) => theme.white};
  gap: 0;
  padding: 48px;

  /* Dark overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.88) 100%);
    z-index: 0;
  }

  /* All children above overlay */
  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 900px) {
    max-width: 100%;
    padding: 32px 24px;
  }
`;

export const AuthTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-weight: 700;
  font-size: 2.2rem;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 8px;
  animation: ${fadeInUp} 0.6s ease both;

  span {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const AuthSubtitle = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 36px;
  animation: ${fadeInUp} 0.7s ease both;
  animation-delay: 0.05s;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  animation: ${fadeInUp} 0.7s ease both;
  animation-delay: 0.1s;
`;

export const AuthInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.55);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  input {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 14px 16px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    color: ${({ theme }) => theme.white};
    font-size: 0.95rem;
    font-weight: 400;
    transition: all 0.25s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.25);
      font-size: 0.9rem;
    }

    &:hover {
      border-color: rgba(255, 238, 0, 0.2);
      background: rgba(255, 255, 255, 0.06);
    }

    &:focus {
      border-color: rgba(255, 238, 0, 0.5);
      background: rgba(255, 238, 0, 0.04);
      box-shadow: 0 0 0 3px rgba(255, 238, 0, 0.08);
    }
  }

  p {
    color: ${({ theme }) => theme.danger};
    font-weight: 500;
    font-size: 0.78rem;
    min-height: 14px;
  }
`;

/* ======================================
 // --- GLASS SHARED STYLES (CompletePayment) ---
====================================== */
export const GlassContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 238, 0, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 140, 5, 0.04) 0%, transparent 40%),
    ${({ theme }) => theme.mainBlack};
  padding: 32px 20px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    align-items: flex-start;
  }
`;

export const GlassContent = styled.div`
  width: 100%;
  max-width: 640px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 48px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03),
    0 20px 80px rgba(0, 0, 0, 0.6);
  animation: ${fadeInUp} 0.5s ease both;

  @media (max-width: 768px) {
    padding: 28px 20px;
    border-radius: 18px;
  }
`;
