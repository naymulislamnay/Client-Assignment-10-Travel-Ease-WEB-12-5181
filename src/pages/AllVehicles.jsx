import React, { useEffect, useState } from 'react';
import VehicleCardForAllVehiclePage from '../../components/VehicleCardForAllVehiclePage';
import { Link } from 'react-router';
import SearchBox from '../../components/SearchBox';
import NotFound from './NotFound';
import { Loader } from 'lucide-react';

const AllVehicles = () => {
    const [loading, setLoading] = useState(true);
    const [allVehicles, setAllVehicles] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch("http://localhost:3000/vehicles")
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

    if (loading) {
        return <p className="text-center mt-5">Loading vehicles...</p>;
    }

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

            <div className='flex justify-between items-center p-1 lg:p-0 text-[10px] md:text-[12px] lg:text-[16px]'>
                <p>({searchedVehicles.length}) Vehicles Found</p>
                <SearchBox search={search} setSearch={setSearch} />
            </div>


            <div className='mt-3'>
                {
                    loading ? (<Loader></Loader>) : searchedVehicles.length === 0 ? (
                        <NotFound></NotFound>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 p-1 lg:p-0">
                            {
                                searchedVehicles.map(vehicle => (
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