import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ keyword = "" }, { rejectWithValue }) => {
    try {
      const host = "http://localhost:3001";
      // console.log(querry);
      const url = `${host}/api/v1/products?keyword=${keyword}`;
      const response = await axios.get(url);
      console.log(url);
      return response.data; // Assuming your data is in response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);
export const addReview = createAsyncThunk(
  "addReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/review`);

      // const response = await axios.post(`/api/v1/reviews/${id}`);
      return response.data; // Assuming your data is in response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const host = "http://localhost:3001";

      const response = await axios.get(`${host}/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  data: [],
  details: {},
  loading: false,
  isError: false,
  error: null,
};

const productSlice = createSlice({
  name: "Products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false; // Set loading to false when an error occurs
      state.isError = true;
      state.error = action.payload; // Store the error message
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload;
    });
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false; // Set loading to false when an error occurs
      state.isError = true;
      state.details = {};
      state.error = action.payload; // Store the error message
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      toast.success(action.payload.message);
    });
    builder.addCase(addReview.rejected, (state, action) => {
      toast.error(action.payload);
    });
  },
});

export default productSlice.reducer;
