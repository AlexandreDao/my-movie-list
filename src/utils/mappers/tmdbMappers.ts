import {
  CreateNewTokenResponseMapped,
  SignInResponseMapped,
  SignOutResponseMapped,
} from "@/utils/types/tmdbMappedTypes";
import {
  CreateNewTokenResponse,
  SignInResponse,
  SignOutResponse,
} from "@/utils/types/tmdbTypes";

export const createNewTokenResponseMapper = (
  data: CreateNewTokenResponse,
): CreateNewTokenResponseMapped => {
  return {
    success: data.success,
    expiresAt: data.expires_at,
    requestToken: data.request_token,
  };
};

export const validateTokenResponseMapper = createNewTokenResponseMapper;

export const signInResponseMapper = (
  data: SignInResponse,
): SignInResponseMapped => {
  return {
    success: data.success,
    sessionId: data.session_id,
  };
};

export const signOutResponseMapper = (
  data: SignOutResponse,
): SignOutResponseMapped => {
  return {
    success: data.success,
  };
};
