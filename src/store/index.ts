import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../api/article";
import { profileApi } from "../api/profile";
import { authApi } from "../api/auth";
import { userSlice } from "./slice/user";

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userSlice.name]: userSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware, profileApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
