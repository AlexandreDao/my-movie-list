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

export type MovieDataEntryMapped = {
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  backdropPath: string;
  posterPath: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
};
