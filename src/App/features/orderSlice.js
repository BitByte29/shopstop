import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { getserver } from "./host";
const server = getserver();
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
    // console.log(orderDetails);

    try {
      const response = await axios.post(`${server}/api/v1/order/new`, {
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
      const response = await axios.get(`${server}/api/v1/myorders`);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/one",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/api/v1/order/${id}`);
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
  orderInfo: null,
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
        toast("Order created not clear cart");
        localStorage.removeItem("cartItemsList");
        localStorage.removeItem("cartSize");
        // console.log("Order created");
      })
      .addCase(createNewOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        // console.log("Nope");
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.loading = false;
      })
      .addCase(myOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(myOrders.rejected, (state, action) => {
        toast(action.payload);
        // console.log(action.payload);
        state.loading = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderInfo = action.payload.order;
        state.loading = false;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrder.rejected, (state, action) => {
        toast(action.payload);
        // console.log(action.payload);
        state.loading = false;
      });
  },
});

export const { setItemsPrice, setTaxPrice, setTotalPrice } = orderSlice.actions;

export default orderSlice.reducer;
