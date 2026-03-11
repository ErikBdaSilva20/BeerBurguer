import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/globalStyles';

import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';

import { ThemeProvider } from 'styled-components';
import AppProvider from './hooks';
import { standardTheme } from './styles/themes/standard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>

        <GlobalStyles />
        <ToastContainer autoClose={3000} theme="colored" />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
