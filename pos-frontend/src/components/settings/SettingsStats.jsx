import React from 'react';

const SettingsStats = ({ categoryCount, dishCount, currency }) => {
    return (
        <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <div className='rounded-xl border border-[#2f2f2f] bg-[#262626] p-4'>
                <p className='text-xs uppercase tracking-wide text-[#ababab]'>Categories</p>
                <p className='mt-1 text-2xl font-extrabold text-white'>{categoryCount}</p>
            </div>
            <div className='rounded-xl border border-[#2f2f2f] bg-[#262626] p-4'>
                <p className='text-xs uppercase tracking-wide text-[#ababab]'>Dishes</p>
                <p className='mt-1 text-2xl font-extrabold text-white'>{dishCount}</p>
            </div>
            <div className='rounded-xl border border-[#2f2f2f] bg-[#262626] p-4'>
                <p className='text-xs uppercase tracking-wide text-[#ababab]'>Currency</p>
                <p className='mt-1 text-2xl font-extrabold text-white'>{currency}</p>
            </div>
        </div>
    );
};

export default SettingsStats;
