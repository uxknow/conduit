import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAuthDTO } from "../dto/auth";

interface IAuthData {
  username?: string;
  password: string;
  email: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api",
  }),
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
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
