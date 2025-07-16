import { useDispatch } from "react-redux";
import { API_HEADER } from "../utils/constant";
import { addTrailerVideo } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useTrailerMovie = (movies_id) => {
  const dispatch = useDispatch();

  // fetching the trailer video and updating the store with trailer video
  const getTrailerVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movies_id}/videos?language=en-US`,
      API_HEADER
    );
    const response = await data.json();

    const filterData = response.results.length
      ? response.results.filter((video) => video.type === "Trailer")[0]
      : response.results[0];

    dispatch(addTrailerVideo(filterData));
  };

  useEffect(() => {
    getTrailerVideo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTrailerMovie;
