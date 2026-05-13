import React from 'react'
import BottomNav from '../components/shared/bottomNav'
import BackButton from '../components/shared/BackButton'
import { FaMoneyBillWave } from "react-icons/fa";
import { BsPeopleFill, BsGraphUpArrow } from 'react-icons/bs';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import TotalAnalysis from '../components/dashboard/TotalAnalysis';
import TodayAnalysis from '../components/dashboard/TodayAnalysis';
import useLiveOrders from '../hooks/useLiveOrders';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashBoard = () => {
    const orders = useLiveOrders();

    const totalSales = orders.reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0).toFixed(2);
    const totalOrders = orders.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysOrders = orders.filter(order => new Date(order.orderDate) >= today);
    const todaySales = todaysOrders.reduce((sum, order) => sum + (order.bills?.totalWithTax || 0), 0).toFixed(2);
    const todayOrdersCount = todaysOrders.length;

    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        return d;
    }).reverse();

    const weeklySalesData = last7Days.map(day => {
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        const dayOrders = orders.filter(o => {
            const orderDate = new Date(o.orderDate);
            return orderDate >= day && orderDate < nextDay;
        });
        return dayOrders.reduce((sum, o) => sum + (o.bills?.totalWithTax || 0), 0);
    });

    const weeklyCustomersData = last7Days.map(day => {
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        const dayOrders = orders.filter(o => {
            const orderDate = new Date(o.orderDate);
            return orderDate >= day && orderDate < nextDay;
        });
        return dayOrders.reduce((sum, o) => sum + (o.customerDetails?.guests || 1), 0);
    });

    const weeklyLabels = last7Days.map(day => day.toLocaleDateString('en-US', { weekday: 'short' }));

    const timeIntervals = Array.from({ length: 12 }, (_, index) => index * 2);
    const timeLabels = timeIntervals.map((hour) => {
        const nextHour = (hour + 2) % 24;
        const formatHour = (value) => {
            if (value === 0) return '12 AM';
            if (value === 12) return '12 PM';
            return `${value > 12 ? value - 12 : value} ${value > 12 ? 'PM' : 'AM'}`;
        };

        return `${formatHour(hour)} - ${formatHour(nextHour)}`;
    });

    const todaySalesData = timeIntervals.map((hour, index) => {
        const nextHour = timeIntervals[index + 1] || 24;
        const intervalOrders = todaysOrders.filter(o => {
            const orderHour = new Date(o.orderDate).getHours();
            return orderHour >= hour && orderHour < nextHour;
        });
        return intervalOrders.reduce((sum, o) => sum + (o.bills?.totalWithTax || 0), 0);
    });

    const todayCustomersData = timeIntervals.map((hour, index) => {
        const nextHour = timeIntervals[index + 1] || 24;
        const intervalOrders = todaysOrders.filter(o => {
            const orderHour = new Date(o.orderDate).getHours();
            return orderHour >= hour && orderHour < nextHour;
        });
        return intervalOrders.reduce((sum, o) => sum + (o.customerDetails?.guests || 1), 0);
    });

    return (
        <section>
            <div className='bg-[#1f1f1f] h-[calc(100vh-80px)] overflow-hidden flex flex-col p-6 pb-24 gap-3'>
                {/* Header */}
                <div className='flex items-center mx-2 gap-4'>
                    <BackButton />
                    <h1 className='text-[#f5f5f5] text-4xl font-bold tracking-wide'>Analytics</h1>
                </div>

                <div className='flex-1 grid grid-cols-2 gap-6 min-h-0 mt-2'>

                    {/*Left Division*/}
                    <div className="bg-[#1a1a1a] rounded-[15px] w-full flex flex-col min-h-0 pb-4 shadow-lg border border-[#2a2a2a]">
                        <TotalAnalysis totalSales={totalSales} totalOrders={totalOrders} />
                        {/* Graph Placeholder */}
                        <div className="relative flex-1 bg-[#1f1f1f] rounded-[15px] mt-4 mx-4 p-4 border border-[#2a2a2a] min-h-0">
                            <Line
                                data={{
                                    labels: weeklyLabels,
                                    datasets: [
                                        {
                                            label: 'Sales',
                                            data: weeklySalesData,
                                            borderColor: '#02ca3a',
                                            backgroundColor: 'rgba(2, 202, 58, 0.1)',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#02ca3a',
                                            fill: true,
                                            tension: 0.4
                                        },
                                        {
                                            label: 'Total Customers',
                                            data: weeklyCustomersData,
                                            borderColor: '#f6b100',
                                            backgroundColor: 'rgba(246, 177, 0, 0.1)',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#f6b100',
                                            fill: true,
                                            tension: 0.4
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            labels: { color: '#ababab' }
                                        }
                                    },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#ababab' } },
                                        x: { grid: { display: false }, ticks: { color: '#ababab' } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/*Right Division*/}
                    <div className="bg-[#1a1a1a] rounded-[15px] w-full flex flex-col min-h-0 pb-4 shadow-lg border border-[#2a2a2a]">
                        <TodayAnalysis todaySales={todaySales} todayOrders={todayOrdersCount} />
                        {/* Graph Placeholder */}
                        <div className="relative flex-1 bg-[#1f1f1f] rounded-[15px] mt-4 mx-4 p-4 border border-[#2a2a2a] min-h-0">
                            <Line
                                data={{
                                    labels: timeLabels,
                                    datasets: [
                                        {
                                            label: "Today's Sales",
                                            data: todaySalesData,
                                            borderColor: '#02ca3a',
                                            backgroundColor: 'rgba(2, 202, 58, 0.1)',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#02ca3a',
                                            fill: true,
                                            tension: 0.4
                                        },
                                        {
                                            label: "Today's Customers",
                                            data: todayCustomersData,
                                            borderColor: '#f6b100',
                                            backgroundColor: 'rgba(246, 177, 0, 0.1)',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#f6b100',
                                            fill: true,
                                            tension: 0.4
                                        }
                                    ]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            labels: { color: '#ababab' }
                                        }
                                    },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#ababab' } },
                                        x: { grid: { display: false }, ticks: { color: '#ababab' } }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </section>
    )
}

export default DashBoard