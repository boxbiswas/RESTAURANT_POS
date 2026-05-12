import React, { useState } from "react";
import OrderList from "./OrderList";
import { FaSearch } from "react-icons/fa";

const RecentOrders = ({ orders }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = (orders || []).filter((order) => {
        const customerName = order.customerDetails?.name || "";
        return customerName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="w-full flex-1 flex flex-col min-h-0">
            <div className="flex flex-1 flex-col rounded-[18px] border border-[#2a2a2a] bg-[#1a1a1a] shadow-lg overflow-hidden mt-5">
                <div className="flex items-center justify-between px-6 py-5 flex-shrink-0">
                    <div>
                        <p className="text-[#f6b100] text-xs font-bold uppercase tracking-[0.25em]">Activity</p>
                        <h1 className="mt-1 text-[#f5f5f5] text-2xl font-semibold tracking-wide">Recent Orders</h1>
                    </div>
                    <a href="/orders" className="text-[#025cca] text-sm font-semibold hover:underline">View All</a>
                </div>
                <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[16px] px-5 py-3 mx-6 mb-4 border border-[#2a2a2a] flex-shrink-0">
                    <FaSearch className="text-[#f5f5f5]" />
                    <input
                        type="text"
                        placeholder="Search Recent Orders"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#1f1f1f] flex-1 outline-none text-[#f5f5f5] px-2 py-1 rounded-md"
                    />
                </div>
                <div className="overflow-y-auto scrollbar-hide px-6 flex flex-col gap-4 pb-4 flex-1 min-h-0">
                    <OrderList orders={filteredOrders} />
                </div>
            </div>
        </div>
    )
}

export default RecentOrders;
