import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  price: number;
  occupiedSeats?: number[];
}

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Movie"],

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

    fetchMovieById: builder.query<Movie, string>({
      async queryFn(id) {
        try {
          const movieRef = doc(db, "movies", id);
          const movieSnap = await getDoc(movieRef);

          if (!movieSnap.exists()) {
            return { error: "Movie not found" };
          }

          const movie = { id: movieSnap.id, ...movieSnap.data() } as Movie;
          return { data: movie };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["Movie"],
    }),

    updateSeats: builder.mutation<null, { id: string; newSeats: number[] }>({
      async queryFn({ id, newSeats }) {
        try {
          const movieRef = doc(db, "movies", id);

          await updateDoc(movieRef, {
            occupiedSeats: arrayUnion(...newSeats),
          });

          return { data: null };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useFetchMoviesQuery,
  useFetchMovieByIdQuery,
  useUpdateSeatsMutation,
} = moviesApi;
