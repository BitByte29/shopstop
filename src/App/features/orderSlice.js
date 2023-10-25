import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const serverUrl = "http://localhost:3001";
// const {
// shippingInfo,
// orderItems,
// paymentInfo,
// itemsPrice,
// taxPrice,
// shippingPrice,
// totalPrice,
//   } = req.body;
export const createNewOrder = createAsyncThunk(
  "order/new",
  async (orderDetails, { rejectWithValue }) => {
    console.log(orderDetails);

    try {
      const response = await axios.post(`${serverUrl}/api/v1/order/new`, {
        orderDetails,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage + "catch");
    }
  }
);

export const myOrders = createAsyncThunk(
  "order/my",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}/api/v1/myorders`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  itemsPrice: sessionStorage.getItem("itemsPrice")
    ? Number(sessionStorage.getItem("itemsPrice"))
    : 0,
  totalPrice: sessionStorage.getItem("totalPrice")
    ? Number(sessionStorage.getItem("totalPrice"))
    : 0,
  taxPrice: sessionStorage.getItem("taxPrice")
    ? Number(sessionStorage.getItem("taxPrice"))
    : 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTaxPrice: (state, action) => {
      state.taxPrice = action.payload;
      sessionStorage.setItem("taxPrice", state.taxPrice.toString());
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
      sessionStorage.setItem("totalPrice", state.totalPrice.toString());
    },
    setItemsPrice: (state, action) => {
      state.itemsPrice = action.payload;
      sessionStorage.setItem("itemsPrice", state.itemsPrice.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Order created");
      })
      .addCase(createNewOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        console.log("Nope");
      });
    builder
      .addCase(myOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.loading = false;
      })
      .addCase(myOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(myOrders.rejected, (state, action) => {
        toast(action.payload);
        console.log(action.payload);
        state.loading = false;
      });
  },
});

export const { setItemsPrice, setTaxPrice, setTotalPrice } = orderSlice.actions;

export default orderSlice.reducer;
