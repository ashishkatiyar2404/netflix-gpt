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
    <div className="absolute w-screen px-6 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img alt="netflix logo" className="w-40" src={NETFLIX_LOGO_LINK} />
      {user && (
        <div className="flex items-center space-x-2">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
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
            className="py-2 px-4 m-2 bg-purple-800 text-white rounded-md"
            onClick={() => dispatch(toggleGptSearch())}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img alt="user Icon" src={user?.photoURL} className="w-10 h-10" />
          <button
            className="text-sm text-white"
            onClick={() => {
              signOut(auth)
                .then(() => {})
                .catch((error) => {
                  navigate("/error");
                });
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
