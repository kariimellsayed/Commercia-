import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// جلب المنتجات باستخدام createAsyncThunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    const token = getState().auth.token || `${import.meta.env.VITE_AUTH_TOKEN}`; // الحصول على التوكن من الـ state أو من env
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}Product`, // استخدام متغير البيئة VITE_API_BASE_URL
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
