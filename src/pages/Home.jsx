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
        </div>
    );
};

export default Home;