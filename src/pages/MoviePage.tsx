import { useParams } from "react-router-dom";
import {
  useFetchMovieByIdQuery,
  useUpdateSeatsMutation,
} from "../app/services/moviesApi";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { CinemaHall } from "../components/CinemaHall";
import { useEffect, useRef, useState } from "react";

export function MoviePage() {
  const { id } = useParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const hallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBookingOpen && hallRef.current) {
      hallRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isBookingOpen]);

  const [updateSeats, { isLoading: mutationIsLoading }] =
    useUpdateSeatsMutation();

  const handleBuyTickets = async (seats: number[]) => {
    if (!id) return;

    await updateSeats({ id: id, newSeats: seats });

    setIsBookingOpen(false);
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
            <div className="flex gap-3 text-sm text-cyan-400 font-medium mb-4 uppercase tracking-wider">
              <span className="bg-neutral-800/80 px-3 py-1 rounded-md backdrop-blur-sm border border-neutral-700">
                Action
              </span>
              <span className="bg-neutral-800/80 px-3 py-1 rounded-md backdrop-blur-sm border border-neutral-700">
                Sci-Fi
              </span>
              <span className="bg-neutral-800/80 px-3 py-1 rounded-md backdrop-blur-sm border border-neutral-700">
                IMAX
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-xl">
              {movie.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
                {movie.rating}{" "}
                <span className="text-gray-500 text-sm font-normal">/ 100</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>2h 45m</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>2024</span>
            </div>

            <div className="max-w-2xl text-lg text-gray-300 leading-relaxed mb-10">
              <p>
                Return to Pandora in this thrilling sequel. Jake Sully and
                Neytiri must protect their family from a new threat. Incredible
                graphics and an emotional story await you.
              </p>
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
              mutationIsLoading={mutationIsLoading}
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
