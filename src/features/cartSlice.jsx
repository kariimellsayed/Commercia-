import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Cart Items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}Cart`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // جلب تفاصيل المنتجات لكل عنصر في السلة وربطها بالعنصر
    const cartItems = await Promise.all(
      response.data.map(async (item) => {
        const productResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}Product/${item.productId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return {
          ...item,
          product: productResponse.data,
        };
      })
    );

    return cartItems;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
