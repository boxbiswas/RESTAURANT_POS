import React from "react";
import { useState, useEffect } from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { names } from "../../constants";

const OrderList = () => {

    return (
        <>
            {names.map((name) => {
                return (
                    <div key={name.id} className="bg-[#1f1f1f] rounded-[15px] px-3 py-3">
                        <div className="flex items-center gap-5 py-2 w-full">
                            <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg"><BsPeopleFill /></button>
                            <div className="flex items-center justify-between w-full flex-1">
                                <div className="flex flex-col items-start gap-1">
                                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">{name.name}</h1>
                                    <p className="text-[#ababab] text-sm">{name.numberOfItems} items</p>
                                </div>

                                <div className="flex flex-col items-end py-2">
                                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide px-2 py-1 rounded-lg" style={{ backgroundColor: name.color }}>{name.progress}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export default OrderList;