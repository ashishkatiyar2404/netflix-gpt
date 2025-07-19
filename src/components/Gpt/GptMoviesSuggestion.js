import { useSelector } from "react-redux";
import MovieList from "../SecondaryContainer/MovieList";

const GptMoviesSuggestion = () => {
  const { gptMoviesName, tmdbSearchMovies } = useSelector((store) => store.gpt);

  if (!gptMoviesName) return null;
  return (
    <div className="m-4 p-4 bg-black text-white bg-opacity-90">
      <div>
        {!tmdbSearchMovies
          ? "Loading"
          : gptMoviesName.map((movieName, index) => (
              <MovieList
                title={movieName}
                key={movieName}
                movies={tmdbSearchMovies[index]}
              />
            ))}
      </div>
    </div>
  );
};

export default GptMoviesSuggestion;
