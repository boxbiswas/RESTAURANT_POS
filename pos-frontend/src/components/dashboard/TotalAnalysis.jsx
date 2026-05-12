import React from 'react';
import { Line } from 'react-chartjs-2';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { BsPeopleFill } from 'react-icons/bs';


const TotalAnalysis = ({ totalSales, totalOrders }) => {

    return (
        <>
            <h1 className='text-[#f5f5f5] text-3xl font-bold px-4 py-3 tracking-wide'>Overall Performance</h1>
            <div className="flex items-center mt-4 justify-between mx-4">
                <div className="flex items-center w-[45%] bg-[#1f1f1f] p-4 rounded-lg gap-4">
                    <button className="bg-[#02ca3a] p-3 rounded-lg text-[#f5f5f5] text-3xl">
                        <FaMoneyBillWave />
                    </button>
                    <div className="flex flex-col">
                        <h2 className="text-[#ababab] text-lg font-semibold tracking-wide">Total Sales</h2>
                        <h1 className="text-[#f5f5f5] text-2xl font-bold mt-1">₹{totalSales || 0}</h1>
                    </div>
                </div>
                <div className="flex items-center w-[45%] bg-[#1f1f1f] p-4 rounded-lg gap-4">
                    <button className="bg-[#f6b100] p-3 rounded-lg text-[#f5f5f5] text-3xl">
                        <BsPeopleFill />
                    </button>
                    <div className="flex flex-col">
                        <h2 className="text-[#ababab] text-lg font-semibold tracking-wide">Total Orders</h2>
                        <h1 className="text-[#f5f5f5] text-2xl font-bold mt-1">{totalOrders || 0}</h1>
                    </div>
                </div>
        </div>
        </>
    );
};

export default TotalAnalysis;