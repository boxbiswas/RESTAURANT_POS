import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { CiCircleMore } from "react-icons/ci";
import { MdMenuBook } from "react-icons/md";
import Modal from "./Modal";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSettings, MdLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerDetails } from "../../redux/slices/customerSlice";

const BottomNav = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const dispatch = useDispatch();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const isAdmin = user?.role === 'admin';

    const handleCreateOrder = () => {
        dispatch(setCustomerDetails({ customerName, customerPhone }));
        navigate("/menu");
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex items-center justify-around z-50">
            <button onClick={() => navigate("/")} className={`flex items-center justify-center gap-2 font-bold ${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] py-2 rounded-[20px] cursor-pointer`}>< FaHome size={24} /><p>Home</p></button>
            <button onClick={() => navigate("/orders")} className={`flex items-center justify-center gap-2 font-bold ${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] py-2 rounded-[20px] cursor-pointer`}><MdOutlineReorder size={24} /><p>Orders</p></button>
            <button onClick={() => navigate("/dashboard")} className={`flex items-center justify-center gap-2 font-bold ${isActive("/dashboard") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] py-2 rounded-[20px] cursor-pointer`}><SiGoogleanalytics size={24} /><p>Analytics</p></button>
            <button onClick={() => navigate("/settings")} className={`flex items-center justify-center gap-2 font-bold ${isActive("/settings") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] py-2 rounded-[20px] cursor-pointer`}>
                {isAdmin ? <MdOutlineSettings size={24} /> : <MdLock size={24} />}
                <p>Settings</p>
            </button>
            <button onClick={openModal} className="absolute bottom-8 bg-[#F6B100] text-[#f5f5f5] rounded-full p-3 items-center">
                <MdMenuBook size={40} />
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
                <div>
                    <label className="block text-[#ababab] mb-2 text-sm font-medium">CUSTOMER NAME:</label>
                    <div className="flex items-center bg-[#1f1f1f] p-3 px-4 rounded-lg">
                        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} type="text" className="bg-transparent flex-1 text-white focus:outline-none" placeholder="Enter customer name" />
                    </div>
                </div>
                <div>
                    <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">CUSTOMER PHONE NO:</label>
                    <div className="flex items-center justify-between bg-[#1f1f1f] py-3 px-4 rounded-lg">
                        <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} type="phone number" className="bg-transparent flex-1 text-white focus:outline-none" placeholder="Phone no:" />
                    </div>
                </div>
                <button onClick={handleCreateOrder} className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-6 hover:bg-yellow-700">
                    Create Order
                </button>
            </Modal>
        </div>
    )
}

export default BottomNav;