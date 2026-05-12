import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import BottomNav from '../components/shared/bottomNav';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsStats from '../components/settings/SettingsStats';
import RestaurantProfileSection from '../components/settings/RestaurantProfileSection';
import EditCategorySection from '../components/settings/EditCategorySection';
import AddDishesSection from '../components/settings/AddDishesSection';
import AdditionalSettingsSection from '../components/settings/AdditionalSettingsSection';

const Settings = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [restaurantName, setRestaurantName] = useState('Restro Cafe');
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState(['Starter', 'Main Course', 'Beverages']);
    const [selectedCategory, setSelectedCategory] = useState('Starter');
    const [categoryDraft, setCategoryDraft] = useState('');

    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [dishCategory, setDishCategory] = useState('Starter');
    const [dishes, setDishes] = useState([
        { id: 1, name: 'Paneer Tikka', price: 220, category: 'Starter' },
        { id: 2, name: 'Cold Coffee', price: 140, category: 'Beverages' },
    ]);

    const [editingDishId, setEditingDishId] = useState(null);
    const [dishEditName, setDishEditName] = useState('');
    const [dishEditPrice, setDishEditPrice] = useState('');

    const [currency, setCurrency] = useState('INR');
    const [taxPercent, setTaxPercent] = useState('5');
    const [serviceCharge, setServiceCharge] = useState('0');
    const [autoPrintReceipt, setAutoPrintReceipt] = useState(true);
    const [allowDiscounts, setAllowDiscounts] = useState(true);
    const [receiptFooter, setReceiptFooter] = useState('Thank you for dining with us. Visit again!');

    const stats = useMemo(() => {
        return {
            categoryCount: categories.length,
            dishCount: dishes.length,
        };
    }, [categories, dishes]);

    const dishesInSelectedCategory = useMemo(() => {
        if (!selectedCategory) return [];
        return dishes.filter((dish) => dish.category === selectedCategory);
    }, [dishes, selectedCategory]);

    useEffect(() => {
        if (categories.length === 0) {
            setSelectedCategory('');
            setCategoryDraft('');
            return;
        }

        if (!selectedCategory || !categories.includes(selectedCategory)) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, selectedCategory]);

    const onLogoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLogoFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result?.toString() || '');
        };
        reader.readAsDataURL(file);

        enqueueSnackbar('Logo selected. Save settings to apply.', { variant: 'info' });
    };

    const addCategory = () => {
        const trimmed = newCategory.trim();
        if (!trimmed) {
            enqueueSnackbar('Category name is required.', { variant: 'warning' });
            return;
        }

        const exists = categories.some((category) => category.toLowerCase() === trimmed.toLowerCase());
        if (exists) {
            enqueueSnackbar('This category already exists.', { variant: 'warning' });
            return;
        }

        const updated = [...categories, trimmed];
        setCategories(updated);
        setNewCategory('');

        if (!selectedCategory) {
            setSelectedCategory(trimmed);
        }
        if (!dishCategory) {
            setDishCategory(trimmed);
        }

        enqueueSnackbar('Category added.', { variant: 'success' });
    };

    const renameSelectedCategory = () => {
        if (!selectedCategory) {
            enqueueSnackbar('Select a category first.', { variant: 'warning' });
            return;
        }

        const trimmed = categoryDraft.trim();
        if (!trimmed) {
            enqueueSnackbar('Category name cannot be empty.', { variant: 'warning' });
            return;
        }

        if (trimmed.toLowerCase() === selectedCategory.toLowerCase()) {
            enqueueSnackbar('Enter a new category name to rename.', { variant: 'warning' });
            return;
        }

        const exists = categories.some((category) => category.toLowerCase() === trimmed.toLowerCase() && category !== selectedCategory);
        if (exists) {
            enqueueSnackbar('A category with this name already exists.', { variant: 'warning' });
            return;
        }

        const previousCategory = selectedCategory;

        setCategories((prevCategories) => prevCategories.map((category) => (category === previousCategory ? trimmed : category)));
        setDishes((prevDishes) => prevDishes.map((dish) => (dish.category === previousCategory ? { ...dish, category: trimmed } : dish)));

        setSelectedCategory(trimmed);
        if (dishCategory === previousCategory) {
            setDishCategory(trimmed);
        }

        setCategoryDraft('');
        enqueueSnackbar('Category updated.', { variant: 'success' });
    };

    const removeSelectedCategory = () => {
        if (!selectedCategory) {
            enqueueSnackbar('No category selected.', { variant: 'warning' });
            return;
        }

        const categoryToRemove = selectedCategory;

        setCategories((prevCategories) => prevCategories.filter((category) => category !== categoryToRemove));
        setDishes((prevDishes) => prevDishes.filter((dish) => dish.category !== categoryToRemove));

        if (dishCategory === categoryToRemove) {
            const fallbackCategory = categories.find((category) => category !== categoryToRemove) || '';
            setDishCategory(fallbackCategory);
        }

        setEditingDishId(null);
        enqueueSnackbar('Category deleted with its dishes.', { variant: 'info' });
    };

    const addDish = () => {
        const trimmedName = dishName.trim();
        const numericPrice = Number(dishPrice);

        if (!trimmedName || !dishCategory || Number.isNaN(numericPrice) || numericPrice <= 0) {
            enqueueSnackbar('Enter dish name, valid price, and category.', { variant: 'warning' });
            return;
        }

        const newDish = {
            id: Date.now(),
            name: trimmedName,
            price: numericPrice,
            category: dishCategory,
        };

        setDishes((prevDishes) => [newDish, ...prevDishes]);
        setDishName('');
        setDishPrice('');

        enqueueSnackbar('Dish added.', { variant: 'success' });
    };

    const removeDish = (dishId) => {
        setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== dishId));
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

        if (!trimmedName || Number.isNaN(numericPrice) || numericPrice <= 0) {
            enqueueSnackbar('Dish name and valid price are required.', { variant: 'warning' });
            return;
        }

        setDishes((prevDishes) => prevDishes.map((dish) => (
            dish.id === dishId
                ? { ...dish, name: trimmedName, price: numericPrice, category: selectedCategory || dish.category }
                : dish
        )));

        enqueueSnackbar('Dish updated.', { variant: 'success' });
        cancelDishEdit();
    };

    const saveSettings = () => {
        if (!restaurantName.trim()) {
            enqueueSnackbar('Restaurant name is required.', { variant: 'error' });
            return;
        }

        const payload = {
            restaurantName,
            logo: logoFile?.name || null,
            categories,
            dishes,
            currency,
            taxPercent,
            serviceCharge,
            autoPrintReceipt,
            allowDiscounts,
            receiptFooter,
        };

        console.log('SETTINGS_PAYLOAD:', payload);
        enqueueSnackbar('Settings saved locally. Connect this to backend API next.', { variant: 'success' });
    };

    return (
        <section className='bg-[#1f1f1f] min-h-[calc(100vh-80px)] pb-24'>
            <div className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <SettingsHeader onSave={saveSettings} />

                <SettingsStats
                    categoryCount={stats.categoryCount}
                    dishCount={stats.dishCount}
                    currency={currency}
                />

                <div className='mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <RestaurantProfileSection
                        restaurantName={restaurantName}
                        setRestaurantName={setRestaurantName}
                        logoPreview={logoPreview}
                        onLogoChange={onLogoChange}
                    />

                    <EditCategorySection
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categoryDraft={categoryDraft}
                        setCategoryDraft={setCategoryDraft}
                        renameSelectedCategory={renameSelectedCategory}
                        newCategory={newCategory}
                        setNewCategory={setNewCategory}
                        addCategory={addCategory}
                        removeSelectedCategory={removeSelectedCategory}
                        dishesInSelectedCategory={dishesInSelectedCategory}
                        editingDishId={editingDishId}
                        dishEditName={dishEditName}
                        setDishEditName={setDishEditName}
                        dishEditPrice={dishEditPrice}
                        setDishEditPrice={setDishEditPrice}
                        saveDishEdit={saveDishEdit}
                        cancelDishEdit={cancelDishEdit}
                        startDishEdit={startDishEdit}
                        removeDish={removeDish}
                        currency={currency}
                    />

                    <AddDishesSection
                        dishName={dishName}
                        setDishName={setDishName}
                        dishPrice={dishPrice}
                        setDishPrice={setDishPrice}
                        dishCategory={dishCategory}
                        setDishCategory={setDishCategory}
                        categories={categories}
                        addDish={addDish}
                        dishes={dishes}
                        currency={currency}
                        removeDish={removeDish}
                    />

                    <AdditionalSettingsSection
                        currency={currency}
                        setCurrency={setCurrency}
                        taxPercent={taxPercent}
                        setTaxPercent={setTaxPercent}
                        serviceCharge={serviceCharge}
                        setServiceCharge={setServiceCharge}
                        autoPrintReceipt={autoPrintReceipt}
                        setAutoPrintReceipt={setAutoPrintReceipt}
                        allowDiscounts={allowDiscounts}
                        setAllowDiscounts={setAllowDiscounts}
                        receiptFooter={receiptFooter}
                        setReceiptFooter={setReceiptFooter}
                    />
                </div>
            </div>

            <BottomNav />
        </section>
    );
};

export default Settings;
