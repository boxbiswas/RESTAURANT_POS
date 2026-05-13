import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from "react-icons/fa";
import Modal from "../shared/Modal";
import ReceiptModal from "../shared/ReceiptModal";
import { createOrderRazorpay, verifyPaymentRazorpay, addOrder } from "../../https/index";
import { useSelector, useDispatch } from "react-redux";
import { getTotalPrice, clearCart } from "../../redux/slices/cartSlice";
import { useSnackbar } from "notistack";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

const Bill = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const total = useSelector(getTotalPrice);
    const customerData = useSelector((state) => state.customer);
    const customerName = customerData?.customerName || "Customer Name";
    const customerPhone = customerData?.customerPhone || "9999999999";
    
    const settings = useSelector((state) => state.settings);
    const taxRate = parseFloat(settings.taxPercent) || 0;
    const discountRate = settings.allowDiscounts ? (parseFloat(settings.discountPercent) || 0) : 0;
    const serviceChargeRate = parseFloat(settings.serviceCharge) || 0;
    
    const subtotal = total;
    const discountAmount = (subtotal * discountRate) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * taxRate) / 100;
    const serviceChargeAmount = (afterDiscount * serviceChargeRate) / 100;
    const totalPriceWithTax = afterDiscount + taxAmount + serviceChargeAmount;
    
    const currency = settings.currency || "INR";
    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "₹";
    const receiptFooter = settings.receiptFooter || "Thank you for dining with us. Visit again!";
    const restaurantName = settings.restaurantName || "RESTRO";

    const [paymentMethod, setPaymentMethod] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [DateTime, setDateTime] = useState(new Date());
    const [razorpayDetails, setRazorpayDetails] = useState(null);
    const [receiptData, setReceiptData] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const items = useSelector((state) => state?.cart?.items ?? []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    const createOrderPayload = (method) => ({
        customerDetails: {
            name: customerName,
            phone: customerPhone,
            guests: customerData?.guests || 1,
        },
        orderStatus: "completed",
        bills: {
            totals: subtotal,
            tax: taxAmount,
            totalWithTax: totalPriceWithTax,
        },
        items,
        paymentMethod: method,
        paymentStatus: "Completed"
    });

    const persistOrder = async (method) => {
        await addOrder(createOrderPayload(method));
        setOrderPlaced(true);
    };

    const handlePlaceOrder = async () => {
        if (totalPriceWithTax <= 0) {
            enqueueSnackbar("Cart is empty. Add items before placing order.", { variant: "warning" });
            return;
        }

        if (!paymentMethod) {
            enqueueSnackbar("Please select a payment method!", { variant: "warning" });
            return;
        }

        // Snapshot current state for receipt
        const currentReceipt = {
            items: [...items],
            subtotal,
            discountAmount,
            discountRate,
            taxAmount,
            taxRate,
            serviceChargeAmount,
            serviceChargeRate,
            totalPriceWithTax,
            customerName,
            customerPhone,
            paymentMethod
        };
        setReceiptData(currentReceipt);
        setOrderPlaced(false);

        if (paymentMethod !== "Card") {
            try {
                await persistOrder(paymentMethod);
                enqueueSnackbar("Order placed successfully!", { variant: "success" });
                dispatch(clearCart());
                openModal();
            } catch (error) {
                console.error("Failed to save order in DB", error);
                enqueueSnackbar("Failed to place order.", { variant: "error" });
            }
            return;
        }

        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!res) {
                enqueueSnackbar("Failed to load Razorpay SDK. Are you online?", { variant: "warning" });
                return;
            }

            if (!window.Razorpay) {
                throw new Error("Razorpay SDK did not initialize");
            }

            const reqData = {
                amount: Number(totalPriceWithTax.toFixed(2)),
            };
            const data = await createOrderRazorpay(reqData);

            if (!data?.success || !data?.order?.id || !data?.key) {
                throw new Error("Invalid order response from backend");
            }

            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: data.order.currency,
                name: restaurantName,
                description: `SECURE PAYMENT FOR ${restaurantName.toUpperCase()}`,
                order_id: data.order.id,
                handler: async function (response) {
                    const verification = await verifyPaymentRazorpay(response);
                    console.log(verification);
                    if (verification?.success) {
                        setRazorpayDetails({
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                        });
                        
                        try {
                            await persistOrder("Card");
                        } catch (error) {
                            console.error("Failed to save order in DB", error);
                        }
                        
                        enqueueSnackbar("Payment successful! Order placed.", { variant: "success" });
                        dispatch(clearCart());
                        openModal();
                    } else {
                        enqueueSnackbar("Payment verification failed. Please contact support.", { variant: "error" });
                    }
                },
                prefill: {
                    name: customerName,
                    email: "customer@example.com",
                    contact: customerPhone,
                },
                theme: {
                    color: "#025cca",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error while opening Razorpay gateway:", error);
            enqueueSnackbar(error?.message || "An error occurred while loading payment gateway.", { variant: "error" });
        }
    };

    return (
        <div className="flex-shrink-0">
            {/* Pricing Summary */}
            <div className="px-4 pt-3 pb-2 space-y-1">
                <div className="flex items-center justify-between">
                    <p className="text-[#ababab] text-xs">Subtotal</p>
                    <p className="text-[#f5f5f5] text-xs font-semibold">{currencySymbol}{subtotal.toFixed(2)}</p>
                </div>
                {discountAmount > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-[#ababab] text-xs">Discount ({discountRate}%)</p>
                        <p className="text-[#02ca3a] text-xs font-semibold">-{currencySymbol}{discountAmount.toFixed(2)}</p>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <p className="text-[#ababab] text-xs">Tax ({taxRate}%)</p>
                    <p className="text-[#f5f5f5] text-xs font-semibold">{currencySymbol}{taxAmount.toFixed(2)}</p>
                </div>
                {serviceChargeAmount > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-[#ababab] text-xs">Service Charge ({serviceChargeRate}%)</p>
                        <p className="text-[#f5f5f5] text-xs font-semibold">{currencySymbol}{serviceChargeAmount.toFixed(2)}</p>
                    </div>
                )}
                <div className="flex items-center justify-between pt-1.5 border-t border-[#2a2a2a]">
                    <p className="text-[#f5f5f5] text-sm font-bold">Total</p>
                    <p className="text-[#f6b100] text-base font-extrabold">{currencySymbol}{totalPriceWithTax.toFixed(2)}</p>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 px-4 py-2">
                {[
                    { label: "Cash", icon: <FaMoneyBillWave />, method: "Cash" },
                    { label: "Card", icon: <FaCreditCard />, method: "Card" },
                    { label: "UPI", icon: <FaQrcode />, method: "UPI" },
                ].map(({ label, icon, method }) => (
                    <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex flex-col items-center justify-center gap-1 py-2 w-full rounded-[10px] text-xs font-bold transition-all duration-200 ${
                            paymentMethod === method
                                ? "bg-[#f6b100] text-[#1a1a1a] shadow-md scale-105"
                                : "bg-[#111] text-[#ababab] border border-[#2a2a2a] hover:border-[#f6b100]/50 hover:text-[#f5f5f5]"
                        }`}
                    >
                        <span className="text-sm">{icon}</span>
                        {label}
                    </button>
                ))}
            </div>

            {/* Place Order Button */}
            <div className="px-4 pb-5">
                <button
                    onClick={handlePlaceOrder}
                    className="bg-[#f6b100] hover:bg-[#e0a000] active:scale-95 w-full py-3 rounded-[12px] text-[#1a1a1a] text-sm font-extrabold tracking-wide transition-all duration-200 shadow-lg"
                >
                    Place Order
                </button>
            </div>

            {/* Receipt Modal */}
            <ReceiptModal isOpen={isModalOpen} onClose={closeModal} title="RECEIPT">
                {/* Header */}
                <div className="mx-auto text-center mb-3">
                    {settings.logo ? (
                        <img src={settings.logo} alt="logo" className="h-12 w-12 mx-auto mb-2 grayscale object-cover rounded-full" />
                    ) : null}
                    <h2 className="text-xl font-bold text-[#f5f5f5] uppercase">{restaurantName}</h2>
                    <p className="text-xs text-[#ababab]">123 Culinary Street, Food City</p>
                    <p className="text-xs text-[#ababab]">Phone: +91 2345678908</p>
                </div>
                <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                {/* Customer Details */}
                <div className="py-2 text-left">
                    <p className="text-xs text-[#ababab]">Customer Name: <span className="text-[#f5f5f5] font-semibold">{receiptData?.customerName || customerName}</span></p>
                    <p className="text-xs text-[#ababab]">Customer Phone: <span className="text-[#f5f5f5] font-semibold">{receiptData?.customerPhone || customerPhone}</span></p>
                </div>
                <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                {/* Date & Time */}
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
                    {receiptData?.items.map((item) => (
                        <div key={item._id} className="flex justify-between mt-1 mb-1">
                            <span className="w-[50%] text-left text-[#f5f5f5] text-sm">{item.name}</span>
                            <span className="w-[25%] text-center text-[#f5f5f5] text-sm">{item.quantity}</span>
                            <span className="w-[25%] text-right text-[#f5f5f5] text-sm">{currencySymbol}{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                {/* Calculation Details */}
                <div className="py-2">
                    <div className="flex justify-between mb-1">
                        <span className="text-[#f5f5f5] text-sm">Subtotal</span>
                        <span className="text-[#f5f5f5] text-sm">{currencySymbol}{(receiptData?.subtotal || 0).toFixed(2)}</span>
                    </div>
                    {(receiptData?.discountAmount || 0) > 0 && (
                        <div className="flex justify-between mb-1">
                            <span className="text-[#f5f5f5] text-sm">Discount ({receiptData?.discountRate}%)</span>
                            <span className="text-[#02ca3a] text-sm">-{currencySymbol}{receiptData.discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between mb-1">
                        <span className="text-[#f5f5f5] text-sm">Tax ({receiptData?.taxRate || 0}%)</span>
                        <span className="text-[#f5f5f5] text-sm">{currencySymbol}{(receiptData?.taxAmount || 0).toFixed(2)}</span>
                    </div>
                    {(receiptData?.serviceChargeAmount || 0) > 0 && (
                        <div className="flex justify-between mb-1">
                            <span className="text-[#f5f5f5] text-sm">Service Charge ({receiptData?.serviceChargeRate}%)</span>
                            <span className="text-[#f5f5f5] text-sm">{currencySymbol}{receiptData.serviceChargeAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold mt-1 text-base">
                        <span className="text-[#f5f5f5] text-md">Total</span>
                        <span className="text-[#f5f5f5] text-md">{currencySymbol}{(receiptData?.totalPriceWithTax || 0).toFixed(2)}</span>
                    </div>
                </div>
                <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                {/* Payment Info */}
                <div className="py-2 space-y-1">
                    <div className="flex justify-between">
                        <span className="text-[#ababab] text-sm">Payment Method</span>
                        <span className="text-[#f5f5f5] text-sm font-semibold">{receiptData?.paymentMethod || paymentMethod}</span>
                    </div>
                    {razorpayDetails && (
                        <>
                            <div className="flex justify-between">
                                <span className="text-[#ababab] text-sm">Razorpay Order ID</span>
                                <span className="text-[#f5f5f5] text-xs font-mono break-all text-right max-w-[60%]">{razorpayDetails.orderId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#ababab] text-sm">Razorpay Payment ID</span>
                                <span className="text-[#f5f5f5] text-xs font-mono break-all text-right max-w-[60%]">{razorpayDetails.paymentId}</span>
                            </div>
                        </>
                    )}
                </div>
                <hr className="border-[#2a2a2a] border-t-2 w-[105%] relative -left-[3%]" />

                {/* QR Area (UPI only) */}
                {(receiptData?.paymentMethod || paymentMethod) === "UPI" && (
                    <div className="flex flex-col items-center justify-center text-center mt-2">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Order1024"
                            alt="QR Code"
                            className="mb-2"
                        />
                    </div>
                )}
                <div className="flex flex-col items-center justify-center text-center mt-2">
                    <h2 className="text-xs font-bold text-[#f5f5f5] mt-2">{receiptFooter}</h2>
                </div>

                {/* Print Button */}
                <button 
                    onClick={async () => {
                        const receiptPaymentMethod = receiptData?.paymentMethod || paymentMethod;

                        try {
                            if (!orderPlaced && receiptPaymentMethod && receiptPaymentMethod !== "Card") {
                                await persistOrder(receiptPaymentMethod);
                                enqueueSnackbar("Order placed successfully!", { variant: "success" });
                            }

                            const handleAfterPrint = () => {
                                closeModal();
                                window.removeEventListener('afterprint', handleAfterPrint);
                            };

                            window.addEventListener('afterprint', handleAfterPrint);
                            window.print();
                        } catch (error) {
                            console.error("Failed to finalize order before printing", error);
                            enqueueSnackbar("Failed to place order before printing.", { variant: "error" });
                        }
                    }}
                    className="w-full bg-[#025cca] text-[#f5f5f5] rounded-lg py-3 mt-4 text-lg font-bold hover:bg-[#0249a0] transition-colors"
                >
                    PRINT RECEIPT
                </button>
            </ReceiptModal>
        </div>
    );
};

export default Bill;