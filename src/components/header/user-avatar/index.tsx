import { FC } from "react";

interface IUserAvatarProps {
  image: string;
  username: string;
}

export const UserAvatar: FC<IUserAvatarProps> = ({ image, username }) => {
  return (
    <div className="flex items-center">
      <div className="h-[26px] mr-1.5 rounded-full overflow-hidden">
        <img
          src={image}
          alt={`${username} avatar`}
          className="w-full h-full object-cover "
        />
      </div>
      <span>{username}</span>
    </div>
  );
};
