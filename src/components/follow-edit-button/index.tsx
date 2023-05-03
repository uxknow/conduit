import { FC } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAuth } from "../../hooks/auth";
import { MdSettings } from "react-icons/md";

interface IFollowButtonProps {
  username: string;
}

export const FollowButton: FC<IFollowButtonProps> = ({ username }) => {
  const isLoggedIn = useAuth();

  return (
    <button className="h-7 flex items-center self-end my-auto text-nobel border border-nobel rounded-sm px-2 py-1 text-sm hover:bg-veryLightGray hover:text-white group focus:-outline-offset-2 active:bg-nobel/70">
      {isLoggedIn && username === localStorage.getItem('name') ? (
        <>
          <MdSettings /> Edit Profile Settings
        </>
      ) : (
        <>
          <IoMdAdd className="inline mr-1 text-nobel text-lg group-hover:text-white" />
          Follow {username}
        </>
      )}
    </button>
  );
};
