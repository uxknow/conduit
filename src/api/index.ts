import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticlesResponse } from "./dto/articles";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesResponse, void>({
      query: () => "/articles",
    }),
  }),
});

export const { useGetArticlesQuery } = articleApi;
