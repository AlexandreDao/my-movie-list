import { SignOutResponse } from "./tmdbTypes";

export type CreateNewTokenResponseMapped = {
  success: boolean;
  expiresAt: string;
  requestToken: string;
};

export type ValidateTokenResponseMapped = CreateNewTokenResponseMapped;

export type SignInResponseMapped = {
  success: boolean;
  sessionId: string;
};

export type SignOutResponseMapped = SignOutResponse;
