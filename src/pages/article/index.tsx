import { FC } from "react";
import { Article } from "../../components/article";
import { useGetArticleQuery, useGetCommentsQuery } from "../../api/article";
import { useParams } from "react-router-dom";
import { ArticleFooter } from "../../components/article-footer";
import { Container } from "../../components/container";
import { ICommentsDTO } from "../../api/dto/comments";

export const ArticlePage: FC = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetArticleQuery(slug || "", {
    refetchOnMountOrArgChange: true,
  });
  const { data: commentsData } = useGetCommentsQuery(slug || "");

  const { comments } = (commentsData as ICommentsDTO) || [];

  if (error) {
    return <Container>Error while loading article</Container>;
  }

  if (isLoading) {
    return <Container>Article is loading...</Container>;
  }

  return (
    <div className="text-montana">
      <Article
        username={data?.article.author.username || ""}
        image={data?.article.author.image || ""}
        favoritesCount={`(${String(data?.article.favoritesCount as number)})`}
        createdAt={data?.article.createdAt as Date}
        tagList={data?.article.tagList || []}
        title={data?.article.title || ""}
        body={data?.article.body || ""}
        slug={slug || ""}
        favorited={data?.article.favorited as boolean}
        following={data?.article.author.following as boolean}
      />
      <ArticleFooter
        username={data?.article.author.username || ""}
        image={data?.article.author.image || ""}
        favoritesCount={`(${String(data?.article.favoritesCount as number)})`}
        createdAt={data?.article.createdAt as Date}
        comments={comments}
        slug={slug || ""}
        favorited={data?.article.favorited as boolean}
        following={data?.article.author.following as boolean}
      />
    </div>
  );
};
