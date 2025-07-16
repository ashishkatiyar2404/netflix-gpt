import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";
import { API_HEADER, GET_NOW_PLAYING_MOVIES } from "../utils/constant";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  // fetch NOW_PLAYING_MOVIES DATA
  const getNowPlayingMovies = async () => {
    const data = await fetch(GET_NOW_PLAYING_MOVIES, API_HEADER);
    const response = await data.json();

    dispatch(addNowPlayingMovies(response.results));
  };

  useEffect(() => {
    getNowPlayingMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovies;
