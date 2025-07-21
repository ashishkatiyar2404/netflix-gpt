import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // early return
  if (!movies) return;

  const { original_title, overview, id } =
    movies[Math.floor(Math.random() * 10)];

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} description={overview} />
      <VideoBackground movies_id={id} />
    </div>
  );
};

export default MainContainer;
