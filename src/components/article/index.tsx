import { FC } from "react";
import { ArticleBanner } from "./article-banner";
import { TagList } from "../tag-list";
import { Container } from "../container";

interface IArticleProps {
  username: string
  image: string
  favoritesCount: number | string
  createdAt: Date
  tagList: string[]
  title: string
  body: string
}

export const Article: FC<IArticleProps> = ({username, image, favoritesCount, createdAt, tagList, title, body}) => {
  return (
    <div>
      <ArticleBanner username={username} image={image} favoritesCount={favoritesCount} title={title} createdAt={createdAt}/>
      <Container className="mt-6">
        <p className="text-xl mb-8 font-sourceSerif">{body}</p>
        <TagList tagList={tagList} className="[&.text-silver]:text-darkGray  font-semibold"/>
        <hr className="mt-10 mb-5" />
      </Container>
    </div>
  );
};
