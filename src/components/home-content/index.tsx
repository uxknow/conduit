import { FC } from "react";
import { Container } from "../container";
import { Article } from "../article";
import { FeedToogle } from "../feed-toogle";

export const HomeContent: FC = () => {
  return (
    <Container className="flex gap-8">
      <div className="w-3/4">
        <FeedToogle />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
      <div className="w-1/4">
        <span>Popular Tags</span>
      </div>
    </Container>
  );
};
