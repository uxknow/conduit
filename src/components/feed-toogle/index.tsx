import { FC } from "react";
import { NavLink } from "react-router-dom";

export const FeedToogle: FC = () => {
  return (
    <div>
      <ul>
        <li className="py-2 px-4 border-b-2 border-green ml-0.5 hover:no-underline max-w-max">
          <NavLink to='/' className='text-green hover:no-underline'>Global Feed</NavLink>
        </li>
      </ul>
    </div>
  );
};
