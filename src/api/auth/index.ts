import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IAuthDTO } from "../dto/auth";
import { baseQuery } from "../base-query";

interface IAuthData {
  username?: string;
  password: string;
  email: string;
}

export interface IUpdateUser {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
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
      transformResponse: ({ user }) => {
        const { token, ...rest } = user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(rest));
        return user;
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
      },
      transformResponse: ({ user }) => {
        const { token, ...rest } = user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(rest));
        return user;
      },
    }),
    getCurrUser: builder.query<IAuthDTO, void>({
      query: () => "/user",
    }),
    updateUser: builder.mutation<IAuthDTO, IUpdateUser>({
      query: (data) => {
        const body = { user: data };
        return {
          url: "/user",
          method: "PUT",
          body,
        };
      },
      async onQueryStarted(
        _,
        { dispatch, queryFulfilled }
      ) {
        const { data } = await queryFulfilled;

        const userResult = await dispatch(
          authApi.util.updateQueryData("getCurrUser", undefined, (draft) => {
            draft.user = data.user;
            localStorage.setItem("token", data.user.token);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          userResult.undo();
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrUserQuery,
  useUpdateUserMutation,
} = authApi;
