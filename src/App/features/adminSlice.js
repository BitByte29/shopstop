import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  products: [],
  users: [],
  reviews: [],
  productReview: "",
  orders: [],
  sales: [],
  loading: false,
  error: "",
};

const server = "http://localhost:3001";

//----------------------------------------------------Get Stats----------------------------------------------//
export const getStats = createAsyncThunk(
  "admin/stats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/v1/admin/stats`);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);

//-----------------------------------------------Products---------------------------------------------------//

export const createProduct = createAsyncThunk(
  "admin/create/Product",
  async (myForm, { rejectWithValue }) => {
    console.log({ ...myForm });
    try {
      const response = await axios.post(
        `${server}/api/v1/admin/product/new`,
        myForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

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
      res.data.id = id;
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);
export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${server}/api/v1/admin/product/${id}`, {
        productData,
      });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);

//-----------------------------------------------Users---------------------------------------------------//

export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/v1/admin/users`);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "admin/user/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${server}/api/v1/admin/user/${id}`);
      res.data.name = "head";
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/user/update",
  async ({ _id, email, name, role }, { rejectWithValue }) => {
    try {
      console.log(email, name);
      const res = await axios.put(`${server}/api/v1/admin/user/${_id}`, {
        email,
        name,
        role,
      });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

//-----------------------------------------------Orders---------------------------------------------------//

export const getAllOrders = createAsyncThunk(
  "admin/orders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${server}/api/v1/admin/orders`);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "admin/order/update",
  async ({ _id, orderStatus }, { rejectWithValue }) => {
    console.log(_id, orderStatus);
    try {
      const res = await axios.put(`${server}/api/v1/admin/order/${_id}`, {
        orderStatus,
      });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/delete/order",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${server}/api/v1/admin/order/${id}`);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage); // Pass the error message to the reducer
    }
  }
);

//-----------------------------------------------Reviews---------------------------------------------------//

export const getProductReviews = createAsyncThunk(
  "admin/reviews",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${server}/api/v1/reviews?productId=${productId}`
      );
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/delete",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${server}/api/v1/review/${reviewId}/?productId=${productId}`
      );
      return res.data;
    } catch (error) {
      const errorMessage = error.data.message || "Internal Server Error";
      return rejectWithValue(errorMessage);
    }
  }
);

//-----------------------------------------------0---------------------------------------------------//

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.sales = action.payload.sales;
    });
    builder.addCase(getStats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getStats.rejected, (state, action) => {
      state.loading = false;
      state.sales = [];
      state.data = [];
      toast(action.payload);
      state.error = action.payload;
    });
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
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      toast(action.payload.message);
    });
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false;
      toast(action.payload.message);
    });
    builder.addCase(editProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
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
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      toast.error(action.payload.message);
      state.loading = false;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      toast.success(action.payload.message);
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });

    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      toast.success(action.payload.message);
    });
    builder.addCase(updateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      // state.products = state.products;
      toast(action.payload.message);
    });
    builder.addCase(deleteOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });

    builder.addCase(getProductReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.productReview = action.payload.productName;
      state.reviews = action.payload.reviews;
    });
    builder.addCase(getProductReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.reviews = [];
      toast(action.payload);
      state.error = action.payload;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.loading = false;
      toast("Review Deleted.");
      state.reviews = action.payload.reviews;
    });
    builder.addCase(deleteReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      toast(action.payload);
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;

export const { updateUsers, updateOrders, updateProducts } = adminSlice.actions;
