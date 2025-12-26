import { useState } from "react";
import { motion } from "motion/react";

interface Props {
  price: number;
  onBooking: (seats: number[]) => void;
}

export function CinemaHall({ price, onBooking }: Props) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const OCCUPIED_SEATS = [10, 11, 12];

  const handleToggleSeat = (seatNumber: number) => {
    if (OCCUPIED_SEATS.includes(seatNumber)) return;

    let updatedSeats: number[];

    if (selectedSeats.includes(seatNumber)) {
      updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      updatedSeats = [...selectedSeats, seatNumber];
    }

    setSelectedSeats(updatedSeats);
    onBooking(updatedSeats);
  };

  Array.from({ length: 60 });

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl text-white font-bold mb-4 text-center">
        Screen is here
      </h2>

      <div className="h-2 bg-linear-to-r from-transparent via-cyan-500 to-transparent mb-10 opacity-50"></div>

      <div className="grid grid-cols-10 gap-2 sm:gap-4 justify-items-center">
        {Array.from({ length: 60 }, (_, i) => i + 1).map((seatNumber) => {
          const isOccupied = OCCUPIED_SEATS.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <motion.div
              key={seatNumber}
              onClick={() => handleToggleSeat(seatNumber)}
              whileHover={!isOccupied ? { scale: 1.2 } : {}}
              whileTap={!isOccupied ? { scale: 0.9 } : {}}
              className={`
                w-8 h-8 rounded-t-lg rounded-b-sm  transition-colors
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
        <p className="text-2xl font-bold">{selectedSeats.length * price} $</p>
      </div>
    </div>
  );
}
