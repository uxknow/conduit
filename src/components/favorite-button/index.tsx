import { FC, ReactNode } from "react";
import { MdFavorite } from "react-icons/md";

interface IFavoriteButtonProps {
  favoritesCount: number | string
  children?: ReactNode
}

export const FavoriteButton: FC<IFavoriteButtonProps> = ({favoritesCount, children = ''}) => {
  return (
    <button className="h-7 text-sm font-normal border text-green  border-green py-1 px-2 rounded-sm inline-flex items-center gap-0.5 hover:bg-green hover:text-white focus:outline-4 focus:outline-offset-[-2px]	focus:text-white focus:bg-green">
      <MdFavorite />
      <span className="text-x">{children}{favoritesCount}</span>
    </button>
  );
};
