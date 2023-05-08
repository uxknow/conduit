import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout";
import { HomePage } from "../../pages/home";
import { ProfilePage } from "../../pages/profile";
import { ArticlePage } from "../../pages/article";
import { AuthComponent } from "../../pages/auth";
import { EditorPage } from "../../pages/editor";

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
        element: <AuthComponent />,
      },
      {
        path: '/register',
        element: <AuthComponent/>
      },
      {
        path: '/editor',
        element: <EditorPage/>,
        children: [
          { 
            path: ':slug',
            element: <EditorPage/>
          }
        ]
      }
    ],
  },
]);
