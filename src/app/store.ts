import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/userSlice";
import { moviesApi } from "./services/moviesApi";

export const store = configureStore({
  reducer: {
    user: userReduser,

    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
