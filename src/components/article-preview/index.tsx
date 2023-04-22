import { FC } from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../favorite-button";
import { TagList } from "../tag-list";
import { IArticle } from "../../api/dto/articles";
import { UserBadge } from "../user-badge";

export const ArticlePreview: FC<IArticle> = ({
  title,
  description,
  createdAt,
  author,
  tagList,
  favoritesCount,
  slug
}) => {

  return (
    <article>
      <div className="border-t border-black/20 py-6">
        <div className="mb-4 font-light flex justify-between">
          <UserBadge username={author.username} image={author.image} createdAt={createdAt}/>
          <FavoriteButton favoritesCount={favoritesCount} />
        </div>
        <Link to={`/article/${slug}`} className="hover:no-underline hover:text">
          <h1 className="font-semibold text-2xl text-montana">{title}</h1>
          <p className="mb-4 text-silver">{description}</p>
          <div className="flex items-center justify-between">
            <span className="font-light text-sm text-silver">
              Read more...
            </span>
            <TagList tagList={tagList} />
          </div>
        </Link>
      </div>
    </article>
  );
};
