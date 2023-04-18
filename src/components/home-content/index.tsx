import { FC } from "react";
import { Container } from "../container";
import { Article } from "../article";
import { FeedToogle } from "../feed-toogle";
import { useGetArticlesQuery } from "../../api";

export const HomeContent: FC = () => {
  const { data, error, isLoading } = useGetArticlesQuery();
  console.log(data);

  if (error) {
    return <Container>Error while loading articles</Container>;
  }

  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container className="flex gap-8">
      <div className="w-[825px]">
        <FeedToogle />
        {data?.articles.map((article) => <Article key={article.slug} {...article}/>)}
      </div>
      <div className="w-[255px]">
        <span>Popular Tags</span>
      </div>
    </Container>
  );
};
