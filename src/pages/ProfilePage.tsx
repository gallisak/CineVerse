import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../app/hooks/useAuth";
import { useGetOrdersByUserIdQuery } from "../app/services/ordersApi";
import { motion } from "framer-motion";

export function ProfilePage() {
  const { id: userId, email } = useAuth();

  const { data: orders, isLoading } = useGetOrdersByUserIdQuery(userId || "", {
    skip: !userId,
  });

  if (!userId) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold mb-4">
          Please log in to see your tickets
        </h2>
        <Link
          to="/login"
          className="text-rose-500 underline hover:text-rose-400"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-rose-500 selection:text-white">
      <Header />

      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              My Tickets 🎟️
            </h1>
            <p className="text-gray-400">
              Account: <span className="text-cyan-400">{email}</span>
            </p>
          </div>
          <div className="text-right bg-neutral-900 px-6 py-3 rounded-xl border border-neutral-800">
            <div className="text-3xl font-bold text-rose-500">
              {orders?.length || 0}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Purchased
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        )}

        {!isLoading && orders?.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/30">
            <p className="text-2xl text-gray-500 mb-6 font-medium">
              No tickets found yet.
            </p>
            <Link
              to="/"
              className="bg-rose-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-rose-500 transition-all shadow-lg shadow-rose-900/20"
            >
              Go to Movies
            </Link>
          </div>
        )}

        <div className="grid gap-6">
          {orders?.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className="flex flex-col md:flex-row bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden hover:border-rose-500/30 transition-all shadow-xl"
            >
              <div className="w-full md:w-40 h-48 md:h-auto shrink-0 relative">
                <img
                  src={order.posterUrl}
                  alt={order.movieTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent md:bg-linear-to-r"></div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {order.movieTitle}
                    </h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      {order.date}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="block text-gray-500 text-xs uppercase tracking-wider font-bold">
                      Total Paid
                    </span>
                    <span className="text-2xl font-bold text-rose-500">
                      {order.totalPrice} $
                    </span>
                  </div>
                </div>

                <div className="border-t border-neutral-800 pt-4 mt-auto">
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">
                    Your Seats:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {order.seats.map((seat) => (
                      <span
                        key={seat}
                        className="px-3 py-1 bg-neutral-800 rounded-md text-cyan-400 font-mono font-bold border border-neutral-700 shadow-sm"
                      >
                        Seat {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
