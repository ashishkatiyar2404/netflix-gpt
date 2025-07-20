import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_HEADER, GET_POPULAR_MOVIES } from "../utils/constant";
import { addPopularMovies } from "../utils/slices/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  // fetch NOW_PLAYING_MOVIES DATA
  const getPopularMovies = async () => {
    const data = await fetch(GET_POPULAR_MOVIES, API_HEADER);
    const response = await data.json();

    dispatch(addPopularMovies(response.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopularMovies;
