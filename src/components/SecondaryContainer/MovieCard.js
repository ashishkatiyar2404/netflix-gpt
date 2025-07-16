import { IMG_CDN_URL } from "../../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="movie card" src={IMG_CDN_URL(posterPath, 300)} />
    </div>
  );
};

export default MovieCard;
