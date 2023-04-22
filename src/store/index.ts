import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../api/article";
import { profileApi } from "../api/profile";

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware, profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
