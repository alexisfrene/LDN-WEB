import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SnackbarProvider, LoadingProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
