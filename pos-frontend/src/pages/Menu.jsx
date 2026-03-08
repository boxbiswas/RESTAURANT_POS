import React from "react";
import BottomNav from "../components/shared/bottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

const Menu = () => {

    //const [DateTime, setDateTime] = useState(new Date());

    return (
        <section className=' bg-[#1f1f1f] h-[calc(100vh-80px)] overflow-hidden flex gap-2'>
            {/*Left Div*/}
            <div className='flex-3'>
                <div className='flex items-center justify-between px-10 py-4 mt-2'>
                    <div className='flex items-center gap-4'>
                        <BackButton />
                        <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Menu</h1>
                    </div>

                    <div className='flex items-center justify-around gap-4'>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-md text-[#f5f5f5] font-semibold">LEON KENNEDY</h1>
                                <p className="text-xs text-[#ababab] font-medium">PHONE NO: +91 2345679876</p>
                            </div>
                        </div>
                    </div>
                </div>
                <MenuContainer />
            </div>

            {/*Right Div*/}
            <div className='flex-1 bg-[#1a1a1a] mt-4 mr-3 h-[645px] rounded-lg pt-2 pb-4 flex flex-col'>
                {/*CUSTOMER Info*/}
                <CustomerInfo />
                <hr className="m-auto border-[#2a2a2a] border-t-2 w-[95%]" />

                {/*Cart Items*/}
                <CartInfo />
                <hr className="m-auto border-[#2a2a2a] border-t-2 w-[95%]" />

                {/*Bills*/}
                <Bill />
            </div>

            <BottomNav />
        </section>
    );
};

export default Menu;