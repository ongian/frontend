import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import filterSlice from "./filterSlice";
const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        filters: filterSlice
    }
})

export default store;