import { FC } from "react";
import { Container } from "../../container";
import { ArticleActions } from "../article-actions/index";

interface IArticleBannerProps {
  username: string;
  image: string;
  favoritesCount: number | string;
  createdAt: Date;
  title: string;
  slug: string
  favorited: boolean
}

export const ArticleBanner: FC<IArticleBannerProps> = ({
  username,
  image,
  favoritesCount,
  slug,
  createdAt,
  title,
  favorited
}) => {
  return (
    <div className="bg-darkCharcoal text-white py-8">
      <Container>
        <h1 className="text-5xl font-semibold mb-8">{title}</h1>
        <ArticleActions
          username={username}
          image={image}
          favoritesCount={favoritesCount}
          createdAt={createdAt}
          slug={slug}
          favorited={favorited}
          userBadgeStyle="[&.text-lightGreen]:text-white"
        />
      </Container>
    </div>
  );
};
