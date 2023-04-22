import { FC } from "react";
import { Article } from "../../components/article";
import { useGetArticleQuery } from "../../api/article";
import { useParams } from "react-router-dom";
import { ArticleFooter } from "../../components/article-footer";
import { Container } from "../../components/container";

export const ArticlePage: FC = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetArticleQuery(slug || "");

  if (error) {
    return <Container>Error while loading article</Container>;
  }

  if (isLoading) {
    return <Container>Article is loading...</Container>
  }
  return (
    <div>
      <Article
        username={data?.article.author.username || ""}
        image={data?.article.author.image || ""}
        favoritesCount={`(${String(data?.article.favoritesCount as number)})`}
        createdAt={data?.article.createdAt as Date}
        tagList={data?.article.tagList || []}
        title={data?.article.title || ''}
        body={data?.article.body || ''}
      />
      <ArticleFooter
        username={data?.article.author.username || ""}
        image={data?.article.author.image || ""}
        favoritesCount={`(${String(data?.article.favoritesCount as number)})`}
        createdAt={data?.article.createdAt as Date}
      />
    </div>
  );
};
