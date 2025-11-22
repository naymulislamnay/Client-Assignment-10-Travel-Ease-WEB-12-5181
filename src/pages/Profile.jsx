import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';


const Profile = () => {
    const { user, updateProfileFunction } = useContext(AuthContext);

    const [dbUser, setDbUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isChanged, setIsChanged] = useState(false);

    const defaultImage = "/default-Profile.png";

    useEffect(() => {
        if (!user?.email) return;

        axios.get(`http://localhost:3000/users/${user.email}`)
            .then(res => {
                const userData = res.data;

                setDbUser(userData);
                setName(userData?.name || user.displayName || "");
                setPhotoURL(userData?.photoURL || user.photoURL || "");
                setLoading(false);
                setIsChanged(false);
            })
            .catch(err => {
                console.log('Error Fetching user:', err);
                setLoading(false);
            });
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');

        setShowModal(false);

        try {
            await updateProfileFunction(name, photoURL);

            await axios.patch(`http://localhost:3000/users/${user.email}`, {
                name: name,
                photoURL: photoURL
            });

            setDbUser(prev => ({ ...prev, name, photoURL }));

            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update Profile. Try again.')
            console.log(err)
        }
    };

    return (
        <div className='text-center my-10'>
            <img
                src={dbUser?.photoURL || user?.photoURL || defaultImage}
                className='w-20 h-20 border border-gray-500 rounded-full mx-auto' />
            <h2 className='mt-5'>
                Name: {dbUser?.name || user?.displayName || "Your Name"}
            </h2>

            <h2>
                Email: {user?.email}
            </h2>

            <button
                onClick={() => setShowModal(true)}
                className="btn btn-soft mt-3 md:mt-5 lg:mt-7.5 bg-linear-to-br from-[#632EE3] to-[#9F62F2] border-none text-white">
                Edit Profile
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 z-50">
                    <div className="bg-white rounded-2xl p-6 w-11/12 md:w-1/3 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Edit Profile
                        </h2>

                        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Enter new name"
                                value={name}
                                onChange={(e) => {
                                    const newName = e.target.value;
                                    setName(newName);

                                    setIsChanged(
                                        newName !== (dbUser?.name || user?.displayName || "") ||
                                        photoURL !== (dbUser?.photoURL || user?.photoURL || "")
                                    );
                                }}
                                className="input input-bordered rounded-full py-2 px-3 bg-gray-100"
                            />

                            <input
                                type="text"
                                placeholder="Enter new photo URL"
                                value={photoURL}
                                onChange={(e) => {
                                    const newPhoto = e.target.value;
                                    setPhotoURL(newPhoto);

                                    setIsChanged(
                                        name !== (dbUser?.name || user?.displayName || "") ||
                                        newPhoto !== (dbUser?.photoURL || user?.photoURL || "")
                                    );
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

            {/* confirmation Toast */}
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