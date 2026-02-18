export type MapParam = {
  title: string;
};

export type FilterParam = {
  sort?: string;
  filter?: string;
  date?: string;
  dateFilter: "before" | "after" | "";
};
