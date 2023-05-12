import { FC } from "react";
import { Container } from "../container";
import { ArticleActions } from "../article/article-actions";
import { CommentsList } from "./comments-list";
import { IComment } from "../../api/dto/comments";
import { UnAuthCommentsMessage } from "./unauth-comment-message";
import { AddComment } from "./add-comment";
import { useAppSelector } from "../../hooks/redux";

interface IArticleFooterProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
  comments: IComment[];
  slug: string;
  favorited: boolean;
  following: boolean;
}

export const ArticleFooter: FC<IArticleFooterProps> = ({
  username,
  image,
  favoritesCount,
  createdAt,
  comments,
  slug,
  favorited,
  following,
}) => {
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <Container className="flex flex-col items-center mb-8">
      <ArticleActions
        username={username}
        image={image}
        favoritesCount={favoritesCount}
        createdAt={createdAt}
        slug={slug}
        userBadgeStyle="text-lightGreen"
        favorited={favorited}
        following={following}
      />
      <div className="mt-12 mb-4 text-montana w-full">
        {isAuth ? <AddComment slug={slug} /> : <UnAuthCommentsMessage />}
        <div className="flex flex-col gap-3 mt-5 max-w-3xl mx-auto">
          <CommentsList comments={comments} />
        </div>
      </div>
    </Container>
  );
};
