import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const { nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies } =
    useSelector((store) => store.movies);

  return (
    nowPlayingMovies &&
    popularMovies &&
    topRatedMovies &&
    upComingMovies && (
      <div className="bg-black">
        <div className="-mt-72 pl-12 relative z-10">
          <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
          <MovieList title={"Popular Movies"} movies={popularMovies} />
          <MovieList title={"Upcoming Movies"} movies={upComingMovies} />
          <MovieList title={"Top Rated"} movies={topRatedMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
