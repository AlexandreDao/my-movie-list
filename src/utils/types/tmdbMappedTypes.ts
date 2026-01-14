export type CreateNewTokenResponseMapped = {
  success: boolean;
  expiresAt: string;
  requestToken: string;
};

export type SigInResponseMapped = CreateNewTokenResponseMapped;
