import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { HomePage } from "../../pages/home";
import { ProfilePage } from "../../pages/profile";
import { LoginPage } from "../../pages/auth/login";
import { ArticlePage } from "../../pages/article";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/:username",
        element: <ProfilePage />,
        children: [
          {
            path: "favorites",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '/article/:slug',
        element: <ArticlePage/>
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
