import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/Auth/authSlice";
import cartSlice from "./Features/cartSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    // Add other reducers here
  },
});

export default store;
