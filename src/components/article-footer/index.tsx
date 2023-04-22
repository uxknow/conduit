import { FC } from "react";
import { Container } from "../container";
import { ArticleActions } from "../article/article-actions";
import { Link } from "react-router-dom";

interface IArticleFooterProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
}

export const ArticleFooter: FC<IArticleFooterProps> = ({
  username,
  image,
  favoritesCount,
  createdAt,
}) => {
  return (
    <Container className="flex flex-col items-center">
      <ArticleActions
        username={username}
        image={image}
        favoritesCount={favoritesCount}
        createdAt={createdAt}
        userBadgeStyle="text-green"
      />
      <div className="my-12 self-start ml-[16%] text-montana">
        <Link to="/login" className="text-green">Sign in</Link> or <Link to="/register" className="text-green">Sign up</Link>{" "}
        to add comments on this article
      </div>
    </Container>
  );
};
