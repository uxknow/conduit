import { RootState, AppDispatch } from "../../store";
import { IArticle } from "../../api/dto/articles";
import { articleApi } from "../../api/article";

interface IQueryParams {
  page: number;
  limit: number;
  tag?: string | null;
  author?: string | null;
  favorited?: string | null;
}

interface Article {
  article: IArticle;
}

export const getQueryParamsInState = (state: RootState, name: string) => {
  const queriesArr = Object.entries(state.articleApi.queries);

  const queryParams = queriesArr.reduce((acc, curr) => {
    if (curr[0].includes(`${name}`)) {
      acc = curr[1]?.originalArgs as IQueryParams;
    }
    return acc;
  }, {} as IQueryParams);

  return queryParams
}

export const updateQueryDataArticles = (dispatch: AppDispatch, queryParams: IQueryParams, slug: string, data: Article, queryName: 'getArticles' | 'getArticlesFeed') => {
  const result = dispatch(
    articleApi.util.updateQueryData(
      queryName,
      queryParams,
      (draft) => {
        draft.articles.forEach((article) => {
          if (article.slug === slug) {
            article.favorited = data.article.favorited;
            article.favoritesCount = data.article.favoritesCount;
          }
        });
      }
    )
  );
  return result
}