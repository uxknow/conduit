import { FC } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

interface IFeedProps {
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  globalFeed?: string;
  tag?: string;
  myArticles?: string;
  favoritedArticles?: string;
}

export const FeedToogle: FC<IFeedProps> = ({
  activeTab,
  setActiveTab,
  globalFeed,
  tag,
  myArticles,
  favoritedArticles,
}) => {
  const activeStyle =
    "text-lightGreen  border-b-2 border-lightGreen pointer-events-none";
  const { username } = useParams();
  const { pathname } = useLocation();
  const { isAuth } = useAppSelector((state) => state.user);
  const favorites = pathname.includes("favorites");

  return (
    <div>
      <ul className="flex items-center text-darkGray">
        {isAuth && !myArticles && (
          <li
            className={`py-2 px-4  ml-0.5 hover:no-underline  max-w-max ${
              !tag && activeTab === "your" && activeStyle
            }`}
            onClick={() => setActiveTab!("your")}
          >
            <NavLink to="/" className="hover:no-underline hover:text-montana">
              Your Feed
            </NavLink>
          </li>
        )}
        <li
          className={`py-2 px-4  ml-0.5 hover:no-underline  max-w-max ${
            ((!tag && globalFeed && activeTab === "global") ||
              (!favorites && myArticles)) &&
            activeStyle
          }`}
          onClick={() => !myArticles && setActiveTab!("global")}
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
