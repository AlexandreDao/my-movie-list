type Theater = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type SearchResponse = {
  theaters: Theater[];
};
