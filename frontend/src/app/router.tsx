import { createBrowserRouter } from "react-router-dom";

import HomePage from "../features/home/pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import DestinationPage from "../features/destinations/pages/DestinationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/destinations/:destination",
    element: <DestinationPage />,
  },
]);