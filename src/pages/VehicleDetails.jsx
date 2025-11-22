import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../../components/Loader';

const VehicleDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/vehicles/${id}`);
                setVehicle(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load vehicle details.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    if (loading) {
        return <Loader></Loader>
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!vehicle) {
        return <div className="text-center py-10 text-gray-500">Vehicle not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-lg">
            {/* Cover Image */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <img
                    src={vehicle.coverImage}
                    alt={vehicle.vehicleName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Vehicle Info */}
            <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-800">{vehicle.vehicleName}</h1>
                <p className="text-gray-500 mt-1">{vehicle.category}</p>
                <p className="text-indigo-600 font-semibold mt-2 text-xl">${vehicle.pricePerDay} / day</p>
            </div>

            {/* Owner & Location */}
            <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
                <div>
                    <h3 className="text-gray-700 font-semibold">Owner:</h3>
                    <p className="text-gray-600">{vehicle.owner}</p>
                </div>
                <div>
                    <h3 className="text-gray-700 font-semibold">Location:</h3>
                    <p className="text-gray-600">{vehicle.location}</p>
                </div>
                <div>
                    <h3 className="text-gray-700 font-semibold">Availability:</h3>
                    <p
                        className={`font-semibold ${vehicle.availability === "Available" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {vehicle.availability}
                    </p>
                </div>
            </div>

            {/* Categories */}
            <div className="mt-6">
                <h3 className="text-gray-700 font-semibold">Categories:</h3>
                <p className="text-gray-600">{vehicle.categories}</p>
            </div>

            {/* Description */}
            <div className="mt-6">
                <h3 className="text-gray-700 font-semibold">Description:</h3>
                <p className="text-gray-600 mt-1">{vehicle.description}</p>
            </div>

            {/* Booking Button */}
            <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition">
                    Book Now
                </button>
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-gray-400 text-sm text-center">
                <p>Vehicle added on: {new Date(vehicle.createdAt).toLocaleDateString()}</p>
                <p>Owner email: {vehicle.userEmail}</p>
            </div>
        </div>
    );
};

export default VehicleDetails;