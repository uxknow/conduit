import { FC, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

enum TagListStyle {
  DARK = "dark",
  LIGHT = "light",
}

interface ITagListProps {
  tagList: string[];
  tagStyle?: keyof typeof TagListStyle;
  tagAs?: "li" | "a";
}

export const TagList: FC<ITagListProps> = ({
  tagList,
  tagStyle = TagListStyle.LIGHT,
  tagAs = "li",
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currTag = searchParams.get('tag') as string

  const darkTagItem =
    tagStyle.toLowerCase() === TagListStyle.DARK &&
    "bg-bgPopularTag text-white hover:bg-bgPopularTagHover hover:no-underline hover:text-white";
  
    return (
    <ul className="flex flex-wrap gap-1 font-light text-xs text-lightGray">
      {tagList.map((tag) =>
        tagAs === "li" ? (
          <li
            key={tag}
            className="border border-lightGray rounded-full px-2 py-0.5"
          >
            {tag}
          </li>
        ) : (
          <NavLink
            key={tag}
            className={`border border-lightGray rounded-full px-2 py-0.5 ${darkTagItem} ${tag.includes(currTag) && 'bg-bgPopularTagHover underline'}`}
            to={`/?tag=${tag}`}
          >
            {tag}
          </NavLink>
        )
      )}
    </ul>
  );
};
