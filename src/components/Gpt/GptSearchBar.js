import { useDispatch, useSelector } from "react-redux";
import lang from "../../utils/languageConstant";
import { useRef, useState } from "react";
import { model } from "../../utils/ai";
import { API_HEADER, GPT_QUERY, SEARCH_FOR_MOVIE } from "../../utils/constant";
import { addSearchGptMovies } from "../../utils/slices/gptSlice";

const GptSearchBar = () => {
  const inputSearchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const languageKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  // search Movie Api Call
  const searchMovieTmdb = async (movie) => {
    try {
      const response = await fetch(SEARCH_FOR_MOVIE(movie), API_HEADER);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error("TMDB fetch error:", err);
      return [];
    }
  };

  // `ai` api call
  const handleGptSearchClick = async (e) => {
    if (e) e.preventDefault();
    const query = inputSearchText.current?.value?.trim();
    if (!query || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await model.generateContent(GPT_QUERY(query));
      const rawText = result.response.text();

      // Clean and sanitize movie titles from LLM output
      const gptMoviesList = rawText
        .split(/,|\n/)
        .map((movie) =>
          movie
            .replace(/^\d+[\.\-\)]\s*/, "") // remove leading numbering like "1. ", "1) "
            .replace(/["'*]/g, "")           // remove quotes, asterisks, markdown
            .replace(/\s*\(\d{4}\)$/, "")    // remove trailing year like "(2010)"
            .trim()
        )
        .filter((movie) => movie.length > 0)
        .slice(0, 5);

      if (gptMoviesList.length === 0) {
        setErrorMessage("No movie suggestions found. Please try a different query.");
        setIsLoading(false);
        return;
      }

      // tmdb movies call for each suggested title
      const moviesPromiseArray = gptMoviesList.map((movieName) =>
        searchMovieTmdb(movieName)
      );

      const tmdbMoviesResults = await Promise.all(moviesPromiseArray);

      dispatch(
        addSearchGptMovies({
          tmdbMovies: tmdbMoviesResults,
          gptMoviesName: gptMoviesList,
        })
      );
    } catch (error) {
      console.error("GPT search error:", error);
      setErrorMessage("Something went wrong while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex flex-col items-center justify-center px-4 mb-20">
      <form
        className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-12 gap-4 bg-black bg-opacity-70 p-4 rounded-md shadow-md"
        onSubmit={handleGptSearchClick}
      >
        <input
          type="text"
          className="col-span-12 sm:col-span-9 p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-600"
          ref={inputSearchText}
          placeholder={lang[languageKey].gptSearchPlaceHolder}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`col-span-12 sm:col-span-3 text-white font-semibold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center ${
            isLoading
              ? "bg-red-900 cursor-not-allowed opacity-75"
              : "bg-red-700 hover:bg-red-800 active:scale-95"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </span>
          ) : (
            lang[languageKey].search
          )}
        </button>
      </form>
      {errorMessage && (
        <p className="mt-3 text-red-500 font-semibold text-sm bg-black bg-opacity-80 px-4 py-2 rounded-md">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default GptSearchBar;
