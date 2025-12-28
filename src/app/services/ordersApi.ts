import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase";

export interface Order {
  id?: string;
  userId: string;
  movieId: string;
  movieTitle: string;
  posterUrl: string;
  seats: number[];
  totalPrice: number;
  date: string;
}

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    createOrder: builder.mutation<null, Order>({
      async queryFn(orderData) {
        try {
          await addDoc(collection(db, "orders"), orderData);
          return { data: null };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["Orders"],
    }),

    getOrdersByUserId: builder.query<Order[], string>({
      async queryFn(userId) {
        try {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", userId)
          );
          const querySnapshot = await getDocs(q);

          const orders: Order[] = [];
          querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() } as Order);
          });

          return { data: orders };
        } catch (error) {
          return { error: error };
        }
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersByUserIdQuery } = ordersApi;
