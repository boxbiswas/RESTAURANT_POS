import React from "react";
import { useState, useEffect } from "react";
import OrderList from "./OrderList";
import { FaSearch } from "react-icons/fa";

const RecentOrders = () => {

    return (
        <div className="pr-6 mt-6">
            <div className="bg-[#1a1a1a] w-full rounded-lg py-5 h-[750px]">

                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Recent Orders</h1>
                    <a href="#" className="text-[#025cca] text-md font-semibold">View All</a>
                </div>

                <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 mb-3">
                    <FaSearch className="text-[#f5f5f5]" />
                    <input
                        type="text"
                        placeholder="Search Recent Orders"
                        className="bg-[#1f1f1f] outline-none text-[#f5f5f5] px-2 py-1 rounded-md"
                    />
                </div>

                <div className="overflow-y-scroll h-[570px] scrollbar-hide px-6 flex flex-col gap-4 pb-4">
                    <OrderList />
                </div>
            </div>
        </div>
    )
}

export default RecentOrders;