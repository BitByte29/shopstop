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

// _____________________________________________________________________________

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
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

export const { updateUsers } = adminSlice.actions;
