// API path
export const GET_NOW_PLAYING_MOVIES =
  "https://api.themoviedb.org/3/movie/now_playing?page=1";

export const GET_POPULAR_MOVIES =
  "https://api.themoviedb.org/3/movie/popular?page=1";

export const GET_TOP_RATED_MOVIES =
  "https://api.themoviedb.org/3/movie/top_rated?page=1";

export const GET_UP_COMING_MOVIES =
  "https://api.themoviedb.org/3/movie/upcoming?page=1";

export const SEARCH_FOR_MOVIE = (movie) =>
  `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;

// API HEADER
export const API_HEADER = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_BASIC_AUTH_KEY}`,
  },
};

// LINKS
export const NETFLIX_LOGO_LINK =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR =
  "https://avatars.githubusercontent.com/u/74372244?v=4";

export const IMG_CDN_URL = (poster_path, width = 500) =>
  `https://image.tmdb.org/t/p/w${width}${poster_path}`;

export const IMG_BACKGROUND_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg";

// CONSTANT
export const SUPPORTED_LANGUAGE = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

// QUERY
export const GPT_QUERY = (query) =>
  `Act as movie Recommendation system and suggest some movies for the query${query} only give me names of 5 movies, comma separated like the example results given ahead. Example Result:Gadar,Don,Golmal,sholay,koi mil gaya.`;
