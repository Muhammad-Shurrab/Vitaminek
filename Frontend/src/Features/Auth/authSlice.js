import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      console.log(formData);
      console.log("2");
      return { role: response.data.role, userId: response.data.userId };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.post("/api/auth/logout");
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data; // Return the user role
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         credentials
//       );

//       // The backend should set the HTTP-only cookie
//       // We'll just store the user data in the Redux state
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      // The actual removal of the cookie should be done by the backend
      // Here we just clear the Redux state
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
