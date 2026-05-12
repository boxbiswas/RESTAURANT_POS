import React, { useState, useEffect } from 'react';
import BottomNav from '../components/shared/bottomNav';
import OrderCard from '../components/orders/OrderCard';
import BackButton from '../components/shared/BackButton';
import { getOrders } from '../https/index';

const Orders = () => {

    const [status, setStatus] = useState("all");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                if (res?.data?.data) {
                    setOrders(res.data.data.reverse()); // latest first
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = status === "all" ? orders : orders.filter(o => o.orderStatus === status);

    return (
        <section className='bg-[#1f1f1f] h-[calc(100vh-80px)] overflow-hidden flex flex-col'>
            <div className='flex items-center justify-between px-10 py-4 mt-2'>
                <div className='flex items-center gap-4'>
                    <BackButton/>
                    <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Orders</h1>
                </div>
                
                <div className='flex items-center justify-around gap-4'>
                    <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>All</button>
                    <button onClick={() => setStatus("in-progress")} className={`text-[#ababab] text-lg ${status === "in-progress" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>In Progress</button>
                    <button onClick={() => setStatus("completed")} className={`text-[#ababab] text-lg ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>Completed</button>
                </div>
            </div>

            <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 py-4 overflow-y-auto scrollbar-hide pb-24 items-start content-start'>
                {filteredOrders.map(order => (
                    <OrderCard key={order._id} order={order} setOrders={setOrders} />
                ))}
            </div>

            <BottomNav/>
        </section>
    )
}

export default Orders;