import {FC} from 'react'
import { Link } from "react-router-dom";

interface IUserBadgeProps {
  username: string
  image: string
  createdAt: Date
  className?: string
}

export const UserBadge: FC<IUserBadgeProps> = ({username, image, createdAt, className=''}) => {
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
                className="h-8 w-8 rounded-full inline-block"
                alt={`${username} avatar`}
              />
            </Link>
            <div className="flex flex-col font-normal">
              <Link
                to={`/@${username}`}
                className={`leading-5 text-green hover:text-darkGreen hover:underline ${className}`}
              >
                {username}
              </Link>
              <span className="text-xs text-silver">{date}</span>
            </div>
          </div>
  )
}