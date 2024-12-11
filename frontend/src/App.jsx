import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
  Login,
  Register,
  Home,
  Trains,
  Booking,
  Base,
  Transaction,
  Ticket,
} from "./components/index";

import { loader as TrainInfo } from "./components/Trains";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        element: <Register />,
        index: true,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "transactions",
        element: <Transaction />,
        loader: async () => {
          const customer = localStorage.getItem("User");
          let data = await axios.post("http://localhost:5000/transaction",{customer});
          return data;
          
        },
      },
      {
        path: "ticket",
        element: <Ticket />,
      },
      {
        path: "search",
        element: <Home />,
      },
      {
        path: "results",
        element: <Trains />,
        loader: TrainInfo,
      },
      {
        path: "booking_details",
        element: <Ticket />,
        loader: async () => {
          let resp = await axios.get("http://localhost:5000/get_booking");
          return resp;
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
