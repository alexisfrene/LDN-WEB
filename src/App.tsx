import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { login } from '@lib';
import { LoadingIndicator, Toaster, WithAuth } from '@components';

const FilingPage = lazy(() => import('./presentation/pages/filing'));
const SingUpPage = lazy(() => import('./presentation/pages/sign'));
const HomePage = lazy(() => import('./presentation/pages/home'));
const LoginPage = lazy(() => import('./presentation/pages/login'));
const ErrorPage = lazy(() => import('./presentation/pages/error'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <FilingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: (
      <WithAuth>
        <HomePage />
      </WithAuth>
    ),
    errorElement: <ErrorPage />,
    hasErrorBoundary: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SingUpPage />,
  },
]);

const App: React.FC = () => {
  useEffect(() => {
    login();
  }, []);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-t from-orange-100 to-orange-100 font-mono font-semibold text-slate-800">
      <Suspense fallback={<LoadingIndicator isLoading />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
