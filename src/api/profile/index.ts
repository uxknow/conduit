import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IProfilesDTO } from "../dto/profiles";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.realworld.io/api/profiles",
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<IProfilesDTO, string>({
      query: (username) => `/${username}`,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
