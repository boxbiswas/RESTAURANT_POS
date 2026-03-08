import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Graph = () => {

    const doughnutData = {
        labels: ["12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM", "6 PM - 8 PM", "8 PM - 10 PM"],
        datasets: [
            {
                label: "Orders",
                data: [40, 25, 45, 90, 120],
                backgroundColor: [
                    '#6366F1',  // Indigo
                    '#8B5CF6',  // Violet
                    '#A855F7',  // Purple
                    '#D946EF',  // Fuchsia
                    '#EC4899',  // Pink
                ],
                borderColor: '#1f1f1f',
                borderColor: '#1f1f1f',
                borderWidth: 1,
                borderRadius: 4
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: '#2a2a2a'
                },
                ticks: {
                    color: '#ababab'
                }
            },
            y: {
                grid: {
                    color: '#2a2a2a'
                },
                ticks: {
                    color: '#ababab'
                }
            }
        }
    };

    const paymentData = {
        labels: ["Cash", "UPI", "Card"],
        datasets: [
            {
                label: "Orders",
                data: [35, 45, 20],
                backgroundColor: [
                    '#02ca3a',  // User requested Green
                    '#f6b100',  // User requested Yellow
                    '#025cca',  // Deep App Blue
                ],
                borderColor: '#1f1f1f',
                borderColor: '#1f1f1f',
                borderWidth: 1,
                borderRadius: 4
            },
        ],
    };

    return (
        <div className='px-8 mt-6'>
            <div className='bg-[#1a1a1a] h-[calc(71vh-5rem)] overflow-hidden flex flex-col p-6 pb-20 gap-3 rounded-[15px]'>
                <div className='flex-1 grid grid-cols-2 gap-4'>

                    {/*Left Division*/}
                    <div className="bg-[#1f1f1f] h-[450px] rounded-[15px] w-full p-6 flex flex-col">
                        <h2 className="text-[#f5f5f5] text-lg font-semibold tracking-wide mb-6">Peak Hours</h2>
                        <div className="relative flex-1 w-full h-full">
                            <Bar data={doughnutData} options={barOptions} />
                        </div>
                    </div>

                    {/*Right Division*/}
                    <div className="bg-[#1f1f1f] h-[450px] rounded-[15px] w-full p-6 flex flex-col">
                        <h2 className="text-[#f5f5f5] text-lg font-semibold tracking-wide mb-6">Payment Methods</h2>
                        <div className="relative flex-1 w-full h-full">
                            <Bar data={paymentData} options={barOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Graph;