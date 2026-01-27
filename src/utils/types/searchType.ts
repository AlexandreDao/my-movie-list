export type Theater = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type Movie = {
  id: number;
};

export type SearchResponse = {
  theaters: Theater[];
};
