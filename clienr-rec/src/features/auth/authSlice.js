import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi, loginApi, logoutApi } from "@/api/index";

// ===== Signup Thunk =====
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signupApi(email, password);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ===== Login Thunk =====
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(email, password);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ===== Logout Thunk =====
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await logoutApi(auth.token);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"), // 🔹 new
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    manualLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // 🔹 update
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // ===== Signup =====
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true; // 🔹 update
      localStorage.setItem("token", action.payload.access_token);
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ===== Login =====
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
      state.isAuthenticated = true; // 🔹 update
      localStorage.setItem("token", action.payload.access_token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ===== Logout =====
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // 🔹 update
      localStorage.removeItem("token");
    });
  },
});

export const { clearError, manualLogout } = authSlice.actions;
export default authSlice.reducer;
