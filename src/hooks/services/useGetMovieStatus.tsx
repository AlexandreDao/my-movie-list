import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { MovieStatus } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (movieId: number) => {
  const { data } = await tmdbSingleton.get<MovieStatus>(
    `/movie/${movieId}/account_states`,
  );
  return data;
};

const useGetMovieStatus = (movieId?: number) => {
  return useQuery({
    queryKey: ["get-movie-status", movieId],
    queryFn: () => queryFn(movieId!),
    enabled: !!movieId,
  });
};

export default useGetMovieStatus;
