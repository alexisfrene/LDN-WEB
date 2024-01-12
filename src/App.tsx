import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoadingIndicator } from './components';
import TestView from './pages/testView';
const HomeView = lazy(() => import('./pages/homeView'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />,
  },
  {
    path: '/test',
    element: <TestView />,
  },
]);
const App = () => {
  return (
    <div className="bg-gradient-to-t from-orange-100 to-orange-100 text-slate-800 font-semibold font-mono min-h-screen min-w-screen">
      <Suspense fallback={<LoadingIndicator isLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};

export default App;
