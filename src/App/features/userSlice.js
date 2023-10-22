import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  message: "",
  loading: false,
  isError: false,
  isAuthenticated: true,
  accountCreated: false,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (myForm, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/register`,
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

// export const editUser = createAsyncThunk(
//   "editUser",
//   async (myForm, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/api/v1/register`,
//         myForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "An error occurred.";
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/me`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/logout`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "Users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      // state.users = action.payload.users;
      state.message = action.payload.message;
      state.accountCreated = true;

      toast.success(action.payload.message);
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.accountCreated = true;
      state.message = action.payload;
      toast.error(action.payload);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isError = false;
      toast.success("Logged in successfully.");
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isError = true;
      // state.isAuthenticated = false;
      toast.warning(action.payload);
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isError = false;
      state.isAuthenticated = true;
    });
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      // toast(action.payload);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      toast.warning("User logged out.");
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isError = true;
      toast(action.payload);
    });
  },
});

export default userSlice.reducer;
