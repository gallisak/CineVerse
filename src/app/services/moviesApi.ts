import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  price: number;
}

export const movieApi = createApi({
  reducerPath: "movieApi",
});
