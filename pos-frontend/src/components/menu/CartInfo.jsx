import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";

const CartInfo = () => {
    return (
        <div className="px-4 py-2">
            <h1 className="text-[#ababab] text-lg font-semibold tracking-wide">Order Details</h1>
            <div className="mt-4 overflow-y-scroll scrollbar-hide h-[220px]">
                <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[#ababab] font-semibold">Chicken Tikka Masala</h1>
                        <p className="text-[#ababab] font-semibold">xl</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center justify-between gap-3">
                            <RiDeleteBin2Fill className="text-[#ababab] cursor-pointer" size={20} />
                            <FaNotesMedical className="text-[#ababab] cursor-pointer" size={20} />
                        </div>
                        <p className="text-[#f5f5f5] text-md font-bold">₹280</p>
                    </div>
                </div>

                <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[#ababab] font-semibold">Garlic Naan</h1>
                        <p className="text-[#ababab] font-semibold">x2</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center justify-between gap-3">
                            <RiDeleteBin2Fill className="text-[#ababab] cursor-pointer" size={20} />
                            <FaNotesMedical className="text-[#ababab] cursor-pointer" size={20} />
                        </div>
                        <p className="text-[#f5f5f5] text-md font-bold">₹80</p>
                    </div>
                </div>

                {/* <div className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[#ababab] font-semibold">Chicken Tikka</h1>
                        <p className="text-[#ababab] font-semibold">xl</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center justify-between gap-3">
                            <RiDeleteBin2Fill className="text-[#ababab] cursor-pointer" size={20}/>
                            <FaNotesMedical className="text-[#ababab] cursor-pointer" size={20}/>
                        </div>
                        <p className="text-[#f5f5f5] text-md font-bold">₹10.00</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default CartInfo;
