import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { getserver } from "./host";
const server = getserver();
const initialState = {
  data: [],
  products: [],
  product: null,
  loading: false,
  isError: false,
  error: null,
  reviews: null,
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (
    {
      keyword = "",
      rating = 0,
      currentPage = 1,
      requestedFrom = "",
      priceRange = [0, 125000],
      category,
    },
    { rejectWithValue }
  ) => {
    try {
      let url = "";

      if (requestedFrom === "homepage") {
        url = `${server}/api/v1/products?onSale=true&limit=8&page=1`;
      } else {
        let ratingString = rating > 0 ? `rating[gte]=${rating}&` : "";

        let categoryString = category !== "All" ? `category=${category}&` : "";

        let keywordString = keyword.length > 0 ? `keyword=${keyword}&` : "";

        let priceRangeString = `price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&`;

        let pageString = `page=${currentPage}`;

        url = `${server}/api/v1/products?${keywordString}${ratingString}${priceRangeString}${categoryString}${pageString}`;
      }
      // console.log(url);
      const response = await axios.get(url);
      return response.data; // Assuming your data is in response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);

//Going to implement after login n sighnup
export const addReview = createAsyncThunk(
  "addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      // console.log(reviewData);

      const response = await axios.put(`${server}/api/v1/review`, reviewData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);
export const voteReview = createAsyncThunk(
  "voteReview",
  async (anObject, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/review/vote`,
        anObject
      );

      return response.data; // Assuming your data is in response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const getReviews = createAsyncThunk(
  "review/getall",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/api/v1/reviews/${productId}`);

      return response.data; // Assuming your data is in response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

//Not necessary as product is already fetched and stored in store once we can access from there
//Faced with same problem of state emptying

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/api/v1/product/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

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
      toast(action.payload);
      // state.error = action.payload; // Store the error message
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.product = null;
      state.loading = false; // Set loading to false when an error occurs
      state.isError = true;
      toast(action.payload);
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.product = action.payload.product;
      toast.success(action.payload.message);
    });
    builder.addCase(addReview.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(voteReview.fulfilled, (state, action) => {
      toast.success(action.payload.message);
    });
    builder.addCase(voteReview.rejected, (state, action) => {
      toast.error(action.payload);
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(getReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.reviews = null;
      state.loading = false; // Set loading to false when an error occurs
      state.isError = true;
      toast(action.payload);
    });
  },
});

export default productSlice.reducer;
