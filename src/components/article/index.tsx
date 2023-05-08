import { FC } from "react";
import { ArticleBanner } from "./article-banner";
import { TagList } from "../tag-list";
import { Container } from "../container";
import MDEditor from "@uiw/react-md-editor";

interface IArticleProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
  tagList: string[];
  title: string;
  body: string;
  slug: string;
  favorited: boolean
  following: boolean
}

export const Article: FC<IArticleProps> = ({
  username,
  image,
  favoritesCount,
  createdAt,
  tagList,
  title,
  body,
  slug,
  favorited,
  following
}) => {
  const newBody = body.split("\\n").join(" ");

  return (
    <div>
      <ArticleBanner
        username={username}
        image={image}
        favoritesCount={favoritesCount}
        title={title}
        createdAt={createdAt}
        slug={slug}
        favorited={favorited}
        following={following}
      />
      <Container className="mt-6">
        <MDEditor.Markdown source={newBody} className="text-lg mb-8 font-sourceSerif"/>
        <TagList
          tagList={tagList}
          className="[&.text-silver]:text-darkGray  font-semibold"
        />
        <hr className="mt-10 mb-5" />
      </Container>
    </div>
  );
};
