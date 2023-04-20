import { FC } from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "./favorite-button";
import { TagList } from "./tag-list";
import { IArticle } from "../../api/dto/articles";

export const Article: FC<IArticle> = ({
  title,
  description,
  createdAt,
  author,
  tagList,
  favoritesCount,
}) => {
  const date = new Date(createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article>
      <div className="border-t border-black/20 py-6">
        <div className="mb-4 font-light flex justify-between">
          <div className="flex gap-userBadge items-center">
            <Link to={`/@${author.username}`}>
              <img
                src={author.image}
                className="h-8 w-8 rounded-full inline-block"
                alt={`${author.username} avatar`}
              />
            </Link>
            <div className="flex flex-col font-normal">
              <Link
                to={`/@${author.username}`}
                className="leading-5 text-green hover:text-darkGreen hover:underline"
              >
                {author.username}
              </Link>
              <span className="text-xs text-lightGray">{date}</span>
            </div>
          </div>
          <FavoriteButton favoritesCount={favoritesCount} />
        </div>
        <Link to={`/@{article}{id}`} className="hover:no-underline hover:text">
          <h1 className="font-semibold text-2xl text-montana">{title}</h1>
          <p className="mb-4 text-lightGray">{description}</p>
          <div className="flex items-center justify-between">
            <span className="font-light text-sm text-lightGray">
              Read more...
            </span>
            <TagList tagList={tagList}/>
          </div>
        </Link>
      </div>
    </article>
  );
};
