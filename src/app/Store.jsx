import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productsSlice";
import brandsReducer from "../features/brandsSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import wishReducer from "../features/wishSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    brands: brandsReducer,
    product: productReducer,
    cart: cartReducer,
    wish: wishReducer,
  },
});

export default store;
