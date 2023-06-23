import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice
    }
})

export default store;