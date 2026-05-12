import React from 'react';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';

const EditCategorySection = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    categoryDraft,
    setCategoryDraft,
    renameSelectedCategory,
    newCategory,
    setNewCategory,
    addCategory,
    removeSelectedCategory,
    dishesInSelectedCategory,
    editingDishId,
    dishEditName,
    setDishEditName,
    dishEditPrice,
    setDishEditPrice,
    saveDishEdit,
    cancelDishEdit,
    startDishEdit,
    removeDish,
    currency,
}) => {
    return (
        <div className='rounded-2xl border border-[#2f2f2f] bg-[#262626] p-5'>
            <div className='mb-4 flex items-center gap-2 text-white'>
                <TbCategoryPlus size={22} className='text-[#f6b100]' />
                <h2 className='text-lg font-bold'>Edit Category</h2>
            </div>

            <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Select Category</label>
            <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className='mb-3 w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
            >
                <option value=''>--SELECT--</option>
                {categories.length === 0 ? (
                    <option value='' disabled>No categories available</option>
                ) : (
                    categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))
                )}
            </select>

            <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Rename Selected Category</label>
            <div className='mb-3 flex flex-col gap-3 sm:flex-row'>
                <input
                    type='text'
                    value={categoryDraft}
                    onChange={(event) => setCategoryDraft(event.target.value)}
                    placeholder='Rename category'
                    className='w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                />
                <button
                    type='button'
                    onClick={renameSelectedCategory}
                    className='rounded-lg bg-[#f6b100] px-4 py-2.5 text-sm font-bold text-[#1f1f1f] transition hover:bg-[#ffd24d]'
                >
                    Update
                </button>
            </div>

            <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Add New Category</label>
            <div className='mb-3 flex flex-col gap-3 sm:flex-row'>
                <input
                    type='text'
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    placeholder='e.g. Desserts'
                    className='w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                />
                <button
                    type='button'
                    onClick={addCategory}
                    className='rounded-lg bg-[#f6b100] px-4 py-2.5 text-sm font-bold text-[#1f1f1f] transition hover:bg-[#ffd24d]'
                >
                    Add
                </button>
            </div>

            <button
                type='button'
                onClick={removeSelectedCategory}
                disabled={!selectedCategory}
                className='rounded-lg bg-[#3a2b2b] px-4 py-2.5 text-sm font-bold text-[#ffb8b8] transition hover:bg-[#4a3333] disabled:cursor-not-allowed disabled:opacity-60'
            >
                Delete Selected Category
            </button>

            <div className='mt-4 rounded-lg border border-[#343434] bg-[#1f1f1f] p-3'>
                <div className='mb-2 flex items-center gap-2 text-sm font-semibold text-[#ededed]'>
                    <MdModeEditOutline size={17} className='text-[#f6b100]' />
                    Dishes In Selected Category
                </div>

                {dishesInSelectedCategory.length === 0 ? (
                    <p className='text-sm text-[#ababab]'>No dishes in this category.</p>
                ) : (
                    <div className='max-h-52 space-y-2 overflow-y-auto no-scrollbar pr-1'>
                        {dishesInSelectedCategory.map((dish) => (
                            <div key={dish.id} className='rounded-lg border border-[#303030] bg-[#262626] p-2.5'>
                                {editingDishId === dish.id ? (
                                    <>
                                        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                                            <input
                                                type='text'
                                                value={dishEditName}
                                                onChange={(event) => setDishEditName(event.target.value)}
                                                className='rounded-md border border-[#3a3a3a] bg-[#1f1f1f] px-2.5 py-2 text-sm text-white outline-none focus:border-[#f6b100]'
                                            />
                                            <input
                                                type='number'
                                                value={dishEditPrice}
                                                onChange={(event) => setDishEditPrice(event.target.value)}
                                                className='rounded-md border border-[#3a3a3a] bg-[#1f1f1f] px-2.5 py-2 text-sm text-white outline-none focus:border-[#f6b100]'
                                            />
                                        </div>
                                        <div className='mt-2 flex gap-2'>
                                            <button
                                                type='button'
                                                onClick={() => saveDishEdit(dish.id)}
                                                className='rounded-md bg-[#f6b100] px-3 py-1.5 text-xs font-bold text-[#1f1f1f]'
                                            >
                                                Save
                                            </button>
                                            <button
                                                type='button'
                                                onClick={cancelDishEdit}
                                                className='rounded-md bg-[#343434] px-3 py-1.5 text-xs font-bold text-[#ebebeb]'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className='flex items-center justify-between gap-2'>
                                        <div>
                                            <p className='text-sm font-semibold text-[#f0f0f0]'>{dish.name}</p>
                                            <p className='text-xs text-[#b6b6b6]'>{currency} {dish.price}</p>
                                        </div>
                                        <div className='flex gap-1'>
                                            <button
                                                type='button'
                                                onClick={() => startDishEdit(dish)}
                                                className='rounded-md bg-[#2f3a2f] p-1.5 text-[#9bd8a2] transition hover:bg-[#3a4a3a]'
                                                aria-label={`Edit ${dish.name}`}
                                            >
                                                <MdModeEditOutline size={14} />
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => removeDish(dish.id)}
                                                className='rounded-md bg-[#382b2b] p-1.5 text-[#ff9b9b] transition hover:bg-[#4a3333]'
                                                aria-label={`Remove ${dish.name}`}
                                            >
                                                <MdDeleteOutline size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditCategorySection;
