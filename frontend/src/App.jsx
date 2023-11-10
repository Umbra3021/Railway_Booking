import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login, Register, Home, Trains } from "./components/index";
import { loader as TrainInfo } from "./components/Trains";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <Home />,
  },
  {
    path: "/results",
    element: <Trains />,
    loader: TrainInfo,
  },
]);

function App() {
  return (
  <RouterProvider router={router} />);
}

export default App;
