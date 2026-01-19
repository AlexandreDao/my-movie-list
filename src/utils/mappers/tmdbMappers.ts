import {
  CreateNewTokenResponseMapped,
  MovieDataEntryMapped,
  SignInResponseMapped,
  SignOutResponseMapped,
} from "@/utils/types/tmdbMappedTypes";
import {
  CreateNewTokenResponse,
  MovieDataEntry,
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

export const movieDataEntryMapper = (
  data: MovieDataEntry,
): MovieDataEntryMapped => {
  return {
    id: data.id,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    voteAverage: data.vote_average,
  };
};
