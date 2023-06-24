import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

const filterState = {
    categories: [],
    rates: 1,
    prices: {
        min: 0,
        max: 0
    }
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState: filterState,
    reducers: {
        setCategories: (state, action) => {
            const categories = [...state.categories];
            if(categories.includes(action.payload)){
                state.categories = categories.filter((c) => c !== action.payload);
            } else {
                state.categories = [...categories, action.payload]
            }
        },
        setPriceMin: (state, action) => {
            const prices = state.prices;
            state.prices.min = Number(action.payload).toFixed();
        },
        setPriceMax: (state, action) => {
            const prices = state.prices;
            state.prices.max = Number(action.payload).toFixed();
        },
        setRating: (state, action) => {
            state.rates = action.payload;
        }
    }
})

export const {setCategories, setPriceMin, setPriceMax, setRating} = filterSlice.actions;
export default filterSlice.reducer;