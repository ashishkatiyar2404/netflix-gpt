import { useDispatch, useSelector } from "react-redux";
import lang from "../../utils/languageConstant";
import { useRef } from "react";
import { model } from "../../utils/ai";
import { API_HEADER, GPT_QUERY, SEARCH_FOR_MOVIE } from "../../utils/constant";
import { addSearchGptMovies } from "../../utils/slices/gptSlice";

const GptSearchBar = () => {
  const inputSearchText = useRef(null);
  const languageKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  // search Movie Api Call
  const searchMovieTmdb = async (movie) => {
    const response = await fetch(SEARCH_FOR_MOVIE(movie), API_HEADER);

    const data = await response.json();
    return data.results;
  };

  // `ai` api call
  const handleGptSearchClick = async () => {
    try {
      const result = await model.generateContent(
        GPT_QUERY(inputSearchText.current.value)
      );

      // can show loader here till the api fetch data
      const gptMoviesList =
        result.response?.candidates[0]?.content?.parts[0]?.text
          .split(",")
          .map((movie) => movie.trim());

      // tmdb movies call
      const moviesPromiseArray = gptMoviesList.map((movieName) =>
        searchMovieTmdb(movieName)
      );

      // can show loader here till the api fetch data and all promise get resolve
      const tmdbMoviesResults = await Promise.all(moviesPromiseArray);
      dispatch(
        addSearchGptMovies({
          tmdbMovies: tmdbMoviesResults,
          gptMoviesName: gptMoviesList,
        })
      );
    } catch (error) {
      console.Alert(error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center mb-20">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          input="text"
          className="p-4 m-4 col-span-9"
          ref={inputSearchText}
          placeholder={lang[languageKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-md"
          onClick={handleGptSearchClick}
        >
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
