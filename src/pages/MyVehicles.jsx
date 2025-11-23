import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import VehicleCardForAllVehiclePage from '../../components/VehicleCardForAllVehiclePage';
import Loader from '../../components/Loader';

const MyVehicles = () => {
    const { user } = useContext(AuthContext);
    const [myVehicles, setMyVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);


    const [formData, setFormData] = useState({
        vehicleName: "",
        owner: user?.displayName || "Unknown User",
        category: "",
        pricePerDay: "",
        location: "",
        availability: "Available",
        description: "",
        coverImage: "",
        userEmail: user?.email,
        createdAt: new Date().toISOString(),
        categories: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await user.getIdToken();  // <- await here
            const res = await fetch("http://localhost:3000/vehicles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // now correct
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            setShowModal(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        if (!user?.email) return; // wait for logged-in user

        fetch(`http://localhost:3000/vehicles?userEmail=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyVehicles(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className="px-6 py-10">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-6">My Vehicles</h1>
                {myVehicles.length > 0 && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-linear-to-br from-[#024c58] to-[#07b6d5] text-white rounded-md hover:cursor-pointer h-fit"
                    >
                        Add Vehicle
                    </button>
                )}
            </div>

            {/* If NO vehicle found */}
            {myVehicles.length === 0 && (
                <div className="text-center mt-10 h-screen flex flex-col justify-center items-center">
                    <p className="text-lg mb-4">You have not added any vehicles yet.</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-linear-to-br from-[#024c58] to-[#07b6d5] text-white rounded-md hover:cursor-pointer"
                    >
                        Add Vehicle
                    </button>
                </div>
            )}

            {/* If vehicles found */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myVehicles.map(vehicle => (
                    <VehicleCardForAllVehiclePage key={vehicle._id} vehicle={vehicle} />
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0  backdrop-blur-lg flex justify-center items-center z-50 p-4">
                    <div className="w-[750px] bg-black/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 animate-[popup_.25s_ease-out]">

                        <h2 className="text-3xl font-bold text-center mb-6 text-white">
                            Add New Vehicle
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-2 gap-2"
                        >

                            <input
                                type="text"
                                name="vehicleName"
                                placeholder="Vehicle Name"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <input
                                type="number"
                                name="pricePerDay"
                                placeholder="Price Per Day"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <select
                                name="availability"
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            >
                                <option value="Available">Available</option>
                                <option value="Booked">Booked</option>
                            </select>

                            <input
                                type="text"
                                name="coverImage"
                                placeholder="Cover Image URL"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <input
                                type="text"
                                value={formData.owner}
                                disabled
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <input
                                type="email"
                                value={formData.userEmail}
                                disabled
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none"
                            />

                            <input
                                type="text"
                                name="categories"
                                placeholder="Categories (comma separated)"
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none col-span-2"
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                required
                                onChange={handleChange}
                                className="px-2 py-1 rounded-xl bg-white border border-black text-black placeholder:text-black/50 focus:outline-none col-span-2 h-28"
                            ></textarea>

                            <div className="flex justify-between col-span-2 gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn bg-red-500 border-none text-[10px] md:text-[13px] lg:text-[16px] text-white mt-2.5"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn bg-linear-to-br from-[#024c58] to-[#07b6d5] border-none text-[10px] md:text-[13px] lg:text-[16px] text-white mt-2.5"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}



        </div>
    );
};

export default MyVehicles;