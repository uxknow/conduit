import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IAuthDTO } from "../dto/auth";
import { baseQuery } from "../base-query";

interface IAuthData {
  username?: string;
  password: string;
  email: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IAuthDTO, IAuthData>({
      query: (data) => {
        const body = { user: data };
        return {
          url: "/users",
          method: "POST",
          body,
        };
      },
    }),
    loginUser: builder.mutation<IAuthDTO, IAuthData>({
      query: (data) => {
        const body = { user: data };
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      }
    }),
    getCurrUser: builder.query<IAuthDTO, void>({
      query: () => '/user'
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetCurrUserQuery } = authApi;
