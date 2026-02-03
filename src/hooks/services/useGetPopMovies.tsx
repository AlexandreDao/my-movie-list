import { movieDataEntryMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { GetMoviesResponse } from "@/utils/types/tmdbTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

const queryFn = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await tmdbSingleton.get<GetMoviesResponse>(
    `/movie/popular?page=${pageParam}`,
  );
  return data.results.map((entry) => movieDataEntryMapper(entry));
};

const useGetPopMovies = () => {
  return useInfiniteQuery({
    queryKey: ["get-popular-movies"],
    queryFn: queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0 || lastPageParam === 500) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flat(),
    staleTime: 60 * 1000 * 60 * 24, // 24 hour
  });
};

export default useGetPopMovies;
