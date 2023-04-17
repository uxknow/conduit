import { FC } from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "./favorite-button";
import { TagList } from "./tag-list";

export const Article: FC = () => {
  return (
    <article>
      <div className="border-t border-black/20 py-6">
        <div className="mb-4 font-light flex justify-between">
          <div className="flex gap-userBadge items-center">
            <Link to={`/@{nickname}`}>
              <img
                src="https://api.realworld.io/images/demo-avatar.png"
                className="h-8 w-8 rounded-full inline-block"
                alt="avatar"
              />
            </Link>
            <div className="flex flex-col">
              <Link
                to={`/@{nickname}`}
                className="leading-5 text-green hover:text-darkGreen hover:underline"
              >
                Anna Benesona
              </Link>
              <span className="text-xs text-lightGray">December 20, 2023</span>
            </div>
          </div>
          <FavoriteButton />
        </div>
        <Link to={`/@{article}{id}`} className="hover:no-underline hover:text">
          <h1 className="font-semibold text-2xl text-montana">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            optio ea saepe, commodi laudantium dolores reprehenderit, mollitia
            facere ipsum fuga.
          </h1>
          <p className="mb-4 text-lightGray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            eaque adipisci assumenda facilis obcaecati repellat praesentium
            eveniet dicta natus vel doloremque ad, illum illo dolor ducimus.
            Tenetur fugit ex repellat. Aliquam nulla tempora itaque incidunt
            asperiores, reiciendis veritatis expedita vitae laborum ad, ipsum
            quisquam! Fuga dolorum suscipit maiores dicta rem, obcaecati quasi
            fugit, quibusdam unde dignissimos eaque eveniet temporibus laborum!
          </p>
          <div className="flex items-center justify-between">
            <span className="font-light text-sm text-lightGray">
              Read more...
            </span>
            <TagList />
          </div>
        </Link>
      </div>
    </article>
  );
};
