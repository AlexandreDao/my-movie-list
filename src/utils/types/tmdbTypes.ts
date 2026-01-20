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

export type MovieDataEntry = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export type GetMoviesResponse = {
  page: number;
  results: MovieDataEntry[];
  total_pages: number;
  total_results: number;
};
