import React from 'react';
import { FaCheckDouble, FaCircle } from "react-icons/fa";
import { updateOrder } from '../../https/index';

const OrderCard = ({ order, setOrders }) => {
    
    const handleStatusUpdate = async (newStatus) => {
        try {
            await updateOrder(order._id, { ordersStatus: newStatus });
            setOrders(prev => prev.map(o => o._id === order._id ? { ...o, orderStatus: newStatus } : o));
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="w-full h-fit bg-[#262626] hover:bg-[#2a2a2a] transition-colors cursor-pointer rounded-[15px] p-5 border border-transparent hover:border-[#3a3a3a] shadow-lg">
            <div className='flex items-center gap-5'>
                <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg uppercase">
                    {order.customerDetails?.name?.substring(0, 2) || "NA"}
                </button>
                <div className="flex items-center justify-between w-[100%]">
                    <div className="flex flex-col items-start gap-1">
                        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide uppercase">{order.customerDetails?.name || "Unknown"}</h1>
                        <span className="text-[#ababab] text-xs">Guest: {order.customerDetails?.guests || 1} | {order.customerDetails?.phone}</span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {order.orderStatus === 'in-progress' ? (
                            <button onClick={() => handleStatusUpdate('completed')} className="text-[#f6b100] hover:text-[#f5f5f5] bg-[#3a3a3a] px-2 py-1 rounded-lg text-sm font-semibold transition-colors">
                                <FaCircle className="inline mr-2"/>
                                In progress
                            </button>
                        ) : (
                            <button onClick={() => handleStatusUpdate('in-progress')} className="text-green-600 hover:text-[#f5f5f5] bg-[#2e4a40] px-2 py-1 rounded-lg text-sm font-semibold transition-colors">
                                <FaCheckDouble className="inline mr-2"/>
                                Completed
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between mt-4 text-[#ababab]'>
                <p className='text-sm'>{formatDate(order.orderDate)}</p>
                <p className='text-sm'>{order.items?.length || 0} items</p>
            </div>
            <hr className='w-full mt-2 border-t-1 border-gray-500'/>
            <div className='flex items-center justify-between mt-4'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold'>Total</h1>
                <h1 className=' text-[#f5f5f5] text-lg font-semibold'>${order.bills?.totalWithTax?.toFixed(2) || "0.00"}</h1>
            </div>
        </div>      
    )
}

export default OrderCard;