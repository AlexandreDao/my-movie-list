import { movieDataEntryMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { GetMoviesResponse } from "@/utils/types/tmdbTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

const queryFn = async (query: string, pageNum: number) => {
  const { data } = await tmdbSingleton.get<GetMoviesResponse>(
    `/search/movie?query=${query}&page=${pageNum}`,
  );
  return data.results.map((entry) => movieDataEntryMapper(entry));
};

const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["get-popular-movies", query],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      queryFn(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0 || lastPageParam === 500) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flat(),
    enabled: !!query,
    staleTime: 60 * 1000 * 60 * 24, // 24 hour
  });
};

export default useSearchMovies;
