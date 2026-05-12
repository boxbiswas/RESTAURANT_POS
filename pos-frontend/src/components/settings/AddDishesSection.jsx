import React from 'react';
import { BiDish } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

const AddDishesSection = ({
    dishName,
    setDishName,
    dishPrice,
    setDishPrice,
    dishCategory,
    setDishCategory,
    categories,
    addDish,
    dishes,
    currency,
    removeDish,
}) => {
    return (
        <div className='rounded-2xl border border-[#2f2f2f] bg-[#262626] p-5 lg:col-span-2'>
            <div className='mb-4 flex items-center gap-2 text-white'>
                <BiDish size={22} className='text-[#f6b100]' />
                <h2 className='text-lg font-bold'>Add Dishes</h2>
            </div>

            <div className='grid grid-cols-1 gap-3 md:grid-cols-4'>
                <input
                    type='text'
                    value={dishName}
                    onChange={(event) => setDishName(event.target.value)}
                    placeholder='Dish name'
                    className='rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                />
                <input
                    type='number'
                    value={dishPrice}
                    onChange={(event) => setDishPrice(event.target.value)}
                    placeholder='Price'
                    className='rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                />
                <select
                    value={dishCategory}
                    onChange={(event) => setDishCategory(event.target.value)}
                    className='rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                >
                    {categories.length === 0 ? (
                        <option value=''>No categories available</option>
                    ) : (
                        categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))
                    )}
                </select>
                <button
                    type='button'
                    onClick={addDish}
                    className='rounded-lg bg-[#f6b100] px-4 py-2.5 text-sm font-bold text-[#1f1f1f] transition hover:bg-[#ffd24d]'
                >
                    Add Dish
                </button>
            </div>

            <div className='mt-4 overflow-x-auto no-scrollbar rounded-lg border border-[#343434]'>
                <table className='min-w-full text-sm'>
                    <thead className='bg-[#1f1f1f] text-left text-[#cfcfcf]'>
                        <tr>
                            <th className='px-3 py-2'>Dish</th>
                            <th className='px-3 py-2'>Category</th>
                            <th className='px-3 py-2'>Price</th>
                            <th className='px-3 py-2 text-right'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-[#262626]'>
                        {dishes.length === 0 ? (
                            <tr>
                                <td colSpan={4} className='px-3 py-4 text-center text-[#a8a8a8]'>No dishes added yet.</td>
                            </tr>
                        ) : (
                            dishes.map((dish) => (
                                <tr key={dish.id} className='border-t border-[#343434] text-[#efefef]'>
                                    <td className='px-3 py-2'>{dish.name}</td>
                                    <td className='px-3 py-2'>{dish.category}</td>
                                    <td className='px-3 py-2'>{currency} {dish.price}</td>
                                    <td className='px-3 py-2 text-right'>
                                        <button
                                            type='button'
                                            onClick={() => removeDish(dish.id)}
                                            className='rounded-md bg-[#382b2b] p-1.5 text-[#ff9b9b] transition hover:bg-[#4a3333]'
                                            aria-label={`Remove ${dish.name}`}
                                        >
                                            <MdDeleteOutline size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddDishesSection;
