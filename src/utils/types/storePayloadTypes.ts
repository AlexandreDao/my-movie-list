import { DateFilter } from "@/utils/types/filterType";

export type SignInPayload = {
  username: string;
};

export type GetIdPayload = {
  accountId: string;
};

export type SetFilterPayload = {
  sort: number[];
  genreFilter: number[];
  date: string;
  dateFilter: DateFilter;
};
