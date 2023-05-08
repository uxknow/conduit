import { RootState } from './../../store/index';
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IProfilesDTO } from "../dto/profiles";
import { baseQuery } from "../base-query";
import { updateQueryDataFollowing } from '../../utils/api';

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery,
  tagTypes: ['Following'],
  endpoints: (builder) => ({
    getProfile: builder.query<IProfilesDTO, string>({
      query: (username) => `/profiles/${username}`,
      providesTags: (result) => [{type: 'Following', id: result?.profile.username}]
    }),
    followUser: builder.mutation<IProfilesDTO, string>({
      query: (username) => ({
        url: `/profiles/${username}/follow`,
        method: 'POST'
      }),
      invalidatesTags: [{type: 'Following'}],
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const { data } = await queryFulfilled

        const followResult = updateQueryDataFollowing(dispatch, getState() as RootState, data)

        try {
          await queryFulfilled;
        } catch {
          followResult.undo();
        }
        
      }
    }),
    unfollowUser: builder.mutation<IProfilesDTO, string>({
      query: (username) => ({
        url: `/profiles/${username}/follow`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'Following'}],
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const { data } = await queryFulfilled

        const followResult = updateQueryDataFollowing(dispatch, getState() as RootState, data)

        try {
          await queryFulfilled;
        } catch {
          followResult.undo();
        }
        
      }
    }),
  }),
});

export const { useGetProfileQuery, useFollowUserMutation, useUnfollowUserMutation } = profileApi;
