import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user, updateProfileFunction } = useContext(AuthContext);

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
                setImage(userData?.image || "/default-Profile.png");
                setIsChanged(false);
            })
            .catch(err => {
                console.log('Error fetching user:', err);
            });
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        setShowModal(false);

        try {
            // if using Firebase update
            await updateProfileFunction(name, image);

            await axios.patch(`https://travel-ease-server-delta.vercel.app/users/${user.email}`, {
                name,
                image
            });

            setDbUser(prev => ({ ...prev, name, image }));
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile. Try again.');
            console.log(err);
        }
    };

    return (
        <div className='text-center my-10'>
            <img
                src={dbUser?.image || defaultImage}
                className='w-20 h-20 border border-gray-500 rounded-full mx-auto'
            />
            <h2 className='mt-5'>Name: {dbUser?.name || user?.displayName || "Your Name"}</h2>
            <h2>Email: {user?.email}</h2>

            <button
                onClick={() => setShowModal(true)}
                className="btn btn-soft mt-3 md:mt-5 lg:mt-7.5 bg-linear-to-br from-[#632EE3] to-[#9F62F2] border-none text-white"
            >
                Edit Profile
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 z-50">
                    <div className="bg-white rounded-2xl p-6 w-11/12 md:w-1/3 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-center">Edit Profile</h2>

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
                                    className={`btn border-none rounded-full text-white ${isChanged ? "bg-linear-to-br from-[#632EE3] to-[#9F62F2]" : "bg-gray-400 cursor-not-allowed"}`}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {success && <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade">{success}</div>}
            {error && <div className="fixed top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-fade">{error}</div>}
        </div>
    );
};

export default Profile;