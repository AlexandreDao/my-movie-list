import useCreateNewToken from "@/services/useCreateNewToken";
import { signInResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { SignInResponse } from "@/utils/types/tmdbTypes";
import { useMutation } from "@tanstack/react-query";

const mutationFnFactory = (
  username: string,
  password: string,
  requestToken: string,
) => {
  return async () => {
    const { data } = await tmdbSingleton.post<SignInResponse>(
      "/authentication/token/validate_with_login",
      {
        username,
        password,
        request_token: requestToken,
      },
    );
    return signInResponseMapper(data);
  };
};

const useSignIn = (username: string, password: string) => {
  const { data } = useCreateNewToken();
  const mutationFn = mutationFnFactory(
    username,
    password,
    data?.requestToken || "",
  );

  return useMutation({
    mutationFn: mutationFn,
  });
};

export default useSignIn;
