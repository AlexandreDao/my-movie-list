import SecureStore from "@/utils/storages/SecureStorage";
import axios from "axios";

const tmdbSingleton = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_TMDB_API_URL}/${process.env.EXPO_PUBLIC_TMDB_API_VERSION}`,
  timeout: 5000,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
});
// Request interceptor - add session id to every request
tmdbSingleton.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("sessionId");
  if (token) {
    config.params = config.params || {};
    config.params.session_id = token;
  }
  return config;
});

export default tmdbSingleton;
