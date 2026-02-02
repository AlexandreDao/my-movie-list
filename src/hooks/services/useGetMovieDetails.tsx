import { movieDetailsMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { MovieDetails } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (movieId: string) => {
  const { data } = await tmdbSingleton.get<MovieDetails>(
    `/movie/${movieId}?append_to_response=account_states`,
  );
  return movieDetailsMapper(data);
};

const useGetMovieDetails = (movieId?: string) => {
  return useQuery({
    queryKey: ["get-movie-details", movieId],
    queryFn: () => queryFn(movieId!),
    enabled: !!movieId,
  });
};

export default useGetMovieDetails;
