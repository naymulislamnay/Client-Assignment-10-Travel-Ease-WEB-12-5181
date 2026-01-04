import React, { useState } from "react";
import { NavLink } from "react-router"; // make sure to use react-router-dom
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import { FaCar, FaPlus } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
    const { user, signOutUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // mobile toggle

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('User signed out'))
            .catch(err => console.log(err));
    }

    // Colors
    const bgColorClass = "bg-[#024c58] text-white";
    const hoverClass = "hover:bg-[#07b6d5] hover:text-white";
    const activeClass = "bg-[#07b6d5] text-[#024c58]";

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="md:hidden flex justify-between items-center p-4 bg-[#024c58] text-white">
                <Logo />
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-screen w-64 z-50 transform 
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    md:translate-x-0 md:static md:flex md:flex-col md:gap-2 p-6
                    ${bgColorClass}
                `}
            >
                {/* Logo */}
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-2 text-2xl font-extrabold text-white mb-6">
                        <Logo />
                    </div>
                </NavLink>

                {/* Dashboard Links */}
                {user && (
                    <>
                        <h3 className="text-white text-xs uppercase tracking-wider mt-6 mb-2">
                            Dashboard
                        </h3>
                        <NavLink
                            to="/dashboard/profile"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${isActive ? activeClass : hoverClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <CgProfile /> Profile
                        </NavLink>
                        <NavLink
                            to="/dashboard/my-bookings"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${isActive ? activeClass : hoverClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <IoMdBookmarks /> My Bookings
                        </NavLink>
                        <NavLink
                            to="/dashboard/my-vehicles"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md transition-colors flex items-center gap-1 ${isActive ? activeClass : hoverClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <FaCar /> My Vehicles
                        </NavLink>
                        <NavLink
                            to="/dashboard/add-vehicle"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md flex items-center gap-1 transition-colors ${isActive ? activeClass : hoverClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <FaPlus /> Add Vehicle
                        </NavLink>

                        {/* Logout */}
                        <button
                            onClick={() => { handleSignOut(); setIsOpen(false); }}
                            className="w-full text-left px-3 py-2 rounded-md text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors mt-4"
                        >
                            <MdOutlineLogout /> Log Out
                        </button>
                    </>
                )}

                {/* Logged-out Links */}
                {!user && (
                    <>
                        <h3 className="text-white text-xs uppercase tracking-wider mt-6 mb-2">
                            Account
                        </h3>
                        <NavLink
                            to="/log-in"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md transition-colors ${isActive ? activeClass : hoverClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            🔑 Log In
                        </NavLink>
                        <NavLink
                            to="/sign-up"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md transition-colors ${isActive ? activeClass : hoverClass}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            📝 Sign Up
                        </NavLink>
                    </>
                )}
            </aside>

            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
        </>
    );
};

export default Sidebar;
