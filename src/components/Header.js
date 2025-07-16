import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NETFLIX_LOGO_LINK } from "../utils/constant";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img alt="netflix logo" className="w-44" src={NETFLIX_LOGO_LINK} />
      {user && (
        <div className="flex items-center space-x-2">
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
