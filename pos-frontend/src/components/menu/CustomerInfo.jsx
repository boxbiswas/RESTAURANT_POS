import React from "react";
import { useState, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const CustomerInfo = () => {
    const [DateTime, setDateTime] = useState(new Date());

    const customerData = useSelector((state) => state.customer);
    const customerName = customerData?.customerName || "Walk-in Customer";
    const customerPhone = customerData?.customerPhone || "N/A";
    const customerInitials = customerName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "CN";

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    return (
        <div className="px-4 py-4">
            <div className="bg-[#111] rounded-[14px] p-4 border border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                    <div className="bg-[#f6b100] rounded-[10px] w-12 h-12 flex items-center justify-center text-[#1a1a1a] font-extrabold text-lg flex-shrink-0">
                        {customerInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-[#f5f5f5] font-bold text-sm tracking-wide truncate">{customerName}</h1>
                        <div className="flex items-center gap-1 mt-1">
                            <FaPhoneAlt className="text-[#ababab] text-[10px]" />
                            <p className="text-[#ababab] text-xs">{customerPhone}</p>
                        </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-[#f6b100] text-xs font-bold">{formatDate(DateTime)}</p>
                        <p className="text-[#555] text-xs mt-0.5">{formatTime(DateTime)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
