import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSingInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      s
      <Header />
      <div className="absolute">
        <img
          alt="background"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg"
        />
      </div>
      <form className="absolute p-12 bg-black w-3/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-opacity-80 rounded-lg">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-600 rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600 rounded-lg"
        />
        <button className="p-4 my-6 bg-red-600 w-full rounded-lg">
          Sign In
        </button>
        <p className="py-4" onClick={() => toggleSingInForm()}>
          {isSignInForm
            ? "New to Netflix? Sign up Now"
            : "Already a registered User? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
