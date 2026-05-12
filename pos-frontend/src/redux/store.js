import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production', // Enable Redux DevTools in development only
});

export default store;