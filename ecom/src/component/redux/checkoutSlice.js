import { createSlice } from "@reduxjs/toolkit";

const checkSteps = {
    shippingSteps: false,
    paymentSteps: false,
    orderConfirm: false,
    orderInfo: {},
    shippingDetails: {}
}
const saveInfo = JSON.parse(localStorage.getItem('shippingInfo')) || null;
checkSteps.shippingDetails = saveInfo;
export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: checkSteps,
    reducers: {
        setShippingInfoRx: (state, action) => {
            state.shippingSteps = action.payload;
        },
        setOrderInfo: (state, action) => {
            state.orderInfo = action.payload
        },
        setOrderConfirm: (state) => {
            state.orderConfirm = true;
            state.paymentSteps = true;
        },
        setShippingDetails: (state, action) => {
            state.shippingDetails =  action.payload
        }
    }
})

export const {setOrderConfirm, setShippingInfoRx, setOrderInfo, setShippingDetails} = checkoutSlice.actions;
export default checkoutSlice.reducer;