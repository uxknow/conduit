export interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}