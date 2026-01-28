import { postListResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { PostListResponse } from "@/utils/types/tmdbTypes";
import { useMutation } from "@tanstack/react-query";

type PostListQuery = {
  list: "favorite" | "watchlist";
  accountId: string;
  movieId?: number;
  add: boolean;
};

// Despite the name, this hook can also be used to REMOVE an Item from Favorite / Watchlist through the "add" parameter
const useAddToMainList = () => {
  const mutationFn = async ({
    list,
    accountId,
    movieId,
    add,
  }: PostListQuery) => {
    const body =
      list === "watchlist"
        ? {
            media_type: "movie",
            media_id: movieId,
            watchlist: add,
          }
        : {
            media_type: "movie",
            media_id: movieId,
            favorite: add,
          };
    const { data } = await tmdbSingleton.post<PostListResponse>(
      `/account/${accountId}/${list}`,
      body,
    );
    return postListResponseMapper(data);
  };

  return useMutation({
    mutationFn: mutationFn,
  });
};

export default useAddToMainList;
