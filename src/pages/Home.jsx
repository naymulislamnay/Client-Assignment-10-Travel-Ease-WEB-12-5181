import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import VehicleCard from '../../components/VehicleCard';
import Loader from '../../components/Loader';

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
            {
                <div className="mt-3 md:mt-5 lg:mt-7.5 p-1 lg:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {
                        latestVehicles.map(vehicle => (
                            <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>
                        ))
                    }
                </div>
            }
            This is Homepage
        </div>
    );
};

export default Home;