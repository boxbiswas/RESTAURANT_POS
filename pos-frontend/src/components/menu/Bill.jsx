import React from "react";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "../shared/Modal";
import { useNavigate } from "react-router-dom";
import ReceiptModal from "../shared/ReceiptModal";
import logo from "../../assets/images/logo.png";


const Bill = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        <>
            <div className="flex items-center justify-between px-5 mt-1">
                <p className="text-[#ababab] text-md font-medium mt-1">Subtotal</p>
                <h1 className="text-[#f5f5f5] text-md font-bold">₹360.00</h1>
            </div>
            <div className="flex items-center justify-between px-5 mt-1">
                <p className="text-[#ababab] text-md font-medium mt-1">Tax(5.25%)</p>
                <h1 className="text-[#f5f5f5] text-md font-bold">₹18.90</h1>
            </div>
            <div className="flex items-center justify-between px-5 mt-1">
                <p className="text-[#ababab] text-md font-medium mt-1">Total</p>
                <h1 className="text-[#f5f5f5] text-md font-bold">₹378.90</h1>
            </div>

            <div className="flex items-center justify-between gap-3 px-5 mt-3">
                <button className="flex flex-col items-center justify-center gap-1 bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold"><FaMoneyBillWave className="text-xl" /> Cash</button>
                <button className="flex flex-col items-center justify-center gap-1 bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold"><FaCreditCard className="text-xl" /> Card</button>
                <button className="flex flex-col items-center justify-center gap-1 bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold"><FaQrcode className="text-xl" /> UPI</button>
            </div>

            <div className="flex items-center justify-between gap-3 px-5 mt-3">
                {/* <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] text-lg font-semibold">Print Receipt</button> */}
                <button onClick={openModal} className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] text-lg font-semibold">Place Order</button>

                <ReceiptModal isOpen={isModalOpen} onClose={closeModal} title="RECEIPT">
                    {/* Header */}
                    <div className="mx-auto text-center mb-3">
                        <img src={logo} alt="logo" className="h-12 w-12 mx-auto mb-2 grayscale" />
                        <h2 className="text-xl font-bold text-[#f5f5f5]">RESTRO</h2>
                        <p className="text-xs text-[#ababab]">123 Culinary Street, Food City</p>
                        <p className="text-xs text-[#ababab]">Phone: +91 2345678908</p>
                    </div>
                    <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                    {/* Date Time */}
                    <div className="py-2">
                        <div className="flex justify-center gap-8 mt-1">
                            <span className="text-sm text-[#ababab]">{formatDate(DateTime)}</span>
                            <span className="text-sm text-[#ababab]">{formatTime(DateTime)}</span>
                        </div>
                    </div>
                    <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                    {/* Order Details */}
                    <div className="py-1">
                        <div className="flex justify-between font-bold pb-1">
                            <span className="w-[50%] text-left text-[#f5f5f5]">Item</span>
                            <span className="w-[25%] text-center text-[#f5f5f5]">Qty</span>
                            <span className="w-[25%] text-right text-[#f5f5f5]">Price</span>
                        </div>
                        <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />
                        <div className="flex justify-between mt-1 mb-1">
                            <span className="w-[50%] text-left text-[#f5f5f5]">Chicken Tikka Masala</span>
                            <span className="w-[25%] text-center text-[#f5f5f5]">1</span>
                            <span className="w-[25%] text-right text-[#f5f5f5]">₹280</span>
                        </div>
                        <div className="flex justify-between mt-1 mb-1">
                            <span className="w-[50%] text-left text-[#f5f5f5]">Garlic Naan</span>
                            <span className="w-[25%] text-center text-[#f5f5f5]">2</span>
                            <span className="w-[25%] text-right text-[#f5f5f5]">₹80</span>
                        </div>
                    </div>
                    <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                    {/* Calculation Details */}
                    <div className="py-2">
                        <div className="flex justify-between mb-1">
                            <span className="text-[#f5f5f5] text-sm">Subtotal</span>
                            <span className="text-[#f5f5f5] text-sm">₹360.00</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-[#f5f5f5] text-sm">Tax (5.25%)</span>
                            <span className="text-[#f5f5f5] text-sm">₹18.90</span>
                        </div>
                        <div className="flex justify-between font-bold mt-1 text-base">
                            <span className="text-[#f5f5f5] text-md">Total</span>
                            <span className="text-[#f5f5f5] text-md">₹378.90</span>
                        </div>
                    </div>
                    <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                    {/* QR AREA */}
                    <div className="flex flex-col items-center justify-center text-center mt-2">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Order1024" alt="QR Code" className="mb-2" />
                        <h2 className="text-xs font-bold text-[#f5f5f5]">THANK YOU FOR THE VISIT !</h2>
                    </div>
                    {/* Print Button */}
                    <button className="w-full bg-[#025cca] text-[#f5f5f5] rounded-lg py-3 mt-4 text-lg font-bold hover:bg-[#0249a0] transition-colors">
                        PRINT RECEIPT
                    </button>
                </ReceiptModal>
            </div>
        </>
    );
};

export default Bill;
