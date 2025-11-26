import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

const Footer = () => {
    return (
        <div className="bg-black mt-3">
            <div className="max-w-[1200px] mx-auto pt-5 sm:pt-8 md:pt-12 pb-3 p-2.5">
                <div className="flex justify-between flex-col md:flex-row gap-1.5 text-[12px] text-[#A1A1AA] text-center md:text-left">
                    <div className="w-full md:max-w-[25%] px-1.5">
                        <Link to='/' className="text-[30px] hover:cursor-pointer w-fit md:mx-0">
                            <Logo></Logo>
                        </Link>
                        <p>
                            TravelEase is your reliable partner for seamless vehicle booking and trip management. Explore a wide range of vehicles, manage your bookings, and enjoy safe, comfortable travel—anytime, anywhere. We aim to make every journey effortless, affordable, and convenient.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Company</h2>
                        <p className="mt-0 md:mt-2.5"><a href="">About Us</a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">Our Mission</a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">Contact Sales</a></p>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Services</h2>
                        <p className="mt-0 md:mt-2.5"><a href="">Products & Services</a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">Customer Stories</a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">Download Apps</a></p>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Information</h2>
                        <p className="mt-0 md:mt-2.5"><a href="">Privacy Popcy</a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">Terms & Conditions</a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">Join Us</a></p>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Social Links</h2>
                        <p className="mt-0 md:mt-2.5"><a href="">
                            @linkedin.TravelEase.bd
                        </a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">
                            @facebook.TravelEase.bd
                        </a></p>
                        <p className="mt-0 md:mt-2.5"><a href="">
                            support@TravelEase.com
                        </a></p>
                    </div>
                </div>
                <hr className="text-[#5e5e5e] mt-2.5 md:mt-8" />
                <p className="text-[#A1A1AA] text-center text-[12px] mt-3">© 2025 TravelEase All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;