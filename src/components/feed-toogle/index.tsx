import { FC } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

export const FeedToogle: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tag = searchParams.get('tag')
  const activeStyle = 'text-green  border-b-2 border-green pointer-events-none'

  return (
    <div>
      <ul className="flex items-center text-feedColor">
        <li className={`py-2 px-4  ml-0.5 hover:no-underline  max-w-max ${!tag && activeStyle}`}>
          <NavLink to='/' className='hover:no-underline hover:text-montana'>Global Feed</NavLink>
        </li>
        {tag && <li className={`py-2 px-4 hover:no-underline hover:text-montana ${activeStyle}`}># {tag}</li>}
      </ul>
    </div>
  );
};
