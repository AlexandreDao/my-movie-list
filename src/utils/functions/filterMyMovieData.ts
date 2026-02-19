import { SORT_ARRAY } from "@/utils/constants/sort";
import { FilterState } from "@/utils/store/reducers/filterReducer";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { isAfter, isBefore, parse } from "date-fns";

export const filterMyMovieData = (
  data: MovieDataEntryMapped[],
  filter: FilterState,
) => {
  const filteredGenreData = filter.genreFilter.length
    ? data.filter((d) =>
        d.genreIds.some((item) => filter.genreFilter.includes(item)),
      )
    : data;
  const filteredDateData = filter.dateFilter
    ? filteredGenreData.filter((d) =>
        filter.dateFilter === "before"
          ? isBefore(
              parse(d.releaseDate, "y-MM-dd", new Date()),
              new Date(filter.date),
            )
          : isAfter(
              parse(d.releaseDate, "y-MM-dd", new Date()),
              new Date(filter.date),
            ),
      )
    : filteredGenreData;
  const sortedData = filter.sort.length
    ? filteredGenreData.sort((a, b) => {
        const first = filter.sort[0];

        if (first === SORT_ARRAY[0].id) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        }
        if (first === SORT_ARRAY[1].id) {
          if (a.popularity < b.popularity) return 1;
          if (a.popularity > b.popularity) return -1;
          return 0;
        }
        if (first === SORT_ARRAY[2].id) {
          if (a.voteAverage < b.voteAverage) return 1;
          if (a.voteAverage > b.voteAverage) return -1;
          return 0;
        }
        return 0;
      })
    : filteredDateData;

  return sortedData;
};
