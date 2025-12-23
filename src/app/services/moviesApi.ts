import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  price: number;
}

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fakeBaseQuery(),

  endpoints: (builder) => ({
    fetchMovies: builder.query<Movie[], void>({
      async queryFn() {
        try {
          const moviesRef = collection(db, "movies");
          const querySnapshot = await getDocs(moviesRef);
          const movies: Movie[] = [];
          querySnapshot.forEach((doc) => {
            movies.push({ id: doc.id, ...doc.data() } as Movie);
          });
          return { data: movies };
        } catch (error) {
          return { error: error };
        }
      },
    }),
  }),
});

export const { useFetchMoviesQuery } = moviesApi;
