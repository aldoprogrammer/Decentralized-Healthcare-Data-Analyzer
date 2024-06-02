import React from 'react';
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { Chip } from '@material-tailwind/react';

const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Health" },
    { id: 3, name: "Education" },
    { id: 4, name: "Entertainment" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Finance" },
    { id: 7, name: "Travel" },
    { id: 8, name: "Food" },
    { id: 9, name: "Fashion" },
    { id: 10, name: "Science" }
];

const Dashboard = () => {
    return (
        <div className='flex flex-col'>
            <Topbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col w-full'>
                    <div className='grid grid-cols-2 items-center p-4 border-b gap-5 border-blue-gray-200'>
                       
                    </div>
                    <div className='p-4'>
                        {/* categori list */}
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-xl font-semibold text-blue-gray-900'>
                                Explore by Categories
                            </h1>
                            <div className='overflow-x-auto flex gap-2'>
                                {categories.map(category => (
                                    <Chip key={category.id} value={category.name} />
                                ))}
                            </div>
                        </div>

                        {/* video to try */}
                        <div className='flex flex-col mt-5'>
                            <h1 className='text-xl font-semibold text-blue-gray-900'>
                                Video to Try
                            </h1>
                            <div className='grid grid-cols-3 gap-4'>
                                {/* <VideoCard />
                                <VideoCard />
                                <VideoCard /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
