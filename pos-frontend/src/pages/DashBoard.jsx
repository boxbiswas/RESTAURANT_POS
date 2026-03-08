import React from 'react'
import BottomNav from '../components/shared/bottomNav'
import BackButton from '../components/shared/BackButton'
import { FaMoneyBillWave } from "react-icons/fa";
import { BsPeopleFill, BsGraphUpArrow } from 'react-icons/bs';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import TotalAnalysis from '../components/dashboard/TotalAnalysis';
import TodayAnalysis from '../components/dashboard/TodayAnalysis';

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
    return (
        <section>
            <div className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col p-6 pb-20 gap-3'>
                {/* Header */}
                <div className='flex items-center mx-2 gap-4'>
                    <BackButton />
                    <h1 className='text-[#f5f5f5] text-4xl font-bold tracking-wide'>Analytics</h1>
                </div>

                <div className='flex-1 grid grid-cols-2 gap-4'>

                    {/*Left Division*/}
                    <div className="bg-[#1a1a1a] h-[560px] rounded-lg w-full">
                        <TotalAnalysis />
                        {/* Graph Placeholder */}
                        <div className="flex bg-[#1f1f1f] rounded-lg mt-4 min-h-[350px] mx-4 w-[96%] p-4">
                            <Line
                                data={{
                                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                    datasets: [
                                        {
                                            label: 'Sales',
                                            data: [500, 700, 450, 900, 1200, 1500, 1000],
                                            borderColor: '#02ca3a',
                                            backgroundColor: 'rgba(2, 202, 58, 0.1)',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#02ca3a',
                                            fill: true,
                                            tension: 0.4
                                        },
                                        {
                                            label: 'Total Customers',
                                            data: [450, 600, 500, 800, 1050, 1400, 950],
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
                    <div className="bg-[#1a1a1a] h-[560px] rounded-lg w-full">
                        <TodayAnalysis />
                        {/* Graph Placeholder */}
                        <div className="flex bg-[#1f1f1f] rounded-lg mt-4 min-h-[350px] mx-4 w-[96%] p-4">
                            <Line
                                data={{
                                    labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
                                    datasets: [
                                        {
                                            label: "Today's Sales",
                                            data: [120, 250, 180, 300, 200, 450, 350],
                                            borderColor: '#02ca3a',
                                            backgroundColor: 'rgba(2, 202, 58, 0.1)',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#02ca3a',
                                            fill: true,
                                            tension: 0.4
                                        },
                                        {
                                            label: "Today's Customers",
                                            data: [4, 10, 6, 15, 8, 20, 14],
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