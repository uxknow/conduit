import {FC} from 'react'
import { UserBadge } from '../user-badge'

interface ICommentProps {
  body: string
  username: string
  image: string
  createdAt: Date
}

export const Comment:FC<ICommentProps> = ({body, username, image, createdAt}) => {
  return (
    <div className="border rounded max-w-3xl">
          <div  className="p-5">
            <p>{body}</p>
          </div>
          <div className="border-t py-3 px-5 text-xs bg-neutral-100">
            <UserBadge
              username={username}
              image={image}
              createdAt={new Date(createdAt)}
              direction="row"
            />
          </div>
        </div>
  )
}