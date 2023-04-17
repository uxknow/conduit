import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { Header } from "../header";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Header />,
      },
    ],
  },
]);
