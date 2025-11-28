import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';
import { HiMiniBars3 } from 'react-icons/hi2';

const Navbar = () => {
    const { user, signOutUser } = useAuth();

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('User signed out'))
            .catch(err => console.log(err));
    }

    const navLinkClass = ({ isActive }) => `hover:text-[#07b6d5] ${isActive ? 'text-[#07b6d5] underline' : ''}`;

    const navOptions = (
        <>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/vehicles" className={navLinkClass}>All Vehicles</NavLink>
            <NavLink to="/add-vehicle" className={navLinkClass}>Add Vehicle</NavLink>
            <NavLink to="/my-vehicles" className={navLinkClass}>My Vehicles</NavLink>
            <NavLink to="/my-bookings" className={navLinkClass}>My Bookings</NavLink>
        </>
    )

    return (
        <div className="w-full bg-black/95 backdrop-blur-xl shadow-lg border-b border-white/20 z-100">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between py-2 md:py-3 lg:py-4 px-2 md:px-4 lg:px-6">

                <div className="text-[16px] md:text-xl lg:text-3xl font-extrabold text-[#11a7cf] flex items-center gap-1.5">
                    <div className="dropdown z-10">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden p-1 md:p-4">
                            <HiMiniBars3></HiMiniBars3>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content bg-black rounded-box z-100 mt-3 w-[100px] p-1 sm:p-2 shadow text-white text-[12px]">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/">
                        <Logo></Logo>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8 text-white font-medium text-[12px] lg:text-[16px]">
                    {navOptions}
                </div>


                <div className="flex items-center gap-4">

                    {/* if user is not logged in */}
                    {!user && (
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link
                                to="/log-in"
                                className="px-2 md:px-3 lg:px-4 py-1 md:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow text-[14px] md:text-[16px]"
                            >
                                Login
                            </Link>
                            <Link
                                to="/sign-up"
                                className="px-2 md:px-3 lg:px-4 py-1 md:py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 shadow text-[14px] md:text-[16px]"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* if user is logged in */}
                    {user && (
                        <div className="group cursor-pointer flex items-center gap-1.5">
                            <Link to='/profile'>
                                <img
                                    src={user.photoURL || '/default-Profile.png'}
                                    alt={user.displayName} title={user.displayName}
                                    className="w-8 md:w-11 h-8 md:h-11 rounded-full border md:border-2 border-[#2CFA1F] object-cover"
                                />
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="px-2 md:px-3 lg:px-4 py-1 md:py-2 h-fit rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow text-[14px] md:text-[16px]"
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