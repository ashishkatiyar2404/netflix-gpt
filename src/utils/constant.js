// API path
export const GET_NOW_PLAYING_MOVIES =
  "https://api.themoviedb.org/3/movie/now_playing?page=1";

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
