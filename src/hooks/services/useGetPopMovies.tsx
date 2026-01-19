import { movieDataEntryMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { GetMoviesResponse } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
  const { data } = await tmdbSingleton.get<GetMoviesResponse>("/movie/popular");
  return data.results.map((entry) => movieDataEntryMapper(entry));
};

const useGetPopMovies = () => {
  return useQuery({
    queryKey: ["get-popular-movies"],
    queryFn: queryFn,
    staleTime: 60 * 1000 * 60 * 24, // 24 hour
    throwOnError: true,
  });
};

export default useGetPopMovies;
