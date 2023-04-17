import { FC } from "react";
import { Container } from "../../../components/container";

export const Banner: FC = () => {
  return (
    <div className="bg-green shadow-banner p-8 mb-8">
      <Container className='text-center text-white'>
        <h1 className="font-titillium text-bannerLogo drop-shadow-bannerLogo">conduit</h1>
        <p className="text-2xl font-light">A place to share your knowledge.</p>
      </Container>
    </div>
  );
};
