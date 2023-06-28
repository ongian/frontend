import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import filterSlice from "./filterSlice";
import checkoutSlice from "./checkoutSlice";
const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        filters: filterSlice,
        checkout: checkoutSlice
    }
})

export default store;