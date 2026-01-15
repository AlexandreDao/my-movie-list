import useCreateNewToken from "@/hooks/services/useCreateNewToken";
import { validateTokenResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { Credentials } from "@/utils/types/formType";
import { ValidateTokenResponse } from "@/utils/types/tmdbTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const mutationFnFactory = (requestToken: string) => {
  return async ({ username, password }: Credentials) => {
    if (!requestToken) {
      throw new Error("Request token is not available");
    }
    const { data } = await tmdbSingleton.post<ValidateTokenResponse>(
      "/authentication/token/validate_with_login",
      {
        username,
        password,
        request_token: requestToken,
      },
    );

    return validateTokenResponseMapper(data);
  };
};

const useValidateToken = () => {
  const queryClient = useQueryClient();
  const { data } = useCreateNewToken();
  const mutationFn = mutationFnFactory(data?.requestToken || "");

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-new-token"] });
    },
    throwOnError: true,
  });
};

export default useValidateToken;
