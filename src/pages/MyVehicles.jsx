import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import VehicleCardForAllVehiclePage from '../components/VehicleCardForAllVehiclePage';
import Loader from '../components/Loader';
import DropdownMenu from '../components/DropdownMenu';
import Swal from "sweetalert2";
import { Link } from 'react-router';

const MyVehicles = () => {
    const { user } = useContext(AuthContext);
    const [myVehicles, setMyVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editVehicle, setEditVehicle] = useState(false);
    const [editVehicleId, setEditVehicleId] = useState(null);


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

    const handleAddVehicle = () => {
        setEditVehicle(false);
        setEditVehicleId(null);
        setFormData({
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
        });
        setShowModal(true);
    };


    const handleEditVehicle = (vehicle) => {
        setEditVehicle(true);
        setEditVehicleId(vehicle._id);
        setFormData({
            vehicleName: vehicle.vehicleName,
            owner: vehicle.owner,
            category: vehicle.category,
            pricePerDay: vehicle.pricePerDay,
            location: vehicle.location,
            availability: vehicle.availability,
            description: vehicle.description,
            coverImage: vehicle.coverImage,
            userEmail: vehicle.userEmail,
            createdAt: vehicle.createdAt,
            categories: vehicle.categories,
        });
        setShowModal(true);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await user.getIdToken();

            let url = "https://travel-ease-server-delta.vercel.app/vehicles";
            let method = "POST";

            if (editVehicle) {
                url = `https://travel-ease-server-delta.vercel.app/vehicles/${editVehicleId}`;
                method = "PATCH";
            }

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            setShowModal(false);
            setEditVehicle(false);
            setEditVehicleId(null);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://travel-ease-server-delta.vercel.app/vehicles?userEmail=${user.email}`)
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


    // for delete the vehicle
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to restore this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://travel-ease-server-delta.vercel.app/vehicles/${id}`, {
                        method: "DELETE"
                    });
                    const data = await res.json();
                    console.log(data)

                    setMyVehicles(prev => prev.filter(v => v._id !== id));

                    Swal.fire("Deleted!", "Vehicle has been removed.", "success");
                }
                catch (err) {
                    console.log(err);
                    Swal.fire("Error", "Failed to delete vehicle.", "error");
                }
            }
        });
    };

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-10">
            <div className='flex justify-between items-center mb-2 md:mb-4 lg:mb-6'>
                <h1 className="text-[16px] md:text-xl lg:text-2xl font-bold">My Vehicles</h1>
                {myVehicles.length > 0 && (
                    <button
                        onClick={handleAddVehicle}
                        className="px-2 md:px-3 lg:px-4 py-1 md:py-2 text-[12px] md:text-[14px] lg:text-[16px] bg-linear-to-br from-[#024c58] to-[#07b6d5] text-white rounded-md hover:cursor-pointer"
                    >
                        Add Vehicle
                    </button>
                )}
            </div>

            {/* If NO vehicle found */}
            {myVehicles.length === 0 && (
                <div className="text-center mt-3 md:mt-5 lg:mt-10 flex flex-col justify-center items-center">
                    <h1 className="text-[#046475] text-[20px] md:text-[30px] lg:text-[40px] font-extrabold">You haven’t added any vehicles yet!</h1>
                    <button
                        onClick={handleAddVehicle}
                        className="px-2 md:px-3 lg:px-4 py-1 md:py-2 text-[12px] md:text-[14px] lg:text-[16px] bg-linear-to-br from-[#024c58] to-[#07b6d5] text-white rounded-md hover:cursor-pointer"
                    >
                        Add Vehicle
                    </button>
                </div>
            )}

            {/* If vehicles found */}
            <div className="mt-3 md:mt-5 lg:mt-7.5 p-1 lg:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {myVehicles.map(vehicle => (
                    <div className='relative' key={vehicle._id}>
                        <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id} >
                            <VehicleCardForAllVehiclePage vehicle={vehicle} />
                        </Link>

                        <div className='absolute top-3 right-3'>
                            <DropdownMenu vehicle={vehicle} handleDelete={handleDelete} handleEditVehicle={handleEditVehicle}></DropdownMenu>
                        </div>
                    </div>

                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0  backdrop-blur-lg flex justify-center items-center z-50 p-2 md:p-3 lg:p-4">
                    <div className="w-[750px] bg-black/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-2 md:p-4 lg:p-8 animate-[popup_.25s_ease-out]">

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-2 md:mb-4 lg:mb-6 text-white">
                            {editVehicle ? "Edit Vehicle" : "Add New Vehicle"}
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">

                            <input
                                type="text"
                                name="vehicleName"
                                placeholder="Vehicle Name"
                                required
                                value={formData.vehicleName}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <input
                                type="number"
                                name="pricePerDay"
                                placeholder="Price Per Day"
                                required
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            >
                                <option value="Available">Available</option>
                                <option value="Booked">Booked</option>
                            </select>

                            <input
                                type="text"
                                name="coverImage"
                                placeholder="Cover Image URL"
                                required
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <input
                                type="text"
                                value={formData.owner}
                                disabled
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <input
                                type="email"
                                value={formData.userEmail}
                                disabled
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black"
                            />

                            <input
                                type="text"
                                name="categories"
                                placeholder="Categories (comma separated)"
                                value={formData.categories}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black col-span-2"
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="text-[12px] md:text-[14px] px-2 py-1 rounded-xl bg-white border border-black text-black col-span-2 h-28"
                            ></textarea>

                            <div className="flex justify-between col-span-2 gap-4 mt-2 md:mt-3 lg:mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="text-[12px] md:text-[14px] btn bg-red-500 text-white border-none h-fit py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="text-[12px] md:text-[14px] btn bg-linear-to-br from-[#024c58] to-[#07b6d5] text-white border-none h-fit py-2"
                                >
                                    {editVehicle ? "Update" : "Submit"}
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