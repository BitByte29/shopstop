import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import variablesSlice from "./features/variablesSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    vars: variablesSlice,
  },
});
