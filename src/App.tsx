import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/router";

export const App: FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
