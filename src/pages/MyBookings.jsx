import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import VehicleCardForAllVehiclePage from "../../components/VehicleCardForAllVehiclePage";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookedVehicles, setBookedVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchBookings = async () => {
            try {
                setLoading(true);
                const token = await user.getIdToken();

                const res = await axios.get(`http://localhost:3000/my-bookings?email=${user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setBookedVehicles(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const handleRelease = async (vehicleId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to release this vehicle?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, release it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = await user.getIdToken();

                    await axios.delete(`http://localhost:3000/bookings/${vehicleId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setBookedVehicles(prev =>
                        prev.filter(vehicle => vehicle._id !== vehicleId)
                    );

                    Swal.fire("Released!", "Vehicle has been released.", "success");
                }
                catch (err) {
                    console.log(err);
                    Swal.fire("Error", "Failed to release vehicle.", "error");
                }
            }
        });
    };


    if (loading) return <Loader></Loader>;

    return (
        <div className="px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
            <div className="mt-3 md:mt-5 lg:mt-7.5 p-1 lg:p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {bookedVehicles.length === 0 ? (
                    <h1 className="col-span-4 text-center text-[#046475] text-[40px] font-extrabold">You haven’t booked any vehicles yet!</h1>
                ) : (
                    bookedVehicles.map(vehicle => (
                        <div className='relative' key={vehicle._id}>
                            <Link to={`/vehicles/${vehicle._id}`} key={vehicle._id} >
                                <VehicleCardForAllVehiclePage vehicle={vehicle} />
                            </Link>

                            <div className="absolute top-3 left-3">
                                <button
                                    onClick={() => handleRelease(vehicle._id)}
                                    className="py-2 px-4 rounded-xl bg-red-600 text-white text-sm font-medium shadow-md hover:bg-red-700 transition-all duration-200 hover:cursor-pointer"
                                >
                                    Release
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookings;