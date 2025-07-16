import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_HEADER, GET_TOP_RATED_MOVIES } from "../utils/constant";
import { addTopRatedMovies } from "../utils/slices/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  // fetch NOW_PLAYING_MOVIES DATA
  const getTopRatedMovies = async () => {
    const data = await fetch(GET_TOP_RATED_MOVIES, API_HEADER);
    const response = await data.json();

    dispatch(addTopRatedMovies(response.results));
  };

  useEffect(() => {
    getTopRatedMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedMovies;
