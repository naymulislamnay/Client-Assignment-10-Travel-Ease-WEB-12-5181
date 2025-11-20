import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';

const Home = () => {
    const [sliderVehicles, setSliderVehicles] = useState([]);

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


    return (
        <div>
            <Slider sliderVehicles={sliderVehicles}></Slider>
            This is Homepage
        </div>
    );
};

export default Home;