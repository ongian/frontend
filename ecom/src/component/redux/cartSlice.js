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
            if(typeof(action.payload) === 'object'){
                const checkCart = cartArray.filter((c) => c.id === action.payload.id);
                if(checkCart.length){
                    const indexOfItem = cartArray.findIndex((c) => c.id === action.payload.id);
                    cartArray[indexOfItem].count = action.payload.count;
                    state.cart = cartArray;
                } else {
                    state.cart = [...state.cart, action.payload];
                }
            } else {
                const cartArray = [...state.cart];
                const itemIndex = cartArray.findIndex((c) => c.id === action.payload);
                cartArray[itemIndex].count = cartArray[itemIndex].count + 1;
                state.cart = cartArray;
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeToCart: (state, action) => {
            const cartArray = [...state.cart];
            if(typeof(action.payload) === 'object'){
                const updatedCart = cartArray.filter(c => c.id !== action.payload.id);
                state.cart = updatedCart;
            } else {
                const itemIndex = cartArray.findIndex((c) => c.id === action.payload);
                if(cartArray[itemIndex].count > 1){
                    cartArray[itemIndex].count = cartArray[itemIndex].count - 1;
                    state.cart = cartArray;
                } else {
                    const newCartArray = cartArray.filter(c => c.id !== action.payload);
                    state.cart = newCartArray;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))            
        }
    }
})

export const {addToCart, removeToCart} = cartSlice.actions;
export default cartSlice.reducer;