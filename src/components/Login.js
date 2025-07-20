import { useState, useRef } from "react";
import { checkValidation } from "../utils/validate";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { IMG_BACKGROUND_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();

  // state variables
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // hooks
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleButtonClick = () => {
    const validation = checkValidation(
      email.current.value,
      password.current.value
    );
    setErrorMessage(validation);
    if (validation) return;

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const { code, message } = error;
          setErrorMessage(`${code}: ${message}`);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then()
        .catch((error) => {
          const { code, message } = error;
          setErrorMessage(`${code}: ${message}`);
        });
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          alt="background"
          src={IMG_BACKGROUND_URL}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-full max-w-md px-6 py-10 bg-black bg-opacity-80 rounded-lg text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-3 mb-4 w-full bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        )}
        <input
          type="email"
          ref={email}
          placeholder="Email Address"
          className="p-3 mb-4 w-full bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-3 mb-4 w-full bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {errorMessage && (
          <p className="text-red-500 font-medium mb-4">{errorMessage}</p>
        )}

        <button
          onClick={handleButtonClick}
          className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-md font-semibold"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="mt-6 text-sm text-center text-gray-300 cursor-pointer hover:underline"
          onClick={() => setIsSignInForm(!isSignInForm)}
        >
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already have an account? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
