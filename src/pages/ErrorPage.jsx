import React from "react";
import { Link } from "react-router";
import travelBg from "../assets/travel-bg.jpg"; // same background for consistency

const ErrorPage = () => {
    return (
        <div className="relative flex mx-auto">
            <img
                src={travelBg}
                alt="Travel Background"
                className="block w-full h-auto rounded-xl mx-auto"
            />

            <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-8 rounded-xl text-center">
                <h1 className="text-6xl md:text-7xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                    Page Not Found
                </h2>
                <p className="text-white/80 mb-6 max-w-md">
                    Oops! The page you are looking for doesn’t exist or has been moved.
                    Return to the homepage to continue your travel planning.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;