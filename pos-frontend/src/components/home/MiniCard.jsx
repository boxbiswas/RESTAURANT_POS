import React from "react";
import { useState, useEffect } from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {

    return (
        <div className="bg-[#1a1a1a] py-4 px-4 rounded-lg w-[50%]">
            <div className="flex items-start justify-between ">
                <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">{title}</h1>
                <button className={`${title === "Total Sales" ? "bg-[#02ca3a]" : "bg-[#f6b100]"} p-2 rounded-lg text-[#f5f5f5] text-2xl`}>{icon}</button>
            </div>
            <div>
                <h1 className="text-[#f5f5f5] text-3xl font-bold mt-2">{title == "Total Sales" ?`₹${number}` : number}</h1>
                <h1 className="text-[#f5f5f5] text-sm mt-2"><span className="text-[#02ca3a]">{footerNum}%</span> than yesterday</h1>
            </div>
        </div>
    )
}

export default MiniCard;