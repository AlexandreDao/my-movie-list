export type CreateNewTokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type ValidateTokenResponse = CreateNewTokenResponse;

export type SignInResponse = {
  success: boolean;
  session_id: string;
};

export type SignOutResponse = {
  success: boolean;
};
