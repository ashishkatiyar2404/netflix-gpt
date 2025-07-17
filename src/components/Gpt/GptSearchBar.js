import { useSelector } from "react-redux";
import lang from "../../utils/languageConstant";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12">
        <input
          input="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[languageKey].gptSearchPlaceHolder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-md">
          {lang[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
