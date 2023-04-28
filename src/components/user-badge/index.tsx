import { FC } from "react";
import { Link } from "react-router-dom";

interface IUserBadgeProps {
  username: string;
  image: string;
  createdAt: Date;
  className?: string;
  direction?: string;
}

export const UserBadge: FC<IUserBadgeProps> = ({
  username,
  image,
  createdAt,
  className = "",
  direction = "col",
}) => {
  const date = new Date(createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex gap-userBadge items-center">
      <Link to={`/@${username}`}>
        <img
          src={image}
          className={`${
            direction === "col" ? "h-8 w-8" : "h-5 w-5"
          } rounded-full inline-block`}
          alt={`${username} avatar`}
        />
      </Link>
      <div
        className={`flex ${
          direction === "col"
            ? "flex-col font-normal"
            : "items-center gap-2 font-light"
        }`}
      >
        <Link
          to={`/@${username}`}
          className={`leading-5 text-lightGreen hover:text-darklightGreen hover:underline ${className}`}
        >
          {username}
        </Link>
        <span className="text-xs text-silver">{date}</span>
      </div>
    </div>
  );
};
