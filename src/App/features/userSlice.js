import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axios.get("http://localhost:3001/api/v1/products");
  return response;
});

const initialState = {
  users: [],
  loading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "Users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      // state.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
