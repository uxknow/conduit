import { FC } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAuth } from "../../hooks/auth";
import { MdSettings, MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../api/profile";

interface IFollowButtonProps {
  username: string;
  following: boolean;
}

export const FollowButton: FC<IFollowButtonProps> = ({
  username,
  following,
}) => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const isAuthUser = localStorage.getItem("name") === username;
  const { pathname } = useLocation();

  const [followUser, result] = useFollowUserMutation();
  const [unfollowUser, unfolllowResult] = useUnfollowUserMutation();

  const onFollowClick = () => {
    if (!isAuthUser && !following) followUser(username);
    if (!isAuthUser && following) unfollowUser(username);
  };

  const navigateToSettings = () => {
    if (isAuthUser && pathname.includes(`${username}`)) navigate("/settings");
  };

  const followingClass = `${
    following && pathname.includes("/article") && "text-montana opacity-80"
  }`;
  const unfollowingClass = `${
    !following && pathname.includes("/article") && "text-veryLightGray"
  }`;

  return (
    <button
      onClick={() => {
        navigateToSettings(), onFollowClick();
      }}
      disabled={result.isLoading || unfolllowResult.isLoading}
      className={`h-7 flex items-center self-end my-auto text-nobel border border-nobel rounded-sm px-2 py-1 text-sm hover:bg-veryLightGray hover:text-white group focus:-outline-offset-2 active:bg-nobel/70 disabled:opacity-40 ${
        following && "bg-white"
      } ${unfollowingClass} ${followingClass}`}
    >
      {isLoggedIn && isAuthUser && pathname.includes(`${username}`) ? (
        <>
          <MdSettings /> Edit Profile Settings
        </>
      ) : isLoggedIn && isAuthUser && pathname.includes("/article") ? (
        <><MdEdit/> Edit Article</>
      ) : (
        <>
          <IoMdAdd
            className={`inline mr-1 text-nobel text-lg group-hover:text-white
              ${unfollowingClass} ${followingClass}
            `}
          />
          {following ? "Unfollow" : "Follow"} {username}
        </>
      )}
    </button>
  );
};
