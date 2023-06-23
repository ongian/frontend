import { createSlice } from "@reduxjs/toolkit";

const wishlistLS = JSON.parse(localStorage.getItem('wishlist')) || [];

export const wishlistSlice = createSlice({
    name: 'wishlistSlice',
    initialState: {
        wishlist: wishlistLS
    },
    reducers: {
        addToWishlist: (state, action) => {
            if(state.wishlist.length > 0 && state.wishlist.includes(action.payload)){
                return;
            }
            const updatedWishlist = [...state.wishlist, action.payload]
            state.wishlist = updatedWishlist;
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        },
        removeToWishlist: (state, action) => {
            const updatedWishlist = state.wishlist.filter((w) => w !== action.payload)
            state.wishlist = updatedWishlist;
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
        }
    }
})



export const {addToWishlist, removeToWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;