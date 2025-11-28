import React from "react";
import { Link } from "react-router";
import travelBg from "/travel-bg.jpg";

const ErrorPage = () => {
    return (
        <div className="relative flex mx-auto">
            <img
                src={travelBg}
                alt="Travel Background"
                className="block w-full h-auto rounded-xl mx-auto"
            />

            <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-8 rounded-xl text-center">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-red-500 mb:2 md:mb-3 lg:mb-4">404</h1>
                <h2 className="text-xl md:text-3xl font-semibold text-white mb-2 md:mb-3 lg:mb-4">
                    Page Not Found
                </h2>
                <p className="text-white/80 mb-2 md:mb-3 lg:mb-4 max-w-md text-[12px] md:text-[14px] lg:text-[16px]">
                    Oops! The page you are looking for doesn’t exist or has been moved.
                    Return to the homepage to continue your travel planning.
                </p>
                <Link
                    to="/"
                    className="px-2 md:px-3 lg:px-4 py-1 md:py-2 lg:py-3 bg-green-600 hover:bg-green-700 text-white rounded-sm md:rounded-lg lg:rounded-xl font-semibold transition-all text-[12px] md:text-[14px] lg:text-[16px]"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;