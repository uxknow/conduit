import { FC } from "react";
import { Container } from "../container";
import { ArticleActions } from "../article/article-actions";
import { Link } from "react-router-dom";
import { CommentsList } from "./comments-list";
import { IComment } from "../../api/dto/comments";

interface IArticleFooterProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
  comments: IComment[];
}

export const ArticleFooter: FC<IArticleFooterProps> = ({
  username,
  image,
  favoritesCount,
  createdAt,
  comments,
}) => {
  return (
    <Container className="flex flex-col items-center mb-8">
      <ArticleActions
        username={username}
        image={image}
        favoritesCount={favoritesCount}
        createdAt={createdAt}
        userBadgeStyle="text-green"
      />
      <div className="mt-12 mb-4 self-start ml-[16%] text-montana">
        <p className="mb-5">
          <Link to="/login" className="text-green">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to="/register" className="text-green">
            Sign up
          </Link>{" "}
          to add comments on this article
        </p>
        <div className="flex flex-col gap-3">
          <CommentsList comments={comments} />
        </div>
      </div>
    </Container>
  );
};
