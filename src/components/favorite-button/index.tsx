import { FC, ReactNode } from "react";
import { MdFavorite } from "react-icons/md";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  useLikeArticleMutation,
  useUnLikeArticleMutation,
} from "../../api/article";

interface IFavoriteButtonProps {
  favoritesCount: number | string;
  slug: string;
  favorited: boolean;
  children?: ReactNode;
}

export const FavoriteButton: FC<IFavoriteButtonProps> = ({
  favoritesCount,
  slug,
  favorited,
  children = "",
}) => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [likeArticle, result] = useLikeArticleMutation();
  const [unLikeArticle, res] = useUnLikeArticleMutation();

  const liked = favorited ? "text-white bg-lightGreen" : "";

  const handleLikeClick = async () => {
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
      className={`h-7 text-sm font-normal border ${liked} text-lightGreen  border-lightGreen py-1 px-2 rounded-sm inline-flex items-center gap-0.5 hover:bg-lightGreen hover:text-white focus:outline-4 focus:outline-offset-[-2px]	focus:text-white focus:bg-lightGreen disabled:opacity-50 disabled:pointer-events-none`}
    >
      <MdFavorite />
      <span className="text-x">
        {children}
        {favoritesCount}
      </span>
    </button>
  );
};
