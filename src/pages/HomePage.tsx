import { useFetchMoviesQuery } from "../app/services/moviesApi";
import { Header } from "../components/Header";

export function HomePage() {
  const { data: movies, isLoading, isError } = useFetchMoviesQuery();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="text-white">
        <h1 className="text-3xl font-bold mb-8 p-4">Now in the cinema</h1>

        {isLoading && <div className="text-center">Loading movies...</div>}

        {isError && <div className="text-center">Upload error!</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer mb-4"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <div className="flex justify-between mt-2 text-gray-400 text-sm">
                  <span>rating: {movie.rating}</span>
                  <span>{movie.price} $</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
