import { createSlice } from "@reduxjs/toolkit";

export type TQueryOperation = {
  category:string|null;
  search:string|null;
  sorting:number|null
  type:string|null
};



const initialState: TQueryOperation = {
  category:null,
  search:null,
  sorting:null,
  type:null,
};

export const querySlice = createSlice({
  name: "queryOperation",
  initialState,
  reducers: {
    category: (state, action) => {
     state.category=action.payload.category
    },
    search: (state, action) => {
     state.search=action.payload.search
    },
    sorting: (state, action) => {
     state.sorting=action.payload.sorting
    },
    type: (state, action) => {
     state.type=action.payload.type
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { category,search,sorting,type} = querySlice.actions;

export default querySlice.reducer;
