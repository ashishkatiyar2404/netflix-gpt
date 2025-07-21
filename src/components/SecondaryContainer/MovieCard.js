import { IMG_CDN_URL } from "../../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;

  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="movie card" src={IMG_CDN_URL(posterPath, 300)} />
    </div>
  );
};

export default MovieCard;
