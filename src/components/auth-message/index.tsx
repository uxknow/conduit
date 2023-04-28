import {FC} from 'react'

interface IAuthMessageProps {
  error: string
}

export const AuthMessage: FC<IAuthMessageProps> = ({error}) => {
  return (
    <ul className="pl-10 mb-4 text-left">
          <li className={`font-bold text-red-700 ${error && 'list-disc'}`}>
            {error}
          </li>
        </ul>
  )
}