import { FC } from "react";
import { Banner } from "../../components/banner";
import { HomeContent } from "../../components/home-content";
import { useAppSelector } from "../../hooks/redux";

export const HomePage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <main>
      {!isAuth && <Banner />}
      <HomeContent />
    </main>
  );
};
