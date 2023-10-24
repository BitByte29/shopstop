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

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ name, email }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/update`, {
        name,
        email,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (
    { oldPassword, newPassword, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      console.log(oldPassword, newPassword, confirmPassword);
      const response = await axios.put(
        `http://localhost:3001/api/v1/password/update`,
        { oldPassword, newPassword, confirmPassword }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

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

//Forgot password
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/password/forgot`,
        { email }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

//Reset password
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ token, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/password/reset/${token}`,
        {
          password,
          confirmPassword,
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

const userSlice = createSlice({
  name: "Users",
  initialState,
  extraReducers: (builder) => {
    //Register
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

    //Update Profile
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      toast.success(action.payload.message);
    });
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });

    //Update Password
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      toast.success("Password updated successfully");
    });
    builder.addCase(updatePassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });

    //Login
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
      state.loading = false;
      state.isError = true;
      // state.isAuthenticated = false;
      toast.warning(action.payload);
    });

    //Details
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isError = false;
      state.isAuthenticated = true;
    });

    builder.addCase(getUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    //Nrrded
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      state.loading = false;

      // toast(action.payload);
    });
    //Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      toast.warning("User logged out.");
    });

    //Forgot Password
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      toast.success(action.payload.message);
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isError = true;
      state.loading = false;
      toast.error(action.payload);
    });

    //Reset Password
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      toast.success("Password Reset Successful");
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isError = true;
      state.loading = false;
      toast.error(action.payload);
    });
  },
});

export default userSlice.reducer;
