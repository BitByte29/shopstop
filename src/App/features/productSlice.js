import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      const host = "http://localhost:3001";
      let url = "";

      if (requestedFrom === "homepage") {
        url = `${host}/api/v1/products?onSale=true&limit=8&page=1`;
      } else {
        let ratingString = rating > 0 ? `rating[gte]=${rating}&` : "";

        let categoryString = category !== "All" ? `category=${category}&` : "";

        let keywordString = keyword.length > 0 ? `keyword=${keyword}&` : "";

        let priceRangeString = `price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&`;

        let pageString = `page=${currentPage}`;

        url = `${host}/api/v1/products?${keywordString}${ratingString}${priceRangeString}${categoryString}${pageString}`;
      }
      console.log(url);
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
  async (reviewObj, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/review`);

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
        `http://localhost:3001/api/v1/review/vote`,
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
//Not necessary as product is already fetched and stored in store once we can access from there
// export const getProductDetails = createAsyncThunk(
//   "getProductDetails",
//   async (id, { rejectWithValue }) => {
//     try {
//       const host = "http://localhost:3001";

//       const response = await axios.get(`${host}/api/v1/product/${id}`);
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "An error occurred.";
//       toast.error(errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

const initialState = {
  data: [],
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
      toast(action.payload);
      state.error = action.payload; // Store the error message
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
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
  },
});

export default productSlice.reducer;
