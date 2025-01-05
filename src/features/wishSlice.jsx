import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Cart Items
export const fetchWishItems = createAsyncThunk(
  "cart/fetchWishItems",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}WishList`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const wishItems = await Promise.all(
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
          product: productResponse.data, // ربط بيانات المنتج بالعنصر
        };
      })
    );

    return wishItems;
  }
);

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default wishSlice.reducer;
