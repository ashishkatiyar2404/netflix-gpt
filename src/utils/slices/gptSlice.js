import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMoviesName: null,
    tmdbSearchMovies: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addSearchGptMovies: (state, action) => {
      const { tmdbMovies, gptMoviesName } = action.payload;
      state.gptMoviesName = gptMoviesName;
      state.tmdbSearchMovies = tmdbMovies;
    },
  },
});

export const { toggleGptSearch, addSearchGptMovies } = gptSlice.actions;
export default gptSlice.reducer;
