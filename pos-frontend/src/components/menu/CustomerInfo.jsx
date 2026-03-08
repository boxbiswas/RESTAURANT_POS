import React from "react";
import { useState, useEffect } from "react";

const CustomerInfo = () => {

    const [DateTime, setDateTime] = useState(new Date());
    
        useEffect(() => {
            const timer = setInterval(() => setDateTime(new Date()), 1000);
            return () => clearInterval(timer);
        }, []);
    
        const formatDate = (date) => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
        }
    
        const formatTime = (date) =>
            `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    

    return (
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">LEON KENNEDY</h1>
                <p className="text-sm text-[#ababab] font-medium mt-1">PHONE NO: +91 2345679876</p>
                <p className="text-sm text-[#ababab] font-medium mt-1">{formatDate(DateTime)}</p>
            </div>
            <button className="bg-[#f6b100] text-xl font-bold rounded-lg p-3">CN</button>                   
        </div>
    );
};

export default CustomerInfo;
