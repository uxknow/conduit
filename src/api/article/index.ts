import { ICreateArticleDTO } from "./../dto/articles/index";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IArticle, IArticlesDTO, ICreateArticle } from "../dto/articles";
import { ITagsResponse } from "../dto/tags";
import { ICommentsDTO } from "../dto/comments";
import { baseQuery } from "../base-query";
import { IFavoriteArticleDTO } from "../dto/favorites";
import { RootState } from "../../store";
import {
  getQueryParamsInState,
  updateQueryDataArticles,
} from "../../utils/api";

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

interface IUpdateArticle {
  slug: string;
  article: ICreateArticle;
}

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesDTO, IQueryParams>({
      query: ({ page, limit, tag, author, favorited }) => ({
        url: "/articles",
        method: "GET",
        params: {
          limit,
          offset: page * limit,
          tag,
          author,
          favorited,
        },
        // const params = new URLSearchParams({
        //   limit: limit.toString(),
        //   offset: (limit * page).toString(),
        // });
        // if (tag) {
        //   params.append("tag", `${tag}`);
        // }
        // if (author) {
        //   params.append("author", `${author}`);
        // }
        // if (favorited) {
        //   params.append("favorited", `${favorited}`);
        // }

        // return `/articles?${params.toString()}`;
      }),

      // providesTags: (result) =>
      // result
      //   ? [
      //       ...result.articles.map(({ slug }) => ({ type: 'Post' as const, id: slug })),
      //       {type: 'Post', id: 'LIST'}
      //     ]
      //   : [{ type: 'Post', id: 'LIST' }],
    }),
    getArticle: builder.query<Article, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result) => [{ type: "Post", id: result?.article.slug }],
    }),
    getComments: builder.query<ICommentsDTO, string>({
      query: (slug) => `/articles/${slug}/comments`,
    }),
    getPopularTags: builder.query<ITagsResponse, void>({
      query: () => "/tags",
    }),
    getArticlesFeed: builder.query<IArticlesDTO, IQueryParams>({
      keepUnusedDataFor: 0,
      query: ({ page, limit }) =>
        `/articles/feed?limit=${limit}&offset=${page * limit}`,
    }),
    likeArticle: builder.mutation<IFavoriteArticleDTO, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),

      invalidatesTags: [{ type: "Post" }],

      async onQueryStarted(slug, { dispatch, queryFulfilled, getState }) {
        const { data } = await queryFulfilled;

        //находим и изменяем лайки для getArticles
        const queryParamsArticles = await getQueryParamsInState(
          getState() as RootState,
          "getArticles("
        );

        const articlesResult = await updateQueryDataArticles(
          dispatch,
          queryParamsArticles,
          slug,
          data,
          "getArticles"
        );

        //находим и изменяем лайки для getArticlesFeed
        const queryParamsArticlesFeed = await getQueryParamsInState(
          getState() as RootState,
          "getArticlesFeed("
        );
        const articlesFeedResult = await updateQueryDataArticles(
          dispatch,
          queryParamsArticlesFeed,
          slug,
          data,
          "getArticlesFeed"
        );
        try {
          await queryFulfilled;
        } catch {
          articlesResult.undo();
          articlesFeedResult.undo();
        }

        // const singleArticleResult = dispatch(
        //   articleApi.util.updateQueryData("getArticle", slug, (draft) => {
        //     if (draft.article.slug === slug) {
        //       draft.article.favorited = data.article.favorited;
        //       draft.article.favoritesCount = data.article.favoritesCount;
        //     }
        //   })
        // );
      },
    }),
    unLikeArticle: builder.mutation<IFavoriteArticleDTO, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg }],
      async onQueryStarted(slug, { dispatch, queryFulfilled, getState }) {
        const { data } = await queryFulfilled;

        //находим и изменяем лайки для getArticles
        const queryParamsArticles = getQueryParamsInState(
          getState() as RootState,
          "getArticles("
        );
        const articlesResult = updateQueryDataArticles(
          dispatch,
          queryParamsArticles,
          slug,
          data,
          "getArticles"
        );
        //находим и изменяем лайки для getArticlesFeed
        const queryParamsArticlesFeed = getQueryParamsInState(
          getState() as RootState,
          "getArticlesFeed("
        );
        const articlesFeedResult = updateQueryDataArticles(
          dispatch,
          queryParamsArticlesFeed,
          slug,
          data,
          "getArticlesFeed"
        );

        try {
          await queryFulfilled;
        } catch {
          articlesResult.undo();
          articlesFeedResult.undo();
        }
      },
    }),
    createArticle: builder.mutation<ICreateArticleDTO, ICreateArticle>({
      query: (data) => {
        const { tagList, ...rest } = data;
        const body = { article: { ...rest, tagList: tagList?.split(",") } };
        return { url: "/articles", method: "POST", body };
      },
    }),
    updateArticle: builder.mutation<ICreateArticleDTO, IUpdateArticle>({
      query: ({ slug, article }) => {
        const { tagList, ...rest } = article;
        const body = { article: { ...rest, tagList: tagList?.split(",") } };
        return { url: `/articles/${slug}`, method: "PUT", body };
      },
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useGetCommentsQuery,
  useGetPopularTagsQuery,
  useGetArticlesFeedQuery,
  useLikeArticleMutation,
  useUnLikeArticleMutation,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation
} = articleApi;

// import { createApi } from '@reduxjs/toolkit/query/react'
// import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
// import axios from 'axios'
// import type { AxiosRequestConfig, AxiosError } from 'axios'
// import { IArticlesResponse } from "./dto/articles";
// import { ITagsResponse } from "./dto/tags";
// import { PAGE_LIMIT } from "./consts";

// const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' }
//   ): BaseQueryFn<
//     {
//       url: string
//       method: AxiosRequestConfig['method']
//       data?: AxiosRequestConfig['data']
//       params?: AxiosRequestConfig['params']
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, params })
//       return { data: result.data }
//     } catch (axiosError) {
//       let err = axiosError as AxiosError
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       }
//     }
//   }

//   interface IQueryParams {
//   page: number
//   tag: string | null
// }

// export const articleApi = createApi({
//   reducerPath: "articleApi",
//   baseQuery: axiosBaseQuery({
//     baseUrl: "https://api.realworld.io/api",
//   }),
//   endpoints: (builder) => ({
//     getArticles: builder.query<IArticlesResponse, IQueryParams>({
//       query: ({page, tag}) => ({
//         url: '/articles',
//         method: 'get',
//         params: {
//           limit: PAGE_LIMIT ,
//           offset: PAGE_LIMIT * page,
//           tag
//         }
//       }),
//     }),
//     getPopularTags: builder.query<ITagsResponse, void>({
//       query: () => ({
//         url: '/tags',
//         method: 'get'
//       })
//     })
//   }),
// });

// export const { useGetArticlesQuery, useGetPopularTagsQuery } = articleApi
