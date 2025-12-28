import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./slices/userSlice";
import { moviesApi } from "./services/moviesApi";
import { ordersApi } from "./services/ordersApi";

export const store = configureStore({
  reducer: {
    user: userReduser,

    [moviesApi.reducerPath]: moviesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware, ordersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
