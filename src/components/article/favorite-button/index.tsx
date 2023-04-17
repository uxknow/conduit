import { FC } from "react";
import { MdFavorite } from "react-icons/md";

export const FavoriteButton: FC = () => {
  return (
    <button className="text-sm font-normal border text-green border-green py-1 px-2 rounded-md flex items-center gap-0.5 hover:bg-green hover:text-white focus:outline-4 focus:outline-offset-[-2px]	focus:text-white focus:bg-green">
      <MdFavorite />
      <span className="text-x">977</span>
    </button>
  );
};
