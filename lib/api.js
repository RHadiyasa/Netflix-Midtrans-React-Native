import axios from "axios";

const API_KEY = "8ef7e53cad1243be2a1314de9c2a28ad";

const fetchMovie = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
  },
});

export default fetchMovie;
