import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  users: [],
  review: [],
  orders: [],
  loading: false,
  error: "",
};

const server = "http://localhost:3001";

export const getAllProductsAdmin = createAsyncThunk(
  "admin/products",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/v1/admin/products`);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${server}/api/v1/admin/product/${id}`);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);

// _____________________________________________________________________________

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(getAllProductsAdmin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllProductsAdmin.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products;

      toast(action.payload);
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
