import { FC } from "react";

interface ITagListProps {
  tagList: string[];
}

export const TagList: FC<ITagListProps> = ({ tagList }) => {
  return (
    <ul className="flex gap-1 font-light text-sm text-lightGray">
      {tagList.map((tag) => (
        <li
          key={tag}
          className="border border-lightGray rounded-full px-2 py-0.5"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};
