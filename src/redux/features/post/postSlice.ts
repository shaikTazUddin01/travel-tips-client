import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TQueryOperation = {
  category: string | null;
  search: string | null;
  sorting: number | null;
  type: string | null;
};

const initialState: TQueryOperation = {
  category: null,
  search: null,
  sorting: null,
  type: null,
};

export const querySlice = createSlice({
  name: "queryOperation",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setSearch: (state, action: PayloadAction<string | null>) => {
      state.search = action.payload;
    },
    setSorting: (state, action: PayloadAction<number | null>) => {
      state.sorting = action.payload;
    },
    setType: (state, action: PayloadAction<string | null>) => {
      state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setSearch, setSorting, setType } = querySlice.actions;

export default querySlice.reducer;
