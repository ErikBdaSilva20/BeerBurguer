import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.poppins};
    background-color: ${({ theme }) => theme.mainBlack};
    color: ${({ theme }) => theme.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.mainBlack};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}66;
    border-radius: 10px;
    transition: background 0.3s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary};
  }

  /* Text selection */
  ::selection {
    background: ${({ theme }) => theme.primary}44;
    color: ${({ theme }) => theme.primary};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Toast overrides */
  .Toastify__toast {
    background: ${({ theme }) => theme.thirdBlack} !important;
    border: 1px solid ${({ theme }) => theme.glassBorder} !important;
    color: ${({ theme }) => theme.white} !important;
    font-family: ${({ theme }) => theme.fonts.poppins} !important;
    border-radius: 12px !important;
    backdrop-filter: blur(20px);
  }
  .Toastify__progress-bar {
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary}) !important;
  }
  .Toastify__close-button {
    color: ${({ theme }) => theme.textGray} !important;
  }
`;

export default GlobalStyles;
