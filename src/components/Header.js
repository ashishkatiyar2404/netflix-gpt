import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NETFLIX_LOGO_LINK, SUPPORTED_LANGUAGE } from "../utils/constant";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/slices/userSlice";
import { toggleGptSearch } from "../utils/slices/gptSlice";
import { changeLanguage } from "../utils/slices/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubcribe when component unmounts
    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-6 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
      <img
        alt="netflix logo"
        className="w-40 mx-auto md:mx-0"
        src={NETFLIX_LOGO_LINK}
      />
      {user && (
        <div className="flex flex-wrap items-center gap-4 md:gap-4 p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-md text-sm"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 bg-purple-800 text-white rounded-md text-sm hover:bg-purple-700 transition"
            onClick={() => dispatch(toggleGptSearch())}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>

          <img
            alt="user Icon"
            src={user?.photoURL}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />

          <button
            className="text-sm text-white underline hover:text-red-300 transition"
            onClick={() => {
              signOut(auth)
                .then(() => {})
                .catch(() => navigate("/error"));
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
