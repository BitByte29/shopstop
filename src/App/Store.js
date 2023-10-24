import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import variablesSlice from "./features/variablesSlice";
import userSlice from "./features/userSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    vars: variablesSlice,
    users: userSlice,
    cart: cartSlice,
  },
});
