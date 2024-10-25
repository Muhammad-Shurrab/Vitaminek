import { createSlice } from "@reduxjs/toolkit";

const navAuthSlice = createSlice({
  name: "nav",
  initialState: {
    isLoggedIn: false,
    userRole: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = false;
      state.userRole = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = true;
      state.userRole = null;
    },
  },
});

export const { login, logout } = navAuthSlice.actions;
export default navAuthSlice.reducer;
