import React from "react";
import BottomNav from "../components/shared/bottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector } from "react-redux";

const Menu = () => {
    const customerData = useSelector((state) => state.customer);
    const customerName = customerData?.customerName || "Walk-in Customer";
    const customerPhone = customerData?.customerPhone || "N/A";

    return (
        <section className="bg-[#1f1f1f] h-[calc(100vh-80px)] flex flex-col overflow-hidden">
            {/* Main content area above bottom nav */}
            <div className="flex flex-1 gap-3 px-3 pt-2 pb-[88px] min-h-0">

                {/* Left — Menu Categories + Items */}
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* Top Header Bar */}
                    <div className="flex items-center justify-between px-7 py-4 flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <BackButton />
                            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Menu</h1>
                        </div>

                        <div className="flex items-center gap-3 bg-[#1a1a1a] px-4 py-3 rounded-[12px] border border-[#2a2a2a] cursor-pointer hover:border-[#3a3a3a] transition-colors">
                            <MdRestaurantMenu className="text-[#f6b100] text-xl" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-sm text-[#f5f5f5] font-semibold leading-tight">{customerName}</h1>
                                <p className="text-xs text-[#ababab]">{customerPhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu area */}
                    <div className="flex-1 min-h-0 flex flex-col">
                        <MenuContainer />
                    </div>
                </div>

                {/* Right — Cart Panel */}
                <div className="w-[300px] lg:w-[350px] xl:w-[390px] flex-shrink-0 bg-[#1a1a1a] rounded-[18px] flex flex-col min-h-0 border border-[#2a2a2a] shadow-xl overflow-hidden mt-2 mb-2">
                    {/* Customer Info */}
                    <CustomerInfo />
                    <hr className="border-[#2a2a2a] flex-shrink-0" />

                    {/* Cart Items — scrollable */}
                    <CartInfo />
                    <hr className="border-[#2a2a2a] flex-shrink-0" />

                    {/* Bill — always visible at bottom */}
                    <div className="flex-shrink-0">
                        <Bill />
                    </div>
                </div>
            </div>

            <BottomNav />
        </section>
    );
};

export default Menu;