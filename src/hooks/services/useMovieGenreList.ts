import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { MovieGenreListResponse } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
  const { data } =
    await tmdbSingleton.get<MovieGenreListResponse>("/genre/movie/list");
  return data.genres;
};

const useMovieGenreList = () => {
  return useQuery({
    queryKey: ["movie-genre-list"],
    queryFn: queryFn,
    staleTime: 60 * 1000 * 60 * 24 * 14, // 2 weeks
    throwOnError: true,
  });
};

export default useMovieGenreList;
