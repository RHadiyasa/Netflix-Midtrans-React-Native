import axios from "axios";

const API_KEY = process.env.API_KEY;

const fetchMovie = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
  },
});

export default fetchMovie;
