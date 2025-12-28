import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  price: number;
  occupiedSeats: number[];
  onBuy: (selectedSeats: number[]) => void;
  isSubmitting: boolean;
}

export function CinemaHall({
  price,
  occupiedSeats,
  onBuy,
  isSubmitting,
}: Props) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleToggleSeat = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBuyClick = () => {
    onBuy(selectedSeats);
    setSelectedSeats([]);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl text-white font-bold mb-4 text-center">
        Screen is here
      </h2>

      <div className="h-2 bg-linear-to-r from-transparent via-cyan-500 to-transparent mb-10 opacity-50"></div>

      <div className="grid grid-cols-10 gap-2 sm:gap-4 justify-items-center">
        {Array.from({ length: 60 }, (_, i) => i + 1).map((seatNumber) => {
          const isOccupied = occupiedSeats?.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <motion.div
              key={seatNumber}
              onClick={() => handleToggleSeat(seatNumber)}
              whileHover={!isOccupied ? { scale: 1.2 } : {}}
              whileTap={!isOccupied ? { scale: 0.9 } : {}}
              className={`
                w-5 h-5 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm transition-colors
                ${
                  isOccupied ? "bg-slate-700 cursor-not-allowed opacity-40" : ""
                }
                ${
                  isSelected
                    ? "bg-green-500 cursor-pointer shadow-[0_0_10px_#22c55e]"
                    : ""
                }
                ${
                  !isOccupied && !isSelected
                    ? "bg-slate-600 cursor-pointer hover:bg-slate-500"
                    : ""
                }
              `}
            ></motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-white text-center">
        <p className="text-gray-400">Total Price:</p>
        <div className="flex justify-center gap-6 mt-3">
          <p className="text-2xl font-bold">{selectedSeats.length * price} $</p>

          <button
            disabled={selectedSeats.length === 0 || isSubmitting}
            onClick={handleBuyClick}
            className={`
              font-bold py-4 px-8 rounded-sm transition-all transform 
              ${
                isSubmitting
                  ? "bg-gray-500 w-1/2 cursor-wait"
                  : "w-1/2 bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white hover:-translate-y-1 shadow-lg shadow-rose-900/40"
              }
            `}
          >
            {isSubmitting ? "Processing..." : "Buy Tickets"}
          </button>
        </div>
      </div>
    </div>
  );
}
