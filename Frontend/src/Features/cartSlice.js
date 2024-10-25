// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // This will hold the items in the cart
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Update quantity if item already in cart
      } else {
        state.items.push(action.payload); // Add new item
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear the cart
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions; // Ensure this line is present
export default cartSlice.reducer; // Ensure the default export is correct
