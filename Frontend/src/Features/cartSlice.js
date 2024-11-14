// src/store/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get("http://localhost:5000/api/cart/view");
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (payload) => {
  console.log("Front end", payload);
  const response = await axios.post("http://localhost:5000/api/cart/add", {
    payload,
  });
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        // Include all product details in the cart item
        state.items.push({
          id: action.payload._id,
          productId: action.payload.productId,
          title: action.payload.title,
          price: action.payload.price,
          photos: action.payload.photos,
          quantity: action.payload.quantity,
          size: action.payload.size,
          flavour: action.payload.flavour,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.meta.arg; // payload from the dispatch
        const existingItem = state.items.find(
          (item) => item.productId === newItem.productId
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

// export const { addToCart, fetchCart } = cartSlice.actions;
// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
