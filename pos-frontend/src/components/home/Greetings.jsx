import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {

    const userData = useSelector((state) => state.user);
    
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
        <div className="flex justify-between items-center px-8 mt-5">
            <div>
                <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Hello, {userData.name || 'Test User'}</h1>
                <p className="text-[#ababab] text-md">Give your best services for customers 😄</p>
            </div>
            <div>
                <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide w-[130px]">{formatTime(DateTime)}</h1>
                <p className="text-[#ababab] text-md">{formatDate(DateTime)}</p>
            </div>
        </div>
    )
}

export default Greetings;