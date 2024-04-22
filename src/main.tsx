import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App';
import '@src/index.css';
import { SnackbarProvider, LoadingProvider } from '@presentation/context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
