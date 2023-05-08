import { FC, ReactNode } from "react";
import { MdFavorite } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  useLikeArticleMutation,
  useUnLikeArticleMutation,
} from "../../api/article";

interface IFavoriteDeleteButtonProps {
  favoritesCount: number | string;
  slug: string;
  favorited: boolean;
  username?: string;
  children?: ReactNode;
}

export const FavoriteDeleteButton: FC<IFavoriteDeleteButtonProps> = ({
  favoritesCount,
  slug,
  favorited,
  username,
  children = "",
}) => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [likeArticle, result] = useLikeArticleMutation();
  const [unLikeArticle, res] = useUnLikeArticleMutation();

  const liked = favorited ? "text-white bg-lightGreen" : "";
  const likeBtnClass =
    "text-lightGreen border-lightGreen hover:bg-lightGreen focus:bg-lightGreen";
  const deleteBtnClass =
    "text-FuzzyWuzzyBrown border-FuzzyWuzzyBrown hover:bg-FuzzyWuzzyBrown focus:bg-FuzzyWuzzyBrown";
  const isAuthUser = localStorage.getItem("name") === username;

  const handleLikeClick = async () => {
    if (isAuthUser) {
      return;
    }

    if (!isLoggedIn) {
      navigate("/register");
      return;
    }
    if (!favorited) {
      await likeArticle(slug);
    } else {
      await unLikeArticle(slug);
    }
  };
  return (
    <button
      onClick={handleLikeClick}
      disabled={result.isLoading || res.isLoading}
      className={`h-7 text-sm font-normal border ${liked} py-1 px-2 rounded-sm inline-flex items-center gap-0.5 hover:text-white focus:outline-4 focus:outline-offset-[-2px]	focus:text-white  disabled:opacity-50 disabled:pointer-events-none ${
        isAuthUser ? deleteBtnClass : likeBtnClass
      }`}
    >
      {isLoggedIn && isAuthUser ? (
        <>
          <RiDeleteBin6Line /> Delete Article
        </>
      ) : (
        <>
          <MdFavorite />
          <span className="text-x">
            {children}
            {favoritesCount}
          </span>
        </>
      )}
    </button>
  );
};
