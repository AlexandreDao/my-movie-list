import { Movie, Theater } from "@/utils/types/searchType";
import { useQuery } from "@tanstack/react-query";
import { endOfDay, format, startOfDay } from "date-fns";
import { LatLng } from "react-native-maps";

const queryFn = async (query: string, position: LatLng) => {
  const data = await fetch(
    `${process.env.EXPO_PUBLIC_SCREENING_API_URL}movies/search&search_text=${query}&page=1&page_size=5`,
  );
  const movies: Movie[] = await data.json();
  const movieId = movies[0].id;
  const today = new Date();
  const start = format(startOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const end = format(endOfDay(today), "yyyy-MM-dd'T'HH:mm:ss'Z'");

  const res = await fetch(
    `${process.env.EXPO_PUBLIC_SCREENING_API_URL}showtimes/search?latitude=${position.latitude}&longitude=${position.longitude}&range=10&start=${start}&movie_id=${movieId}&end=${end}&page=1&page_size=1`,
  );
  const searchRes = await res.json();
  return searchRes.theaters;
};

const useSearchScreening = (query: string, position: LatLng | null) => {
  return useQuery<Theater[]>({
    queryKey: ["search-screening", query, position],
    queryFn: () => queryFn(query, position!),
    enabled: !!query && !!position,
  });
};

export default useSearchScreening;
