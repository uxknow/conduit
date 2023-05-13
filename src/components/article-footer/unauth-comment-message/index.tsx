import {FC} from 'react'
import { Link } from 'react-router-dom'


export const UnAuthCommentsMessage: FC = () => {
  return (
    <p className='text-center'>
          <Link to="/login" className="text-lightGreen">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to="/register" className="text-lightGreen">
            Sign up
          </Link>{" "}
          to add comments on this article
        </p>
  )
}