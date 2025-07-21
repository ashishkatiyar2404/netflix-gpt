import { IMG_BACKGROUND_URL } from "../../utils/constant";
import GptMoviesSuggestion from "./GptMoviesSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearchPage = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          alt="background"
          src={IMG_BACKGROUND_URL}
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMoviesSuggestion />
      </div>
    </>
  );
};

export default GptSearchPage;
