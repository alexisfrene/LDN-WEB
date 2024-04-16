import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingIndicator, Toaster, WithAuth } from './components';
import TestView from './pages/testView';
import { login } from './lib/connectionToSupabase';
const FilingPage = lazy(() => import('./pages/filing'));
const SingUpPage = lazy(() => import('./pages/sign'));
const HomePage = lazy(() => import('./pages/home'));
const LoginPage = lazy(() => import('./pages/login'));
const ErrorPage = lazy(() => import('./pages/error'));

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
