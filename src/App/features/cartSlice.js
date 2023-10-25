import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItemsList")
    ? JSON.parse(localStorage.getItem("cartItemsList"))
    : [],
  cartSize: localStorage.getItem("cartSize")
    ? Number(localStorage.getItem("cartSize"))
    : 0,
  // cartSize: 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  shippingInfoCorrect: localStorage.getItem("shippingInfoCorrect")
    ? localStorage.getItem("shippingInfoCorrect") === "true"
      ? true
      : false
    : false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      console.log(id, quantity);
      const response = await axios.get(
        `http://localhost:3001/api/v1/product/${id}`
      );
      const product = response.data;
      if (product) {
        const productItem = {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].url,
          stock: product.stock,
          quantity: Number(quantity),
          onSale: product.onSale,
          discount: product.discount,
        };
        return productItem;
      } else {
        return rejectWithValue("Product with given id not found.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Internal Server Error";
      return rejectWithValue(errorMessage);
    }
  }
);

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      state.cartSize -= 1;
      // state.cartSize = 0;
      localStorage.setItem("cartItemsList", JSON.stringify(state.cartItems));
      localStorage.setItem("cartSize", state.cartSize.toString());
    },
    increaseQuantity: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product === action.payload) {
          item.quantity += 1;
        }
      });
      localStorage.setItem("cartItemsList", JSON.stringify(state.cartItems));
      localStorage.setItem("cartSize", state.cartSize.toString());
    },
    decreaseQuantity: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product === action.payload) {
          item.quantity -= 1;
        }
      });
      localStorage.setItem("cartItemsList", JSON.stringify(state.cartItems));
      localStorage.setItem("cartSize", state.cartSize.toString());
    },
    updateShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    setShippingInfoCorrect: (state, action) => {
      state.shippingInfoCorrect = action.payload;
      localStorage.setItem("shippingInfoCorrect", state.shippingInfoCorrect);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartSize = 0;
      localStorage.removeItem("cartItemsList");

      localStorage.removeItem("cartSize");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        let isInCart = false;
        if (state.cartItems.length > 0) {
          isInCart = state.cartItems.find(
            (item) => item.product === action.payload.product
          );
        }
        if (isInCart) {
          state.cartItems.forEach((item) => {
            if (item.product === action.payload.product) {
              item.quantity = action.payload.quantity;
            }
          });
        } else {
          state.cartItems.push(action.payload);
          state.cartSize += 1;
        }

        localStorage.setItem("cartItemsList", JSON.stringify(state.cartItems));
        localStorage.setItem("cartSize", state.cartSize.toString());
      })
      .addCase(addToCart.rejected, (state, action) => {
        toast(action.payload);
      });
  },
});

export const {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  updateShippingInfo,
  setShippingInfoCorrect,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
