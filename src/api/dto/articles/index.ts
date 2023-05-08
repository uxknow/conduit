export interface IArticlesDTO {
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

export interface ICreateArticleDTO {
  article: IArticle
}

export interface ICreateArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string;
}
