import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Brands Using AsyncThunk
export const fetchBrands = createAsyncThunk(
  "brands/fetchBradns",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}Brand`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default brandsSlice.reducer;
