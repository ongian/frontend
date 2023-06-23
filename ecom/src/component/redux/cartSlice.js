import { createSlice } from "@reduxjs/toolkit";

const cartLS = JSON.parse(localStorage.getItem('cart')) || [];
export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: cartLS
    },
    reducers: {
        addToCart: (state, action) => {
            const cartArray = [...state.cart];
            const checkCart = cartArray.filter((c) => c.id === action.payload.id);
            if(checkCart.length){
                const indexOfItem = cartArray.findIndex((c) => c.id === action.payload.id);
                cartArray[indexOfItem].count = action.payload.count;
                state.cart = cartArray;
                localStorage.setItem('cart', JSON.stringify(state.cart));
            } else {
                state.cart = [...state.cart, action.payload];
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        removeToCart: (state, action) => {
            const cartArray = [...state.cart];
            const updatedCart = cartArray.filter(c => c.id !== action.payload.id);
            state.cart = updatedCart;
            localStorage.setItem('cart', JSON.stringify(state.cart))            
        }
    }
})

export const {addToCart, removeToCart} = cartSlice.actions;
export default cartSlice.reducer;