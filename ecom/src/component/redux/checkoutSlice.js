import { createSlice } from "@reduxjs/toolkit";

const checkSteps = {
    shippingSteps: false,
    paymentSteps: false,
    orderConfirm: false,
    orderInfo: {},
    shippingInfo: {}
}
export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: checkSteps,
    reducers: {
        setShippingInfo: (state, action) => {
            state.shippingInfo = action.payload,
            state.shippingSteps = true
        },
        setOrderInfo: (state, action) => {
            state.orderInfo = action.payload
        },
        setOrderConfirm: (state) => {
            state.orderConfirm = true;
            state.paymentSteps = true;
        }
    }
})

export const {setOrderConfirm, setShippingInfo, setOrderInfo} = checkoutSlice.actions;
export default checkoutSlice.reducer;