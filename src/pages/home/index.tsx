import { FC } from "react";
import { Banner } from "../../components/banner";
import { HomeContent } from "../../components/home-content";

export const HomePage: FC = () => {
  return (
    <main>
      <Banner />
      <HomeContent />
    </main>
  );
};
