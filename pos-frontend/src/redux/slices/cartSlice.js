import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { setCartItems, clearCart } = cartSlice.actions;

export const getTotalPrice = (state) => {
    const items = state?.cart?.items ?? [];
    return items.reduce((sum, item) => {
        const price = Number(item?.price ?? item?.menu?.price ?? 0);
        const qty = Number(item?.quantity ?? 1);
        return sum + price * qty;
    }, 0);
};

export default cartSlice.reducer;
