import { signOutResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { SignOutResponse } from "@/utils/types/tmdbTypes";
import { useMutation } from "@tanstack/react-query";

const queryFn = async () => {
  const { data } = await tmdbSingleton.delete<SignOutResponse>(
    "/authentication/session",
  );
  return signOutResponseMapper(data);
};

const useSignOut = () => {
  return useMutation({
    mutationKey: ["delete-token"],
    mutationFn: queryFn,
  });
};

export default useSignOut;
