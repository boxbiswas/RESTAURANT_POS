import React from "react";
import { BsPeopleFill } from "react-icons/bs";

const OrderList = ({ orders }) => {
    if (!orders || orders.length === 0) {
        return (
            <div className="text-[#ababab] text-center mt-10">No recent orders found.</div>
        );
    }

    return (
        <>
            {orders.map((order) => {
                const isCompleted = order.orderStatus === "completed";
                const isReady = order.orderStatus === "ready";
                const statusColor = isCompleted ? "#02ca3a" : isReady ? "#025cca" : "#f6b100";

                return (
                    <div key={order._id || order.id} className="bg-[#1f1f1f] rounded-[15px] px-3 py-3">
                        <div className="flex items-center gap-5 py-2 w-full">
                            <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg"><BsPeopleFill /></button>
                            <div className="flex items-center justify-between w-full flex-1">
                                <div className="flex flex-col items-start gap-1">
                                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                                        {order.customerDetails?.name || "Walk-in Customer"}
                                    </h1>
                                    <p className="text-[#ababab] text-sm">{order.items?.length || 0} items</p>
                                </div>
                                <div className="flex flex-col items-end py-2">
                                    <h1 className="text-[#f5f5f5] text-sm font-semibold tracking-wide px-2 py-1 rounded-lg" style={{ backgroundColor: statusColor }}>
                                        {order.orderStatus}
                                    </h1>
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
