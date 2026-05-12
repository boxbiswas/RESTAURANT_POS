import React from 'react';

const AdditionalSettingsSection = ({
    currency,
    setCurrency,
    taxPercent,
    setTaxPercent,
    serviceCharge,
    setServiceCharge,
    autoPrintReceipt,
    setAutoPrintReceipt,
    allowDiscounts,
    setAllowDiscounts,
    receiptFooter,
    setReceiptFooter,
}) => {
    return (
        <div className='rounded-2xl border border-[#2f2f2f] bg-[#262626] p-5 lg:col-span-2'>
            <h2 className='mb-4 text-lg font-bold text-white'>Additional POS Settings</h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div>
                    <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Currency</label>
                    <select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className='w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                    >
                        <option value='INR'>INR</option>
                        <option value='USD'>USD</option>
                        <option value='EUR'>EUR</option>
                    </select>
                </div>

                <div>
                    <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Tax (%)</label>
                    <input
                        type='number'
                        min='0'
                        value={taxPercent}
                        onChange={(event) => setTaxPercent(event.target.value)}
                        className='w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                    />
                </div>

                <div>
                    <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Service Charge (%)</label>
                    <input
                        type='number'
                        min='0'
                        value={serviceCharge}
                        onChange={(event) => setServiceCharge(event.target.value)}
                        className='w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                    />
                </div>
            </div>

            <div className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-2'>
                <label className='flex items-center justify-between rounded-lg border border-[#343434] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#e9e9e9]'>
                    Auto-print receipt
                    <input
                        type='checkbox'
                        checked={autoPrintReceipt}
                        onChange={(event) => setAutoPrintReceipt(event.target.checked)}
                        className='h-4 w-4 accent-[#f6b100]'
                    />
                </label>

                <label className='flex items-center justify-between rounded-lg border border-[#343434] bg-[#1f1f1f] px-3 py-2.5 text-sm text-[#e9e9e9]'>
                    Allow order discounts
                    <input
                        type='checkbox'
                        checked={allowDiscounts}
                        onChange={(event) => setAllowDiscounts(event.target.checked)}
                        className='h-4 w-4 accent-[#f6b100]'
                    />
                </label>
            </div>

            <div className='mt-4'>
                <label className='mb-2 block text-sm font-semibold text-[#d6d6d6]'>Receipt Footer Message</label>
                <textarea
                    value={receiptFooter}
                    onChange={(event) => setReceiptFooter(event.target.value)}
                    rows={3}
                    className='w-full rounded-lg border border-[#3b3b3b] bg-[#1f1f1f] px-3 py-2.5 text-white outline-none transition focus:border-[#f6b100]'
                    placeholder='Thank you message for customers...'
                />
            </div>
        </div>
    );
};

export default AdditionalSettingsSection;
