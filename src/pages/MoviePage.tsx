import { useParams } from "react-router-dom";
import {
  useFetchMovieByIdQuery,
  useUpdateSeatsMutation,
} from "../app/services/moviesApi";
import { useCreateOrderMutation } from "../app/services/ordersApi";
import { useAuth } from "../app/hooks/useAuth";

import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { CinemaHall } from "../components/CinemaHall";
import { useEffect, useRef, useState } from "react";

export function MoviePage() {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const hallRef = useRef<HTMLDivElement>(null);
  const { id: userId } = useAuth();

  useEffect(() => {
    if (isBookingOpen && hallRef.current) {
      hallRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isBookingOpen]);

  const [updateSeats, { isLoading: isUpdatingSeats }] =
    useUpdateSeatsMutation();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const isProcessing = isUpdatingSeats || isCreatingOrder;

  const handleBuyTickets = async (seats: number[]) => {
    if (!id || !movie || !userId) {
      alert("Please login to buy tickets");
      return;
    }

    const orderData = {
      userId: userId,
      movieId: movie.id,
      movieTitle: movie.title,
      posterUrl: movie.posterUrl,
      seats: seats,
      totalPrice: seats.length * movie.price,
      date: new Date().toLocaleString(),
    };

    try {
      await updateSeats({ id: id, newSeats: seats }).unwrap();

      await createOrder(orderData).unwrap();

      setIsBookingOpen(false);
      alert("Tickets bought successfully! Check your profile");
    } catch (error) {
      console.error("Failed to buy tickets:", error);
      alert("Something went wrong!");
    }
  };

  const {
    data: movie,
    isLoading,
    isError,
  } = useFetchMovieByIdQuery(id || "", {
    skip: !id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-red-500">
        Film not found or ID is incorrect
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-rose-500 selection:text-white">
      <Header />

      <div className="relative w-full h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px] opacity-60"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        ></div>

        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 -mt-64 pb-20">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <motion.div
            className="w-full md:w-87.5 shrink-0"
            layoutId={`poster-${id}`}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-neutral-700 hover:scale-[1.02] transition-transform duration-500"
            />

            <button
              onClick={() => setIsBookingOpen(true)}
              className="md:hidden w-full mt-6 bg-rose-600 py-4 rounded-sm font-bold text-lg shadow-lg shadow-rose-600/30"
            >
              Buy Ticket ({movie.price} $)
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
            className="flex-1 pt-10 md:pt-32"
          >
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-xl">
              {movie.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300 mb-8">
              <span>2h 45m</span>
            </div>

            <div className="max-w-2xl text-lg text-gray-300 leading-relaxed mb-10">
              <p>Return to Pandora...</p>
            </div>

            <div className="hidden md:flex items-center gap-6 p-6 bg-neutral-800/40 backdrop-blur-md rounded-sm border border-neutral-700/50 max-w-xl">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Price per ticket</span>
                <span className="text-3xl font-bold text-white">
                  {movie.price} $
                </span>
              </div>

              <div className="h-10 w-px bg-neutral-600"></div>
              <button
                onClick={() => {
                  setIsBookingOpen(true);
                }}
                className="flex-1 bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-sm transition-all shadow-lg shadow-rose-900/40 hover:shadow-rose-900/60 transform hover:-tranneutral-y-1"
              >
                Select Seats
              </button>
            </div>
          </motion.div>
        </div>

        {!isBookingOpen ? (
          <div className="hidden"></div>
        ) : (
          <div ref={hallRef} className="mt-10">
            <CinemaHall
              isSubmitting={isProcessing}
              price={movie.price}
              occupiedSeats={movie.occupiedSeats || []}
              onBuy={handleBuyTickets}
            />
          </div>
        )}
      </div>
    </div>
  );
}
