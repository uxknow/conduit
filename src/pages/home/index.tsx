import { FC } from "react";
import { Banner } from "../../components/banner";
import { HomeContent } from "../../components/home-content";
import { useAuth } from "../../hooks/auth";

export const HomePage: FC = () => {
  const isLoggedIn = useAuth()

  return (
    <main>
      {!isLoggedIn && <Banner />}
      <HomeContent />
    </main>
  );
};
