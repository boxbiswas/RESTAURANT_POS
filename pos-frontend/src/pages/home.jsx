import React from 'react';
import BottomNav from '../components/shared/bottomNav';
import Greetings from '../components/home/Greetings';
import MiniCard from '../components/home/MiniCard';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from '../components/home/RecentOrders';
import Graph from '../components/home/Graph';


const Home = () => {
    return (
        <section className=' bg-[#1f1f1f] h-[calc(115vh-80px)] overflow-hidden flex gap-3'>
            {/*Left Div*/}
            <div className='flex-3'>
                <Greetings />
                <div className='flex items-center w-full gap-3 px-8 mt-8'>
                    <MiniCard title="Total Sales" icon={<BsCashCoin />} number={512} footerNum={1.6} />
                    <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
                </div>
                <Graph />
            </div>

            {/*Right Div*/}
            <div className='flex-2'>
                <RecentOrders />
            </div>
            <BottomNav />
        </section>
    )
}

export default Home;