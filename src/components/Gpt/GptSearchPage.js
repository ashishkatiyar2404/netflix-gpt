import { IMG_BACKGROUND_URL } from "../../utils/constant";
import GptMoviesSuggestion from "./GptMoviesSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearchPage = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img alt="background" src={IMG_BACKGROUND_URL} />
      </div>
      <GptSearchBar />
      <GptMoviesSuggestion />
    </div>
  );
};

export default GptSearchPage;
