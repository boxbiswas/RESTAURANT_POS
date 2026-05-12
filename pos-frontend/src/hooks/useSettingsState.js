import { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory as addReduxCategory, updateCategory, removeCategory, addDish as addReduxDish, updateDish, removeDish as removeReduxDish } from '../redux/slices/menuSlice';
import { updateSettings } from '../redux/slices/settingsSlice';
import { saveSettingsApi } from '../https/index';

export const useSettingsState = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    // Redux State
    const reduxCategories = useSelector((state) => state.menu.categories);
    const dishes = useSelector((state) => state.menu.dishes);
    const categories = reduxCategories.map(c => c.name);
    const posSettings = useSelector((state) => state.settings);

    // Restaurant Profile
    const [restaurantName, setRestaurantName] = useState(posSettings.restaurantName || 'Restro Cafe');
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    // Categories Local State
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryDraft, setCategoryDraft] = useState('');

    // Dishes Local State
    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [dishCategory, setDishCategory] = useState('');
    
    const [editingDishId, setEditingDishId] = useState(null);
    const [dishEditName, setDishEditName] = useState('');
    const [dishEditPrice, setDishEditPrice] = useState('');

    // POS Settings Local State
    const [currency, setCurrency] = useState(posSettings.currency || 'INR');
    const [taxPercent, setTaxPercent] = useState(posSettings.taxPercent || '5');
    const [serviceCharge, setServiceCharge] = useState(posSettings.serviceCharge || '0');
    const [allowDiscounts, setAllowDiscounts] = useState(posSettings.allowDiscounts ?? true);
    const [discountPercent, setDiscountPercent] = useState(posSettings.discountPercent || '0');
    const [receiptFooter, setReceiptFooter] = useState(posSettings.receiptFooter || 'Thank you for dining with us. Visit again!');

    const stats = useMemo(() => ({
        categoryCount: categories.length,
        dishCount: dishes.length,
    }), [categories, dishes]);

    const activeSelectedCategory = selectedCategory && categories.includes(selectedCategory) ? selectedCategory : '';

    const dishesInSelectedCategory = useMemo(() =>
        activeSelectedCategory ? dishes.filter((d) => d.category === activeSelectedCategory) : []
    , [dishes, activeSelectedCategory]);

    const onLogoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setLogoPreview(reader.result?.toString() || '');
        reader.readAsDataURL(file);
        enqueueSnackbar('Logo selected. Save settings to apply.', { variant: 'info' });
    };

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) return enqueueSnackbar('Category name is required.', { variant: 'warning' });
        if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase()))
            return enqueueSnackbar('This category already exists.', { variant: 'warning' });
        
        dispatch(addReduxCategory({ id: Date.now(), name: trimmed, bgColor: "#f6b100" }));
        setNewCategory('');
        if (!selectedCategory) setSelectedCategory(trimmed);
        if (!dishCategory) setDishCategory(trimmed);
        enqueueSnackbar('Category added.', { variant: 'success' });
    };

    const renameSelectedCategory = () => {
        if (!selectedCategory) return enqueueSnackbar('Select a category first.', { variant: 'warning' });
        const trimmed = categoryDraft.trim();
        if (!trimmed) return enqueueSnackbar('Category name cannot be empty.', { variant: 'warning' });
        if (trimmed.toLowerCase() === selectedCategory.toLowerCase())
            return enqueueSnackbar('Enter a new category name to rename.', { variant: 'warning' });
        if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase() && c !== selectedCategory))
            return enqueueSnackbar('A category with this name already exists.', { variant: 'warning' });
        
        const previousCategory = selectedCategory;
        dispatch(updateCategory({ oldName: previousCategory, newName: trimmed }));
        setSelectedCategory(trimmed);
        if (dishCategory === previousCategory) setDishCategory(trimmed);
        setCategoryDraft('');
        enqueueSnackbar('Category updated.', { variant: 'success' });
    };

    const removeSelectedCategory = () => {
        if (!selectedCategory) return enqueueSnackbar('No category selected.', { variant: 'warning' });
        const categoryToRemove = selectedCategory;
        dispatch(removeCategory(categoryToRemove));
        if (dishCategory === categoryToRemove) {
            const remaining = categories.filter((c) => c !== categoryToRemove);
            setDishCategory(remaining.length > 0 ? remaining[0] : '');
        }
        setEditingDishId(null);
        enqueueSnackbar('Category deleted with its dishes.', { variant: 'info' });
    };

    const addDish = () => {
        const trimmedName = dishName.trim();
        const numericPrice = Number(dishPrice);
        if (!trimmedName || !dishCategory || Number.isNaN(numericPrice) || numericPrice <= 0)
            return enqueueSnackbar('Enter dish name, valid price, and category.', { variant: 'warning' });
        
        dispatch(addReduxDish({ id: Date.now(), name: trimmedName, price: numericPrice, category: dishCategory }));
        setDishName('');
        setDishPrice('');
        enqueueSnackbar('Dish added.', { variant: 'success' });
    };

    const removeDish = (dishId) => {
        dispatch(removeReduxDish(dishId));
        if (editingDishId === dishId) {
            setEditingDishId(null);
            setDishEditName('');
            setDishEditPrice('');
        }
        enqueueSnackbar('Dish removed.', { variant: 'info' });
    };

    const startDishEdit = (dish) => {
        setEditingDishId(dish.id);
        setDishEditName(dish.name);
        setDishEditPrice(String(dish.price));
    };

    const cancelDishEdit = () => {
        setEditingDishId(null);
        setDishEditName('');
        setDishEditPrice('');
    };

    const saveDishEdit = (dishId) => {
        const trimmedName = dishEditName.trim();
        const numericPrice = Number(dishEditPrice);
        if (!trimmedName || Number.isNaN(numericPrice) || numericPrice <= 0)
            return enqueueSnackbar('Dish name and valid price are required.', { variant: 'warning' });
        
        const dish = dishes.find(d => d.id === dishId);
        dispatch(updateDish({ id: dishId, name: trimmedName, price: numericPrice, category: selectedCategory || dish.category }));
        enqueueSnackbar('Dish updated.', { variant: 'success' });
        cancelDishEdit();
    };

    const saveSettings = async () => {
        if (!restaurantName.trim()) return enqueueSnackbar('Restaurant name is required.', { variant: 'error' });
        
        const settingsToSave = {
            restaurantName,
            currency,
            taxPercent,
            serviceCharge,
            allowDiscounts,
            discountPercent,
            receiptFooter,
        };

        dispatch(updateSettings(settingsToSave));

        try {
            await saveSettingsApi({
                ...settingsToSave,
                categories: reduxCategories,
                dishes: dishes
            });
            enqueueSnackbar('Settings saved to database successfully.', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to save settings to database.', { variant: 'error' });
        }
    };

    return {
        // profile
        restaurantName, setRestaurantName, logoPreview, onLogoChange,
        // categories
        categories, selectedCategory: activeSelectedCategory, setSelectedCategory,
        categoryDraft, setCategoryDraft, newCategory, setNewCategory,
        addCategory, renameSelectedCategory, removeSelectedCategory,
        // dishes
        dishName, setDishName, dishPrice, setDishPrice,
        dishCategory, setDishCategory, dishes, addDish, removeDish,
        editingDishId, dishEditName, setDishEditName,
        dishEditPrice, setDishEditPrice,
        startDishEdit, cancelDishEdit, saveDishEdit,
        dishesInSelectedCategory,
        // pos settings
        currency, setCurrency, taxPercent, setTaxPercent,
        serviceCharge, setServiceCharge, allowDiscounts, setAllowDiscounts,
        discountPercent, setDiscountPercent, receiptFooter, setReceiptFooter,
        // misc
        stats, saveSettings,
    };
};