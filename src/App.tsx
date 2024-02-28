import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingIndicator, Toaster } from './components';
import TestView from './pages/testView';
import { login } from './lib/connectionToSupabase';

const HomeView = lazy(() => import('./pages/homeView'));

const routes = [
  {
    path: '/',
    element: <HomeView />,
  },
  {
    path: '/test',
    element: <TestView />,
  },
];

const router = createBrowserRouter(routes);

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
