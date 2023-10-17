import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBoxOn: false,
  queryObj: {},
};

export const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    closeSearchBox: (state, action) => {
      state.searchBoxOn = false;
    },
    openSearchBox: (state, action) => {
      state.searchBoxOn = true;
    },
    updateQueryObj: (state, action) => {
      state.queryObj = action.payload;
      console.log(action.payload);
    },
  },
});

export const { closeSearchBox, openSearchBox, updateQueryObj } =
  variableSlice.actions;

export default variableSlice.reducer;
