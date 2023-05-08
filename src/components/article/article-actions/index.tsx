import { FC } from "react";
import { FollowButton } from "../../follow-edit-button";
import { FavoriteDeleteButton } from "../../favorite-delete-btn";
import { UserBadge } from "../../user-badge";

interface IArticleActionsProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
  slug: string;
  favorited: boolean;
  following: boolean;
  userBadgeStyle: string;
}

export const ArticleActions: FC<IArticleActionsProps> = ({
  username,
  image,
  favoritesCount,
  createdAt,
  userBadgeStyle,
  slug,
  favorited,
  following,
}) => {
  return (
    <div className="flex items-center gap-6">
      <UserBadge
        username={username}
        image={image}
        createdAt={createdAt}
        className={userBadgeStyle}
      />
      <div className="flex gap-1">
        <FollowButton username={username} following={following} />
        <FavoriteDeleteButton
          favoritesCount={favoritesCount}
          slug={slug}
          favorited={favorited}
          username={username}
        >
          {favorited ? "Unfavorite" : "Favorite"} Article
        </FavoriteDeleteButton>
      </div>
    </div>
  );
};
