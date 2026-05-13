import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const peakHourLabels = [
    '12 AM - 2 AM',
    '2 AM - 4 AM',
    '4 AM - 6 AM',
    '6 AM - 8 AM',
    '8 AM - 10 AM',
    '10 AM - 12 PM',
    '12 PM - 2 PM',
    '2 PM - 4 PM',
    '4 PM - 6 PM',
    '6 PM - 8 PM',
    '8 PM - 10 PM',
    '10 PM - 12 AM',
];

const Graph = ({ peakHourData = [], paymentMethodData = [] }) => {
    const peakHourChart = {
        labels: peakHourLabels,
        datasets: [
            {
                label: 'Orders',
                data: peakHourData,
                backgroundColor: '#f6b100',
                borderRadius: 8,
            },
        ],
    };

    const paymentChart = {
        labels: ['Cash', 'UPI', 'Card'],
        datasets: [
            {
                label: 'Payments',
                data: paymentMethodData,
                backgroundColor: ['#02ca3a', '#f6b100', '#025cca'],
                borderRadius: 8,
            },
        ],
    };

    const peakHourOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#d9d9d9',
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#ababab' },
                grid: { color: 'rgba(255,255,255,0.05)' },
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#ababab', precision: 0 },
                grid: { color: 'rgba(255,255,255,0.06)' },
            },
        },
    };

    const paymentOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#d9d9d9',
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    lineWidth: style.borderWidth,
                                    fontColor: '#d9d9d9',
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#ababab' },
                grid: { color: 'rgba(255,255,255,0.05)' },
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#ababab', precision: 0 },
                grid: { color: 'rgba(255,255,255,0.06)' },
            },
        },
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-8 mt-6 flex-1 min-h-0">
            <div className="rounded-[18px] border border-[#2a2a2a] bg-[#1a1a1a] p-5 flex flex-col min-h-0">
                <div className="mb-4">
                    <h2 className="text-[#f5f5f5] text-lg font-bold">Peak Hours</h2>
                    <p className="text-[#ababab] text-xs">Orders placed during the day</p>
                </div>
                <div className="flex-1 w-full relative min-h-[200px]">
                    <Bar data={peakHourChart} options={peakHourOptions} />
                </div>
            </div>

            <div className="rounded-[18px] border border-[#2a2a2a] bg-[#1a1a1a] p-5 flex flex-col min-h-0">
                <div className="mb-4">
                    <h2 className="text-[#f5f5f5] text-lg font-bold">Payment Mix</h2>
                    <p className="text-[#ababab] text-xs">Distribution by payment method</p>
                </div>
                <div className="flex-1 w-full relative min-h-[200px]">
                    <Bar data={paymentChart} options={paymentOptions} />
                </div>
            </div>
        </div>
    );
};

export default Graph;
