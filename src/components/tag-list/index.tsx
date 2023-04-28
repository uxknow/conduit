import { FC } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useRegisterUserMutation } from "../../api/auth";

enum TagListStyle {
  DARK = "dark",
  LIGHT = "light",
}

interface ITagListProps {
  tagList: string[];
  tagStyle?: keyof typeof TagListStyle;
  tagAs?: "li" | "a";
  className?: string;
}

export const TagList: FC<ITagListProps> = ({
  tagList,
  tagStyle = TagListStyle.LIGHT,
  tagAs = "li",
  className = "",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currTag = searchParams.get("tag") as string;

  const darkTagItem =
    tagStyle.toLowerCase() === TagListStyle.DARK &&
    "bg-aluminium text-white hover:bg-midGray hover:no-underline hover:text-white";

  return (
    <ul
      className={`flex flex-wrap gap-1 font-light text-xs text-silver ${className}`}
    >
      {tagList.map((tag) =>
        tagAs === "li" ? (
          <li
            key={tag}
            className="border border-silver rounded-full px-2 py-0.5"
          >
            {tag}
          </li>
        ) : (
          <NavLink
            key={tag}
            className={`border border-silver rounded-full px-2 py-0.5 ${darkTagItem} ${
              tag.includes(currTag) && "bg-midGray underline"
            }`}
            to={`/?tag=${tag}`}
          >
            {tag}
          </NavLink>
        )
      )}
    </ul>
  );
};
