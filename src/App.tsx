import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingIndicator, Toaster, WithAuth } from '@components';
import TestView from '@presentation/pages/testView';
import { login } from '@lib';
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
  {
    path: '/test',
    element: <TestView />,
  },
]);

const App: React.FC = () => {
  useEffect(() => {
    login();
  }, []);

  return (
    <div className="bg-gradient-to-t from-orange-100 to-orange-100 text-slate-800 font-semibold font-mono min-h-screen min-w-screen">
      <Suspense fallback={<LoadingIndicator isLoading />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
