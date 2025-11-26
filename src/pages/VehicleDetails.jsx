import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import { MapPin, User, Car, Calendar, Mail } from "lucide-react";
import { formatDateTime } from '../functionsForGlobalUse/GlobalFunction';
import { AuthContext } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';

const VehicleDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


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

    if (loading) return <Loader />;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!vehicle) return <div className="text-center py-10 text-gray-500">Vehicle not found.</div>;


    const handleBooking = async () => {
        try {
            const token = await user.getIdToken();

            const res = await axios.post(
                "http://localhost:3000/bookings",
                {
                    vehicleId: id,
                    email: user.email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res);

            setModalMessage("Your booking was successful!");
            setShowModal(true);

            const updated = await axios.get(`http://localhost:3000/vehicles/${id}`);
            setVehicle(updated.data);

        } catch (err) {
            console.log(err);
            setModalMessage(err.response?.data?.message || "Booking failed.");
            setShowModal(true);
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-10 p-6">

            {/* HEADER IMAGE WITH OVERLAY */}
            <div className="relative rounded-3xl shadow-xl overflow-hidden">
                <img
                    src={vehicle.coverImage}
                    alt={vehicle.vehicleName}
                    className="w-full h-[420px] object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80 flex flex-col justify-end p-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                        {vehicle.vehicleName}
                    </h1>
                    <p className="text-indigo-200 font-medium text-lg mt-1">
                        {vehicle.category}
                    </p>
                </div>
            </div>

            {/* MAIN SECTION */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 space-y-8 animate-fadeIn">

                {/* PRICE */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                        ${vehicle.pricePerDay} / day
                    </h2>

                    <span className={`
                        px-4 py-1.5 rounded-full text-white font-semibold text-sm shadow-md
                        ${vehicle.availability === "Available" ? "bg-green-600" : "bg-red-600"}
                    `}>
                        {vehicle.availability}
                    </span>
                </div>

                {/* INFO GRID */}
                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm border flex items-start gap-3">
                        <User className="text-indigo-600" />
                        <div>
                            <h3 className="font-semibold text-gray-700">Owner</h3>
                            <p className="text-gray-600">{vehicle.owner}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm border flex items-start gap-3">
                        <MapPin className="text-indigo-600" />
                        <div>
                            <h3 className="font-semibold text-gray-700">Location</h3>
                            <p className="text-gray-600">{vehicle.location}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl shadow-sm border flex items-start gap-3">
                        <Car className="text-indigo-600" />
                        <div>
                            <h3 className="font-semibold text-gray-700">Type</h3>
                            <p className="text-gray-600">{vehicle.categories}</p>
                        </div>
                    </div>

                </div>

                {/* DESCRIPTION */}
                <div className="p-6 bg-gray-50 rounded-2xl shadow-sm border">
                    <h3 className="font-semibold text-gray-700 text-lg mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {vehicle.description}
                    </p>
                </div>

                {/* BOOK NOW BUTTON */}
                <div className="text-center">
                    <button
                        disabled={vehicle.availability !== "Available"}
                        onClick={handleBooking}
                        className={`px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition-all
                            ${vehicle.availability === "Available" ? "bg-linear-to-r from-indigo-600 to-cyan-600 text-white hover:-translate-y-1" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`
                        }>
                        {vehicle.availability === "Available" ? "Book Now" : "Not Available"}
                    </button>
                </div>

                {/* FOOTER DETAILS */}
                <div className="text-center text-gray-500 text-sm space-y-1">
                    <p className="flex justify-center items-center gap-2">
                        <Calendar size={16} /> Added on: {formatDateTime(vehicle.createdAt)}
                    </p>
                    <p className="flex justify-center items-center gap-2">
                        <Mail size={16} /> Owner Email: {vehicle.userEmail}
                    </p>
                </div>
            </div>
            {
                showModal && (
                    <ConfirmationModal
                        title="Booking Status"
                        message={modalMessage}
                        onClose={() => setShowModal(false)}
                    />
                )
            }
        </div>
    );
};

export default VehicleDetails;