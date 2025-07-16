import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import moviesSlice from "../slices/moviesSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
  },
});

export default appStore;
