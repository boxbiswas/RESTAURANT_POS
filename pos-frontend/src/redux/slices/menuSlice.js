import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    dishes: [],
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        updateCategory: (state, action) => {
            const { oldName, newName } = action.payload;
            const category = state.categories.find(c => c.name === oldName);
            if (category) {
                category.name = newName;
                // Update dishes
                state.dishes.forEach(d => {
                    if (d.category === oldName) d.category = newName;
                });
            }
        },
        removeCategory: (state, action) => {
            const categoryName = action.payload;
            state.categories = state.categories.filter(c => c.name !== categoryName);
            state.dishes = state.dishes.filter(d => d.category !== categoryName);
        },
        addDish: (state, action) => {
            state.dishes.push(action.payload);
        },
        updateDish: (state, action) => {
            const index = state.dishes.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.dishes[index] = { ...state.dishes[index], ...action.payload };
            }
        },
        removeDish: (state, action) => {
            state.dishes = state.dishes.filter(d => d.id !== action.payload);
        },
        setMenu: (state, action) => {
            state.categories = action.payload.categories;
            state.dishes = action.payload.dishes;
        }
    }
});

export const { addCategory, updateCategory, removeCategory, addDish, updateDish, removeDish, setMenu } = menuSlice.actions;
export default menuSlice.reducer;
