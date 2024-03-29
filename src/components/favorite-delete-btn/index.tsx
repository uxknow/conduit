import { FC, ReactNode } from "react";
import { MdFavorite } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnLikeArticleMutation,
} from "../../api/article";
import { useAppSelector } from "../../hooks/redux";

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
  const { isAuth } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [likeArticle, result] = useLikeArticleMutation();
  const [unLikeArticle, res] = useUnLikeArticleMutation();
  const [deleteArticle, resultDelete] = useDeleteArticleMutation();

  const liked = favorited
    ? "text-white bg-lightGreen hover:bg-darklightGreen"
    : "";
  const likeBtnClass = `text-lightGreen border-lightGreen ${
    !favorited && "hover:bg-lightGreen"
  } focus:bg-lightGreen disabled:pointer-events-none`;
  const deleteBtnClass =
    "text-FuzzyWuzzyBrown border-FuzzyWuzzyBrown hover:bg-FuzzyWuzzyBrown focus:bg-FuzzyWuzzyBrown disabled:cursor-not-allowed";

  const isCurrUser = user?.username === username;

  const handleLikeClick = async () => {
    if (isCurrUser && isAuth) {
      return;
    }

    if (!isAuth) {
      navigate("/register");
      return
    }
    if (!favorited) {
      await likeArticle(slug);
    } else {
      await unLikeArticle(slug);
    }
  };

  const handleDeleteClick = async () => {
    if (!isCurrUser) return;

    if (isCurrUser && isAuth) {
      await deleteArticle(slug);
      navigate(`/@${username}`);
    }
  };
  return (
    <button
      onClick={() => {
        handleLikeClick(), handleDeleteClick();
      }}
      disabled={result.isLoading || res.isLoading || resultDelete.isLoading}
      className={`h-7 text-sm font-normal border ${liked} py-1 px-2 rounded-sm inline-flex items-center gap-0.5 hover:text-white focus:outline-4 focus:outline-offset-[-2px]	focus:text-white  disabled:opacity-50  ${
        isAuth && isCurrUser ? deleteBtnClass : likeBtnClass
      }`}
    >
      {isAuth && isCurrUser ? (
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
