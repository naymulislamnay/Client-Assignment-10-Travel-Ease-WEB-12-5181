import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import VehicleCard from '../../components/VehicleCard';
import Loader from '../../components/Loader';
import { Link } from 'react-router';

const Home = () => {
    const [sliderVehicles, setSliderVehicles] = useState([]);
    const [latestVehicles, setLatestVehicles] = useState([]);

    // fetch Slider Vehicle Data from MongoDB
    useEffect(() => {
        fetch("http://localhost:3000/latest-vehicles")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSliderVehicles(data);
            })
            .catch(err => console.log(err));
    }, []);



    // fetch Latest Vehicle Data from MongoDB for Homepage
    useEffect(() => {
        fetch("http://localhost:3000/latest-vehicles")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLatestVehicles(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Slider sliderVehicles={sliderVehicles}></Slider>
            <div className='pt-1 md:pt-3 lg:pt-5 text-center'>
                <h2 className='text-2xl md:text-[30px] lg:text-[36px] text-[#001931] font-bold'>
                    Explore Vehicles to Make your Tour Easy
                </h2>
                <p className='text-[10px] md:text-[12px] lg:text-[16px] w-3/4 md:w-full mx-auto text-[#627382]'>
                    Explore All Kind of Vehicles for your Ride.
                </p>
            </div>

            {
                <div className="mt-3 md:mt-5 lg:mt-7.5 p-1 lg:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {
                        latestVehicles.map(vehicle => (
                            <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id}>
                                <VehicleCard vehicle={vehicle}></VehicleCard>
                            </Link>
                        ))
                    }
                </div>
            }
            <Link to='/vehicles' className='flex mx-auto w-fit'>
                <button className="btn bg-linear-to-br from-[#024c58] to-[#07b6d5] border-none text-[10px] md:text-[13px] lg:text-[16px] text-white my-4">
                    View All
                </button>
            </Link>


            {/* static divs */}
            <div class="p-8 space-y-8 bg-gray-50">

                <div class="bg-white border-2 border-indigo-500 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6">
                    <div class="text-indigo-500 text-5xl flex gap-4">
                        <div class="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13l4 4L21 5" />
                            </svg>
                            <span class="mt-2 text-sm font-semibold">SUVs</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span class="mt-2 text-sm font-semibold">Electric</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13h18v6H3v-6zM3 7h18v6H3V7z" />
                            </svg>
                            <span class="mt-2 text-sm font-semibold">Vans</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h18M3 16h18M3 8h18" />
                            </svg>
                            <span class="mt-2 text-sm font-semibold">Sedans</span>
                        </div>
                    </div>
                    <div class="md:flex-1">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Top Categories</h2>
                        <p class="text-gray-600">Browse through our most popular vehicle types for every trip and budget.</p>
                    </div>
                </div>

                <div class="bg-white border-2 border-green-500 rounded-2xl p-6 shadow-lg flex items-center gap-6">
                    <div class="text-green-500 text-5xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Featured Owner</h2>
                        <p class="text-gray-600">Spotlight on a trusted host who consistently provides excellent vehicles and service.</p>
                    </div>
                </div>

                <div class="bg-white border-2 border-yellow-500 rounded-2xl p-6 shadow-lg flex items-center gap-6">
                    <div class="text-yellow-500 text-5xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">About TravelEase</h2>
                        <p class="text-gray-600">Your go-to platform for convenient and reliable vehicle bookings, trusted by thousands of travelers worldwide.</p>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default Home;