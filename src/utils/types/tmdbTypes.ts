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

export type PostListResponse = {
  status_code: number;
  status_message: string;
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

export type MovieStatus = {
  id: number;
  favorite: boolean;
  rated: { value: number } | boolean;
  watchlist: boolean;
};

export type MovieDetails = {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  account_states: MovieStatus;
};

export type AccountDetails = {
  id: number;
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieGenreListResponse = {
  genres: MovieGenre[];
};
