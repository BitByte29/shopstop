import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchBoxOn: false,
  toSearch: "",
  rating: 0,
  currentPage: 1,
  categories: [],
  category: "All",
};

export const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    closeSearchBox: (state, _) => {
      state.searchBoxOn = false;
    },
    openSearchBox: (state, _) => {
      state.searchBoxOn = true;
    },
    updateToSearch: (state, action) => {
      state.toSearch = action.payload;
    },
    updateRating: (state, _) => {
      state.rating = 0;
    },
    updateCurrenPage: (state, _) => {
      state.currentPage = 1;
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const {
  closeSearchBox,
  openSearchBox,
  updateToSearch,
  updateCurrenPage,
  updateRating,
  updateCategories,
  setCategory,
} = variableSlice.actions;

export default variableSlice.reducer;
