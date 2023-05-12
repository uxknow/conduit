import { FC, useState } from "react";

interface IUserAvatarProps {
  image: string;
  username: string;
}

export const UserAvatar: FC<IUserAvatarProps> = ({ image, username }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="flex items-center">
      <div className="h-[26px] mr-1.5 rounded-full overflow-hidden">
        <img
          src={image}
          alt={`${username} avatar`}
          className="w-full h-full object-cover "
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      {isImageLoaded && <span>{username}</span>}
    </div>
  );
};
