import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const initialState = {
  token: cookie.get("Bearer") || null,
  userRole: cookie.get("userRole") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      // تخزين التوكن في الـ cookies
      cookie.set("Bearer", action.payload, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    },
    clearToken: (state) => {
      state.token = null;
      // حذف التوكن من الـ cookies
      cookie.remove("Bearer", { path: "/" });
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      cookie.set("userRole", action.payload, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    },
    clearAuth: (state) => {
      state.userRole = null;
      cookie.remove("userRole", { path: "/" });
    },
  },
});

export const { setToken, clearToken, setUserRole, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
