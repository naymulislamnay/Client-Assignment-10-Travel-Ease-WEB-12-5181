import React, { useEffect, useState } from 'react';
import VehicleCardForAllVehiclePage from '../../components/VehicleCardForAllVehiclePage';
import { Link } from 'react-router';

const AllVehicles = () => {

    const [allVehicles, setAllVehicles] = useState([]);

    // fetch All vehicle Data from MongoDB
    useEffect(() => {
        fetch("http://localhost:3000/vehicles")
            .then(res => res.json())
            .then(data => {
                setAllVehicles(data);
            })
            .catch(err => {
                console.log(err)
            })
    })


    return (
        <div>
            <div className='pt-1 md:pt-5 lg:pt-10 text-center'>
                <h2 className='text-2xl md:text-[30px] lg:text-[36px] text-[#001931] font-bold'>
                    Choose Vehicles to Make your Tour Easy
                </h2>
                <p className='text-[10px] md:text-[12px] lg:text-[16px] w-3/4 md:w-full mx-auto text-[#627382]'>
                    Explore All Kind of Vehicles for your Ride.
                </p>
            </div>
            <div className="mt-3 md:mt-5 lg:mt-7.5 p-1 lg:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {
                    allVehicles.map(vehicle => (
                        <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id} >
                            <VehicleCardForAllVehiclePage vehicle={vehicle}></VehicleCardForAllVehiclePage>
                        </Link>
                    ))
                }
            </div>

        </div>
    );
};

export default AllVehicles;