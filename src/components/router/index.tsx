import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../../pages/home";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
