import { FC } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdSettings, MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../api/profile";
import { useAppSelector } from "../../hooks/redux";

interface IFollowButtonProps {
  username: string;
  following: boolean;
  slug?: string;
}

export const FollowButton: FC<IFollowButtonProps> = ({
  username,
  following,
  slug,
}) => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const isCurrUser = user?.username === username;
  const { pathname } = useLocation();

  const [followUser, result] = useFollowUserMutation();
  const [unfollowUser, unfolllowResult] = useUnfollowUserMutation();

  const onFollowClick = () => {
    if (!isAuth) {
      navigate('/register')
      return;
    }
    if (!isCurrUser && !following) followUser(username);
    if (!isCurrUser && following) unfollowUser(username);
  };

  const navigateToSettings = () => {
    if (isCurrUser && pathname.includes(`${username}`)) navigate("/settings");
  };

  const navigateToEditor = () => {
    if (isCurrUser && pathname.includes("/article"))
      navigate(`/editor/${slug}`);
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
        navigateToSettings(), onFollowClick(), navigateToEditor();
      }}
      disabled={result.isLoading || unfolllowResult.isLoading}
      className={`h-7 flex items-center self-end my-auto text-nobel border border-nobel rounded-sm px-2 py-1 text-sm hover:bg-veryLightGray hover:text-white group focus:-outline-offset-2 active:bg-nobel/70 disabled:opacity-40 ${
        following && "bg-white"
      } ${unfollowingClass} ${followingClass}`}
    >
      {isAuth && isCurrUser && pathname.includes(`${username}`) ? (
        <>
          <MdSettings /> Edit Profile Settings
        </>
      ) : isAuth && isCurrUser && pathname.includes("/article") ? (
        <>
          <MdEdit /> Edit Article
        </>
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
