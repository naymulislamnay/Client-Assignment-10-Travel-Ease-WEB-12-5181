import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user, updateProfileFunction, logOut } = useContext(AuthContext);

    const [dbUser, setDbUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isChanged, setIsChanged] = useState(false);

    const defaultImage = "/default-Profile.png";

    useEffect(() => {
        if (!user?.email) return;

        axios.get(`https://travel-ease-server-delta.vercel.app/users/${user.email}`)
            .then(res => {
                const userData = res.data;
                setDbUser(userData);
                setName(userData?.name || user.displayName || "");
                setImage(userData?.image || defaultImage);
                setIsChanged(false);
            })
            .catch(err => console.log('Error fetching user:', err));
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setShowModal(false);

        try {
            await updateProfileFunction(name, image);
            await axios.patch(`https://travel-ease-server-delta.vercel.app/users/${user.email}`, { name, image });
            setDbUser(prev => ({ ...prev, name, image }));
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Try again.');
            console.log(err);
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log("Logout failed:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-[#024c58] to-[#07b6d5] p-6 rounded-2xl shadow-lg text-white">
                <img
                    src={dbUser?.image || defaultImage}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                />
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-extrabold">{dbUser?.name || user?.displayName || "Your Name"}</h1>
                    <p className="text-sm md:text-base mt-1">{user?.email}</p>
                    <div className="flex flex-col md:flex-row justify-center md:justify-start gap-3 mt-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn bg-linear-to-br from-[#024c58] to-[#07b6d5] border-none text-[12px] md:text-[14px] lg:text-[16px] text-white rounded-full px-4 py-2"
                        >
                            ✏️ Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn bg-red-600 hover:bg-red-700 border-none text-[12px] md:text-[14px] lg:text-[16px] text-white rounded-full px-4 py-2"
                        >
                            🚪 Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats / Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#024c58]">
                    <h3 className="text-[#024c58] font-semibold mb-2">Membership Level</h3>
                    <p className="text-gray-700">Gold Member</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#07b6d5]">
                    <h3 className="text-[#07b6d5] font-semibold mb-2">Total Bookings</h3>
                    <p className="text-gray-700">{dbUser?.bookings?.length || 0}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#024c58]">
                    <h3 className="text-[#024c58] font-semibold mb-2">Vehicles Added</h3>
                    <p className="text-gray-700">{dbUser?.vehicles?.length || 0}</p>
                </div>
            </div>

            {/* Static Info Section */}
            <div className="mt-10 bg-gradient-to-br from-[#07b6d5] to-[#024c58] text-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Welcome to TravelEase!</h2>
                <p className="text-sm md:text-base">
                    As a valued member, you can easily manage your bookings, add your vehicles for rent, and explore the best travel options. Enjoy seamless rides with transparent pricing and top-notch support. 🚗✨
                </p>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50">
                    <div className="bg-white rounded-2xl p-6 w-11/12 md:w-1/3 shadow-lg">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Edit Profile</h2>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Enter new name"
                                value={name}
                                onChange={(e) => {
                                    const newName = e.target.value;
                                    setName(newName);
                                    setIsChanged(newName !== (dbUser?.name || ""));
                                }}
                                className="input input-bordered rounded-full py-2 px-3 bg-gray-100"
                            />
                            <input
                                type="text"
                                placeholder="Enter new image URL"
                                value={image}
                                onChange={(e) => {
                                    const newImage = e.target.value;
                                    setImage(newImage);
                                    setIsChanged(newImage !== (dbUser?.image || ""));
                                }}
                                className="input input-bordered rounded-full py-2 px-3 bg-gray-100"
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn bg-gray-300 text-black border-none rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isChanged}
                                    className={`btn border-none rounded-full text-white ${isChanged
                                            ? "bg-linear-to-br from-[#024c58] to-[#07b6d5]"
                                            : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success & Error Toast */}
            {success && (
                <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade">
                    {success}
                </div>
            )}
            {error && (
                <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-fade">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Profile;
