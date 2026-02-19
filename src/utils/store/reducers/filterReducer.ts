import { DateFilter } from "@/utils/types/filterType";
import { SetFilterPayload } from "@/utils/types/storePayloadTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
  sort: number[];
  genreFilter: number[];
  date: string;
  dateFilter: DateFilter;
};

const INITIAL_STATE: FilterState = {
  sort: [],
  genreFilter: [],
  date: new Date().toISOString(),
  dateFilter: null,
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState: INITIAL_STATE,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      if (action.payload.dateFilter && !action.payload.date) {
        throw new Error("date must be set with dateFilter");
      }
      state.sort = action.payload.sort;
      state.genreFilter = action.payload.genreFilter;
      state.date = action.payload.date;
      state.dateFilter = action.payload.dateFilter;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter } = FilterSlice.actions;

export default FilterSlice.reducer;
