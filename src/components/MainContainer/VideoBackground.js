import { useSelector } from "react-redux";
import useTrailerMovie from "../../customHooks/useTrailerMovie";

const VideoBackground = ({ movies_id }) => {
  useTrailerMovie(movies_id);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="w-screen">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
