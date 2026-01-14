import { createNewTokenResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { CreateNewTokenResponse } from "@/utils/types/tmdbTypes";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
  const { data } = await tmdbSingleton.get<CreateNewTokenResponse>(
    "/authentication/token/new",
  );
  return createNewTokenResponseMapper(data);
};

const useCreateNewToken = () => {
  return useQuery({
    queryKey: ["create-new-token"],
    queryFn: queryFn,
    staleTime: 60 * 1000 * 60, // 1 hour
  });
};

export default useCreateNewToken;
