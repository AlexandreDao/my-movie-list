import { signInResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { Credentials } from "@/utils/types/formType";
import { SignInResponse } from "@/utils/types/tmdbTypes";
import { useMutation } from "@tanstack/react-query";
import useValidateToken from "./useValidateToken";

const useSignIn = () => {
  const { mutateAsync: validateToken } = useValidateToken();
  const mutationFn = async ({ username, password }: Credentials) => {
    const validateTokenData = await validateToken({ username, password });
    const { data } = await tmdbSingleton.post<SignInResponse>(
      "/authentication/session/new",
      {
        request_token: validateTokenData.requestToken,
      },
    );
    return signInResponseMapper(data);
  };

  return useMutation({
    mutationFn: mutationFn,
  });
};

export default useSignIn;
