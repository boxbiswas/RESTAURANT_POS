import React from 'react';
import { FiSave } from 'react-icons/fi';

const SettingsHeader = ({ onSave }) => {
    return (
        <div className='rounded-2xl border border-[#2f2f2f] bg-linear-to-r from-[#1f1f1f] via-[#262626] to-[#1f1f1f] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'>
            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div>
                    <p className='text-xs uppercase tracking-[0.25em] text-[#f6b100]'>Restaurant Configuration</p>
                    <h1 className='mt-1 text-2xl font-extrabold text-white sm:text-3xl'>Settings</h1>
                    <p className='mt-1 text-sm text-[#b9b9b9]'>Manage restaurant name, logo, categories, dishes, and POS behavior.</p>
                </div>

                <button
                    type='button'
                    onClick={onSave}
                    className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#f6b100] px-5 py-2.5 text-sm font-bold text-[#1f1f1f] transition hover:bg-[#ffd24d]'
                >
                    <FiSave size={18} />
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default SettingsHeader;
