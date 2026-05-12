import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeCartItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);

    return (
        <div className="px-4 py-2">
            <h1 className="text-[#ababab] text-lg font-semibold tracking-wide">Order Details</h1>
            <div className="mt-4 overflow-y-scroll scrollbar-hide h-[220px]">
                {cartItems.length === 0 && (
                    <p className="text-[#7f7f7f] text-sm">No items in cart yet. Select quantity and tap cart icon.</p>
                )}

                {cartItems.map((item) => {
                    const lineTotal = Number(item.price || 0) * Number(item.quantity || 0);

                    return (
                        <div key={item.cartId} className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
                            <div className="flex items-center justify-between">
                                <h1 className="text-[#ababab] font-semibold">{item.name}</h1>
                                <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center justify-between gap-3">
                                    <RiDeleteBin2Fill
                                        className="text-[#ababab] cursor-pointer"
                                        size={20}
                                        onClick={() => dispatch(removeCartItem(item.cartId))}
                                    />
                                    {/* <FaNotesMedical className="text-[#ababab] cursor-pointer" size={20} /> */}
                                </div>
                                <p className="text-[#f5f5f5] text-md font-bold">₹{lineTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CartInfo;
