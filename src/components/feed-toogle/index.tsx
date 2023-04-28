import { FC } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

interface IFeedProps {
  globalFeed?: string;
  tag?: string;
  myArticles?: string;
  favoritedArticles?: string;
}

export const FeedToogle: FC<IFeedProps> = ({
  globalFeed,
  tag,
  myArticles,
  favoritedArticles,
}) => {
  const activeStyle =
    "text-lightGreen  border-b-2 border-lightGreen pointer-events-none";
  const { username } = useParams();
  const { pathname } = useLocation();
  const favorites = pathname.includes("favorites");

  return (
    <div>
      <ul className="flex items-center text-darkGray">
        <li
          className={`py-2 px-4  ml-0.5 hover:no-underline  max-w-max ${
            ((!tag && globalFeed) || (!favorites && myArticles)) && activeStyle
          }`}
        >
          <NavLink
            to={myArticles ? `/${username}` : "/"}
            className="hover:no-underline hover:text-montana"
          >
            {globalFeed || myArticles}
          </NavLink>
        </li>
        {(tag || favoritedArticles) && (
          <li
            className={`py-2 px-4 hover:no-underline hover:text-montana ${
              (favorites || tag) && activeStyle
            }`}
          >
            <NavLink
              to={`/${username}/favorites`}
              className="hover:no-underline hover:text-montana"
            >
              {tag && "#"} {tag || favoritedArticles}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
