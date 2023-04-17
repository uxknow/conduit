import { FC } from "react";
import { Banner } from "./banner";
import {  HomeContent } from "../../components/home-content";

export const Home: FC = () => {
  return (
    <main>
      <Banner />
      <HomeContent />
    </main>
  );
};
