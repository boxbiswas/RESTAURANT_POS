import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        upsertCartItem: (state, action) => {
            const item = action.payload;
            const qty = Number(item?.quantity ?? 0);
            const existingIndex = state.items.findIndex((cartItem) => cartItem.cartId === item.cartId);

            if (qty <= 0) {
                if (existingIndex !== -1) state.items.splice(existingIndex, 1);
                return;
            }

            if (existingIndex !== -1) {
                state.items[existingIndex] = {
                    ...state.items[existingIndex],
                    ...item,
                    quantity: qty,
                };
            } else {
                state.items.push({ ...item, quantity: qty });
            }
        },
        removeCartItem: (state, action) => {
            const cartId = action.payload;
            state.items = state.items.filter((item) => item.cartId !== cartId);
        },
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { upsertCartItem, removeCartItem, setCartItems, clearCart } = cartSlice.actions;

export const getCartItems = (state) => state?.cart?.items ?? [];

export const getTotalPrice = (state) => {
    const items = state?.cart?.items ?? [];
    return items.reduce((sum, item) => {
        const price = Number(item?.price ?? item?.menu?.price ?? 0);
        const qty = Number(item?.quantity ?? 1);
        return sum + price * qty;
    }, 0);
};

export default cartSlice.reducer;
