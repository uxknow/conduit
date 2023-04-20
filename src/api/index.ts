import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticlesResponse } from "./dto/articles";
import { PAGE_LIMIT } from "./consts";
import { ITagsResponse } from "./dto/tags";

interface IQueryParams {
  page: number
  tag: string | null
}

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesResponse, IQueryParams>({
      query: ({page, tag}) => {
        const params = new URLSearchParams({limit: PAGE_LIMIT.toString(), offset: (PAGE_LIMIT * page).toString()})
        if (tag) {
          params.append('tag', `${tag}`)
        }
        return `/articles?${params.toString()}`
      }
    }),
    getPopularTags: builder.query<ITagsResponse, void>({
      query: () => '/tags'
    })
  }),
});

export const { useGetArticlesQuery, useGetPopularTagsQuery } = articleApi;


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