import { CreateNewTokenResponseMapped } from "@/utils/types/tmdbMappedTypes";
import { CreateNewTokenResponse } from "@/utils/types/tmdbTypes";

export const createNewTokenResponseMapper = (
  data: CreateNewTokenResponse,
): CreateNewTokenResponseMapped => {
  return {
    success: data.success,
    expiresAt: data.expires_at,
    requestToken: data.request_token,
  };
};

export const signInResponseMapper = createNewTokenResponseMapper;
