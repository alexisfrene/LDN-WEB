import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeView } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);
function App() {
  return (
    <div className="bg-gradient-to-t from-orange-300 to-orange-400 text-slate-800 font-semibold font-mono min-h-screen min-w-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
