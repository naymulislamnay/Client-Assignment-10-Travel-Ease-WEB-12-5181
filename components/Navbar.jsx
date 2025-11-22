import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, signOutUser } = useAuth();

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('User signed out'))
            .catch(err => console.log(err));
    }

    const navLinkClass = ({ isActive }) => `hover:text-[#07b6d5] ${isActive ? 'text-[#07b6d5] underline' : ''}`;

    return (
        <div className="w-full bg-black/95 backdrop-blur-xl shadow-lg border-b border-white/20">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-6">

                <Link to="/" className="text-3xl font-extrabold text-[#11a7cf]">
                    <Logo></Logo>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-white font-medium">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/vehicles" className={navLinkClass}>All Vehicles</NavLink>
                    {/* <NavLink to="/add-vehicle" className={navLinkClass}>Add Vehicle</NavLink> */}
                    <NavLink to="/my-vehicles" className={navLinkClass}>My Vehicles</NavLink>
                    <NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink>
                </div>


                <div className="flex items-center gap-4">

                    {/* if user is not logged in */}
                    {!user && (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/log-in"
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                            >
                                Login
                            </Link>
                            <Link
                                to="/sign-up"
                                className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 shadow"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* if user is logged in */}
                    {user && (
                        <div className="group cursor-pointer flex gap-1.5">
                            <img
                                src={user.photoURL || '../public/default-Profile.png'}
                                alt={user.displayName} title={user.displayName}
                                className="w-11 h-11 rounded-full border-2 border-white object-cover"
                            />

                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;