import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeCartItem } from "../../redux/slices/cartSlice";

const CartInfo = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);
    const settings = useSelector((state) => state.settings);
    const currency = settings.currency || "INR";
    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "₹";

    return (
        <div className="flex-1 flex flex-col min-h-0 px-4 py-3">
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-[#f5f5f5] text-sm font-bold uppercase tracking-widest">Order Details</h1>
                {cartItems.length > 0 && (
                    <span className="bg-[#f6b100] text-[#1a1a1a] text-xs font-bold px-2 py-0.5 rounded-full">
                        {cartItems.reduce((sum, i) => sum + i.quantity, 0)} items
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 flex flex-col gap-2">
                {cartItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="text-4xl mb-3">🛒</div>
                        <p className="text-[#555] text-sm font-medium">Your cart is empty</p>
                        <p className="text-[#444] text-xs mt-1">Select items from the menu to begin</p>
                    </div>
                )}

                {cartItems.map((item) => {
                    const lineTotal = Number(item.price || 0) * Number(item.quantity || 0);
                    return (
                        <div key={item.cartId} className="bg-[#111] rounded-[12px] px-3 py-3 border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-[#f5f5f5] text-sm font-semibold truncate">{item.name}</h1>
                                    <p className="text-[#ababab] text-xs mt-0.5">x{item.quantity} × {currencySymbol}{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-[#f6b100] text-sm font-bold">{currencySymbol}{lineTotal.toFixed(0)}</span>
                                    <button
                                        onClick={() => dispatch(removeCartItem(item.cartId))}
                                        className="text-[#555] hover:text-red-400 transition-colors"
                                    >
                                        <RiDeleteBin2Fill size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CartInfo;
