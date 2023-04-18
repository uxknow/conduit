import { FC } from "react";
import { MdFavorite } from "react-icons/md";

interface IFavoriteButtonProps {
  favoritesCount: number
}

export const FavoriteButton: FC<IFavoriteButtonProps> = ({favoritesCount}) => {
  return (
    <button className="h-7 leading-3 text-sm font-normal border text-green border-green py-0.5 px-2 rounded-md inline-flex items-center gap-0.5 hover:bg-green hover:text-white focus:outline-4 focus:outline-offset-[-2px]	focus:text-white focus:bg-green">
      <MdFavorite />
      <span className="text-x">{favoritesCount}</span>
    </button>
  );
};
