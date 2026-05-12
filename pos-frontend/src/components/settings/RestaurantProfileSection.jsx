import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { MdOutlineStorefront } from 'react-icons/md';

const RestaurantProfileSection = ({
    restaurantName,
    setRestaurantName,
    logoPreview,
    onLogoChange,
}) => {
    return (
        <div className='rounded-2xl border border-[#2f2f2f] bg-[#262626] p-5'>
            <div className='mb-4 flex items-center gap-2 text-white'>
                <MdOutlineStorefront size={22} className='text-[#f6b100]' />
                <h2 className='text-lg font-bold'>Restaurant Profile</h2>
            </div>

            <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Restaurant Name</label>
            <input
                type='text'
                value={restaurantName}
                onChange={(event) => setRestaurantName(event.target.value)}
                className='mb-4 w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                placeholder='Enter restaurant name'
            />

            <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Restaurant Logo</label>
            <label className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-[#4a4a4a] bg-[#1f1f1f] px-4 py-4 text-sm font-semibold text-[#dcdcdc] transition hover:border-[#f6b100]'>
                <FiUploadCloud size={18} className='text-[#f6b100]' />
                Upload Logo
                <input type='file' accept='image/*' onChange={onLogoChange} className='hidden' />
            </label>

            <div className='mt-4 rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] p-3'>
                <p className='mb-3 text-xs uppercase tracking-wide text-[#ababab]'>Preview</p>
                {logoPreview ? (
                    <img src={logoPreview} alt='Restaurant logo preview' className='h-24 w-24 rounded-lg object-cover' />
                ) : (
                    <div className='flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-[#4a4a4a] bg-[#2a2a2a] text-xs text-[#ababab]'>
                        No Logo
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantProfileSection;
