import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { NETFLIX_LOGO_LINK } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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
                .then(() => {
                  navigate("/");
                })
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
