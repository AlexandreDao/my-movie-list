import { movieDataEntryMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { GetMoviesResponse } from "@/utils/types/tmdbTypes";
import { useInfiniteQuery } from "@tanstack/react-query";

const queryFn = async (accountId: string, pageNum: number) => {
  const { data } = await tmdbSingleton.get<GetMoviesResponse>(
    `/account/${accountId}/watchlist/movies?page=${pageNum}`,
  );
  return data.results.map((entry) => movieDataEntryMapper(entry));
};

const useGetWatchlist = (accountId: string) => {
  return useInfiniteQuery({
    queryKey: ["get-list-watchlist", accountId],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      queryFn(accountId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0 || lastPageParam === 500) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => data.pages.flat(),
    enabled: !!accountId,
  });
};

export default useGetWatchlist;
