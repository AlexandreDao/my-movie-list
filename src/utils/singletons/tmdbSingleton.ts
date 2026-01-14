import axios from "axios";

const tmdbSingleton = axios.create({
  baseURL: `${process.env.EXPO_TMDB_API_URL}/${process.env.EXPO_TMDB_API_VERSION}`,
  timeout: 5000,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
});

export default tmdbSingleton;
