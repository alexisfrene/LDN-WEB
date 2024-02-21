import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux';
import { SnackbarProvider, LoadingProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
);
