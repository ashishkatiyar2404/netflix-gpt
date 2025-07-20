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
        <div className="mt-0 md:-mt-72 pl-2 md:pl-12 relative z-10">
          <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={topRatedMovies} />
          <MovieList title={"Upcoming Movies"} movies={upComingMovies} />
          <MovieList title={"Popular Movies"} movies={popularMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
