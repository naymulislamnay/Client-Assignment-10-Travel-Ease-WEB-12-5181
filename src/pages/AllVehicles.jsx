import React, { useEffect, useState } from 'react';
import VehicleCardForAllVehiclePage from '../components/VehicleCardForAllVehiclePage';
import { Link } from 'react-router';
import SearchBox from '../components/SearchBox';
import NotFound from './NotFound';
import Loader from '../components/Loader';


const AllVehicles = () => {
    const [loading, setLoading] = useState(true);
    const [allVehicles, setAllVehicles] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetch("https://travel-ease-server-delta.vercel.app/vehicles")
            .then(res => res.json())
            .then(data => {
                setAllVehicles(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    const searchedVehicles = allVehicles.filter(vehicle =>
        vehicle.vehicleName.toLowerCase().includes(search.toLowerCase())
    );

    const sortedVehicles = [...searchedVehicles].sort((a, b) => {
        if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }

        if (sortBy === "location") {
            return a.location.localeCompare(b.location);
        }

        if (sortBy === "priceLow") {
            return a.pricePerDay - b.pricePerDay;
        }

        if (sortBy === "priceHigh") {
            return b.pricePerDay - a.pricePerDay;
        }

        return 0;
    });

    if (loading) {
        return (<Loader></Loader>);
    }

    return (
        <div>
            <div className='pt-1 md:pt-5 lg:pt-10 text-center'>
                <h2 className='text-xl md:text-[30px] lg:text-[36px] text-[#001931] font-bold'>
                    Choose Vehicles to <br className='md:hidden' /> Make your Tour Easy
                </h2>
                <p className='text-[10px] md:text-[12px] lg:text-[16px] w-3/4 md:w-full mx-auto text-[#627382]'>
                    Explore All Kind of Vehicles for your Ride.
                </p>
            </div>

            <div className='flex justify-between items-center p-1 lg:p-0 text-[10px] md:text-[12px] lg:text-[16px]'>
                <p>({sortedVehicles.length}) Vehicles Found</p>

                <div className='flex items-center gap-2'>
                    <select
                        className="px-1 w-[100px] md:w-fit md:px-2 lg:px-3 py-1 border rounded-lg bg-white text-gray-600 shadow"
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}>

                        <option value="">Sort</option>
                        <option value="category">Category (A to Z)</option>
                        <option value="location">Location (A to Z)</option>
                        <option value="priceLow">Price (Low to High)</option>
                        <option value="priceHigh">Price (High to Low)</option>
                    </select>
                    <SearchBox search={search} setSearch={setSearch} />
                </div>
            </div>


            <div className='mt-3'>
                {
                    loading ? (<Loader></Loader>) : sortedVehicles.length === 0 ? (
                        <NotFound></NotFound>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 p-1 lg:p-0">
                            {
                                sortedVehicles.map(vehicle => (
                                    <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id}>
                                        <VehicleCardForAllVehiclePage vehicle={vehicle} />
                                    </Link>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllVehicles;