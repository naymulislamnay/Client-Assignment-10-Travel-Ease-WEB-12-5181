import React from 'react';


const latestVehiclesPromise = fetch('http://localhost:3000/latest-vehicles').then(res => res.json());

console.log(latestVehiclesPromise)

const Home = () => {
    return (
        <div>
            This is Homepage
        </div>
    );
};

export default Home;