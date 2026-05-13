import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: 'INR',
    taxPercent: '5',
    serviceCharge: '0',
    allowDiscounts: true,
    discountPercent: '0',
    receiptFooter: 'Thank you for dining with us. Visit again!',
    restaurantName: 'Restro Cafe',
    logo: '',
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
