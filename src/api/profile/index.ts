import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IProfilesDTO } from "../dto/profiles";
import { baseQuery } from "../base-query";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<IProfilesDTO, string>({
      query: (username) => `/profiles/${username}`,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
