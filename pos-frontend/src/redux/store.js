import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import customerSlice from "./slices/customerSlice";
import menuSlice from "./slices/menuSlice";
import settingsSlice from "./slices/settingsSlice";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        user: userSlice,
        customer: customerSlice,
        menu: menuSlice,
        settings: settingsSlice,
    },
    devTools: import.meta.env.NODE_ENV !== 'production', // Enable Redux DevTools in development only
});

export default store;