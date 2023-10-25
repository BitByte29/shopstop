import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import variablesSlice from "./features/variablesSlice";
import userSlice from "./features/userSlice";
import cartSlice from "./features/cartSlice";
import orderSlice from "./features/orderSlice";
// import { myOrders } from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    vars: variablesSlice,
    users: userSlice,
    cart: cartSlice,
    orders: orderSlice,
  },
});
