export type CreateNewTokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type SignInResponse = CreateNewTokenResponse;
