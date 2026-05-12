import React, { useState, useEffect } from 'react';
import BottomNav from '../components/shared/bottomNav';
import Greetings from '../components/home/Greetings';
import MiniCard from '../components/home/MiniCard';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from '../components/home/RecentOrders';
import Graph from '../components/home/Graph';
import { getOrders } from '../https/index';


const Home = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                if (res?.data?.data) {
                    setOrders(res.data.data.reverse());
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, []);

    const inProgressOrdersCount = orders.filter(o => o.orderStatus === 'in-progress').length;
    const totalSales = orders.reduce((acc, curr) => acc + (curr.bills?.totalWithTax || 0), 0).toFixed(2);

    // Dynamic Growth Calculation
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.getDate() === d2.getDate() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getFullYear() === d2.getFullYear();
    };

    let todaySalesValue = 0;
    let yesterdaySalesValue = 0;
    let todayOrdersCount = 0;
    let yesterdayOrdersCount = 0;

    orders.forEach(order => {
        if (!order.orderDate) return;
        
        const isToday = isSameDay(order.orderDate, today);
        const isYesterday = isSameDay(order.orderDate, yesterday);

        if (isToday) {
            todayOrdersCount++;
            if (order.orderStatus === 'completed') {
                todaySalesValue += (order.bills?.totalWithTax || 0);
            }
        } else if (isYesterday) {
            yesterdayOrdersCount++;
            if (order.orderStatus === 'completed') {
                yesterdaySalesValue += (order.bills?.totalWithTax || 0);
            }
        }
    });

    const salesGrowth = yesterdaySalesValue === 0 ? (todaySalesValue > 0 ? 100 : 0) : (((todaySalesValue - yesterdaySalesValue) / yesterdaySalesValue) * 100);
    const ordersGrowth = yesterdayOrdersCount === 0 ? (todayOrdersCount > 0 ? 100 : 0) : (((todayOrdersCount - yesterdayOrdersCount) / yesterdayOrdersCount) * 100);

    // Dynamic Graph Data Calculation
    const peakHourData = [0, 0, 0, 0, 0]; // 12-2, 2-4, 4-6, 6-8, 8-10
    const paymentMethodData = [0, 0, 0]; // Cash, UPI, Card

    orders.forEach(order => {
        // Payment methods
        const paymentMethod = (order.paymentMethod || order.bills?.paymentMethod || 'cash').toLowerCase();
        if (paymentMethod === 'cash') paymentMethodData[0]++;
        else if (paymentMethod === 'upi') paymentMethodData[1]++;
        else if (paymentMethod === 'card') paymentMethodData[2]++;
        else paymentMethodData[0]++; 

        // Peak Hours
        if (order.orderDate) {
            const hour = new Date(order.orderDate).getHours(); // 0-23
            if (hour >= 12 && hour < 14) peakHourData[0]++;
            else if (hour >= 14 && hour < 16) peakHourData[1]++;
            else if (hour >= 16 && hour < 18) peakHourData[2]++;
            else if (hour >= 18 && hour < 20) peakHourData[3]++;
            else if (hour >= 20 && hour < 22) peakHourData[4]++;
        }
    });

    return (
        <section className='bg-[#1f1f1f] h-[calc(100vh-80px)] flex flex-col overflow-hidden'>
            {/* Main Content Area above bottom nav */}
            <div className='flex flex-1 gap-4 px-4 pt-4 pb-[88px] min-h-0'>
                {/*Left Div*/}
                <div className='flex-1 flex flex-col min-h-0 overflow-hidden'>
                    <Greetings />
                    <div className='flex items-center w-full gap-4 px-8 mt-6 flex-shrink-0'>
                        <MiniCard title="Total Sales" icon={<BsCashCoin />} number={totalSales} footerNum={salesGrowth.toFixed(1)} />
                        <MiniCard title="In Progress" icon={<GrInProgress />} number={inProgressOrdersCount} footerNum={ordersGrowth.toFixed(1)} />
                    </div>
                    <div className='flex-1 flex flex-col min-h-0'>
                        <Graph 
                            peakHourData={peakHourData} 
                            paymentMethodData={paymentMethodData} 
                        />
                    </div>
                </div>

                {/*Right Div*/}
                <div className='w-[350px] lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col min-h-0 overflow-hidden'>
                    <RecentOrders orders={orders} />
                </div>
            </div>
            <BottomNav />
        </section>
    )
}

export default Home;
