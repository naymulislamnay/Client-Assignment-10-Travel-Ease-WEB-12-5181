import React from 'react';
import travelBg from "../assets/travel-bg.jpg";
import { Link } from "react-router";
import Logo from '../../components/Logo';

const SignUP = () => {
    return (
        <div
            className="h-screen bg-cover bg-center flex justify-between items-center mx-auto"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${travelBg})` }}
        >

            {/* Left side div or theme Context */}
            <div className="bg-opacity-50 p-8 rounded h-fit w-1/2">
                <div className='text-5xl mb-4'>
                    <Logo></Logo>
                </div>
                <p className="text-white text-lg">
                    Join TravelEase and unlock easy access to vehicle rentals, personalized trip management, and fast booking options. Sign up to start adding your own vehicles, managing listings, and enjoying a smoother travel experience.
                </p>
            </div>


            {/* Right side div or Register Now form */}
            <div className="max-w-sm bg-black/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 text-white h-fit w-1/2 mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">Register Now</h1>


                {/* Email */}
                <div className="flex flex-col mb-4">
                    <label className="mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none"
                    />
                </div>


                {/* Password */}
                <div className="flex flex-col mb-6">
                    <label className="mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none"
                    />
                </div>


                {/* Button */}
                <button className="w-full py-3 rounded-xl font-semibold bg-blue-700 hover:bg-blue-800 transition-all">
                    Sign Up
                </button>


                {/* Sign in with Google Button */}
                <button className="btn bg-white text-black border-[#e5e5e5] w-full mt-4">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign-Up with Google
                </button>

                <p className="text-center mt-6 text-sm text-blue-100">
                    Already have an account?{' '}
                    <span className="text-white font-semibold cursor-pointer hover:underline"><Link to='/log-in'>Log In Here</Link></span>
                </p>
            </div>
        </div>
    );
};

export default SignUP;