import React from 'react';
import BottomNav from '../components/shared/bottomNav';
import SettingsHeader from '../components/settings/SettingsHeader';
import SettingsStats from '../components/settings/SettingsStats';
import RestaurantProfileSection from '../components/settings/RestaurantProfileSection';
import EditCategorySection from '../components/settings/EditCategorySection';
import AddDishesSection from '../components/settings/AddDishesSection';
import AdditionalSettingsSection from '../components/settings/AdditionalSettingsSection';
import { useSettingsState } from '../hooks/useSettingsState';
import { useSelector } from 'react-redux';
import { MdLock } from 'react-icons/md';

const Settings = () => {
    const s = useSettingsState();
    const user = useSelector((state) => state.user);

    if (user.role !== 'admin') {
        return (
            <section className='bg-[#1f1f1f] h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide pb-24 flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center text-[#ababab] text-center px-4'>
                    <MdLock size={80} className='mb-4 text-[#f6b100]' />
                    <h1 className='text-2xl font-bold text-[#f5f5f5] mb-2'>Access Denied</h1>
                    <p className='text-sm'>Only administrators can view and modify settings.</p>
                </div>
                <BottomNav />
            </section>
        );
    }

    return (
        <section className='bg-[#1f1f1f] h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide pb-24'>
            <div className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                <SettingsHeader onSave={s.saveSettings} />

                <SettingsStats
                    categoryCount={s.stats.categoryCount}
                    dishCount={s.stats.dishCount}
                    currency={s.currency}
                />

                <div className='mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <RestaurantProfileSection
                        restaurantName={s.restaurantName}
                        setRestaurantName={s.setRestaurantName}
                        logoPreview={s.logoPreview}
                        onLogoChange={s.onLogoChange}
                    />

                    <EditCategorySection
                        categories={s.categories}
                        selectedCategory={s.selectedCategory}
                        setSelectedCategory={s.setSelectedCategory}
                        categoryDraft={s.categoryDraft}
                        setCategoryDraft={s.setCategoryDraft}
                        renameSelectedCategory={s.renameSelectedCategory}
                        newCategory={s.newCategory}
                        setNewCategory={s.setNewCategory}
                        addCategory={s.addCategory}
                        removeSelectedCategory={s.removeSelectedCategory}
                        dishesInSelectedCategory={s.dishesInSelectedCategory}
                        editingDishId={s.editingDishId}
                        dishEditName={s.dishEditName}
                        setDishEditName={s.setDishEditName}
                        dishEditPrice={s.dishEditPrice}
                        setDishEditPrice={s.setDishEditPrice}
                        saveDishEdit={s.saveDishEdit}
                        cancelDishEdit={s.cancelDishEdit}
                        startDishEdit={s.startDishEdit}
                        removeDish={s.removeDish}
                        currency={s.currency}
                    />

                    <AddDishesSection
                        dishName={s.dishName}
                        setDishName={s.setDishName}
                        dishPrice={s.dishPrice}
                        setDishPrice={s.setDishPrice}
                        dishCategory={s.dishCategory}
                        setDishCategory={s.setDishCategory}
                        categories={s.categories}
                        addDish={s.addDish}
                        dishes={s.dishes}
                        currency={s.currency}
                        removeDish={s.removeDish}
                    />

                    <AdditionalSettingsSection
                        currency={s.currency}
                        setCurrency={s.setCurrency}
                        taxPercent={s.taxPercent}
                        setTaxPercent={s.setTaxPercent}
                        serviceCharge={s.serviceCharge}
                        setServiceCharge={s.setServiceCharge}
                        allowDiscounts={s.allowDiscounts}
                        setAllowDiscounts={s.setAllowDiscounts}
                        discountPercent={s.discountPercent}
                        setDiscountPercent={s.setDiscountPercent}
                        receiptFooter={s.receiptFooter}
                        setReceiptFooter={s.setReceiptFooter}
                    />
                </div>
            </div>

            <BottomNav />
        </section>
    );
};

export default Settings;