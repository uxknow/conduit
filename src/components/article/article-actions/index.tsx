import { FC } from "react";
import { FollowButton } from "../../follow-button";
import { FavoriteButton } from "../../favorite-button";
import { UserBadge } from "../../user-badge";

interface IArticleActionsProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
  userBadgeStyle: string;
}

export const ArticleActions: FC<IArticleActionsProps> = ({
  username,
  image,
  favoritesCount,
  createdAt,
  userBadgeStyle,
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
        <FollowButton username={username} />
        <FavoriteButton favoritesCount={favoritesCount}>
          Favorite Article
        </FavoriteButton>
      </div>
    </div>
  );
};
