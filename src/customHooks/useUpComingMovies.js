import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_HEADER, GET_UP_COMING_MOVIES } from "../utils/constant";
import { addUpComingMovies } from "../utils/slices/moviesSlice";

const useUpComingMovies = () => {
  const dispatch = useDispatch();
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

  // fetch NOW_PLAYING_MOVIES DATA
  const getUpComingMovies = async () => {
    const data = await fetch(GET_UP_COMING_MOVIES, API_HEADER);
    const response = await data.json();

    dispatch(addUpComingMovies(response.results));
  };

  useEffect(() => {
    !upComingMovies && getUpComingMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpComingMovies;
