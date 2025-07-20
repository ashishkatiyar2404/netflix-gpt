import { useSelector } from "react-redux";
import MovieList from "../SecondaryContainer/MovieList";

const GptMoviesSuggestion = () => {
  const { gptMoviesName, tmdbSearchMovies } = useSelector((store) => store.gpt);

  // no data to show yet
  if (!gptMoviesName || !tmdbSearchMovies) return null;

  return (
    <div className="m-4 p-4 bg-black bg-opacity-90 text-white rounded-lg shadow-lg">
      <div className="space-y-6">
        {gptMoviesName.map((movieName, index) => (
          <MovieList
            title={movieName}
            key={`${movieName}-${index}`}
            movies={tmdbSearchMovies[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMoviesSuggestion;
