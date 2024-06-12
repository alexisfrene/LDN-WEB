import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@src/App';
import { SnackbarProvider, LoadingProvider } from '@presentation/context';
import '@src/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
