import { FC } from "react";
import { Header } from "../header";
import { Outlet } from "react-router-dom";

interface ILayoutProps {}

export const Layout: FC<ILayoutProps> = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
