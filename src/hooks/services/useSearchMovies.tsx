import { movieDataEntryMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { GetMoviesResponse } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (query: string) => {
  const { data } = await tmdbSingleton.get<GetMoviesResponse>(
    `/search/movie?query=${query}`,
  );
  return data.results.map((entry) => movieDataEntryMapper(entry));
};

const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["get-popular-movies", query],
    queryFn: () => queryFn(query),
    enabled: !!query,
    staleTime: 60 * 1000 * 60 * 24, // 24 hour
    throwOnError: true,
  });
};

export default useSearchMovies;
