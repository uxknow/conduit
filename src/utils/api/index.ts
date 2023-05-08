import { RootState, AppDispatch } from "../../store";
import { IArticle } from "../../api/dto/articles";
import { articleApi } from "../../api/article";
import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { IProfile } from '../../api/dto/profiles';
import { CombinedState } from "@reduxjs/toolkit";

interface IQueryParams {
  page: number;
  limit: number;
  tag?: string | null;
  author?: string | null;
  favorited?: string | null;
}

export const getQueryParamsInState = (state: RootState, name: string) => {
  const queriesArr = Object.entries(state.articleApi.queries);
  const queryParams = queriesArr.reduce((acc, curr) => {
    if (curr[0].startsWith(`${name}`)) {
      acc.push(curr[1]?.originalArgs as IQueryParams);
    }
    return acc;
  }, [] as IQueryParams[]);

  return queryParams;
};

export const updateQueryDataArticles = (
  dispatch: AppDispatch,
  queryParams: IQueryParams[],
  slug: string,
  data: {article: IArticle},
  queryName: "getArticles" | "getArticlesFeed"
) => {
  let result: null | PatchCollection = null

  queryParams.forEach(param => {
    result = dispatch(
      articleApi.util.updateQueryData(queryName, param, (draft) => {   
        draft.articles.forEach((article) => {
          if (article.slug === slug) {
            article.favorited = data.article.favorited;
            article.favoritesCount = data.article.favoritesCount;
          }
        });
      })
    )
  })
   
  return result!;
};


export const updateQueryDataFollowing = (
  dispatch: AppDispatch,
  getState: RootState,
  data: {profile: IProfile},
) => {
  let result: null | PatchCollection = null

  const state = getState.articleApi
  const keys = Object.keys(state.queries)

  keys.forEach(key => {
    if(key.startsWith('getArticle('))
    result = dispatch(
      articleApi.util.updateQueryData("getArticle", state.queries[key]?.originalArgs as string, (draft) => {
          draft.article.author.following = data.profile.following;
      })
      )
  })
   
  return result!;
};