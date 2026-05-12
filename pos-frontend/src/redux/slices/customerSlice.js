import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customerName: "",
    customerPhone: "",
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomerDetails: (state, action) => {
            state.customerName = action.payload.customerName;
            state.customerPhone = action.payload.customerPhone;
        },
        clearCustomerDetails: (state) => {
            state.customerName = "";
            state.customerPhone = "";
        }
    }
});

export const { setCustomerDetails, clearCustomerDetails } = customerSlice.actions;

export default customerSlice.reducer;
