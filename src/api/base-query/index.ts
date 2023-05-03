import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.realworld.io/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.user?.token || localStorage.getItem('jwt')
    if (token) {
      headers.set('authorization', `Token ${token}`);
     }
    return headers;
  }
})