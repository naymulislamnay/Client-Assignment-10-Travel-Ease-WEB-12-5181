import React from "react";
import Logo from "./Logo";
import { Link } from "react-router";

const About = () => {
    return (
        <section className="py-2 md:py-5 bg-[#f5f6fc]">
            <div className="max-w-4/5 mx-auto px-1 md:px-6 text-center">

                <div className="text-xl md:text-[28px] lg:text-4xl flex items-center gap-1.5 w-fit mx-auto mb-3 md:mb-6">
                    <h2 className="font-bold text-[#0b1a51]">
                        About
                    </h2>
                    <div className="bg-black w-fit px-2"><Logo></Logo></div>
                </div>

                <p className="text-gray-700 mb-2 md:mb-4 text-[12px] md:text-[16px] lg:text-lg leading-relaxed">
                    At TravelEase, we make your journeys unforgettable. Whether you’re
                    looking for cars, scooters, cargo vans, or campervans, we provide a
                    wide selection of reliable vehicles to fit every adventure.
                </p>
                <p className="text-gray-700 mb-3 md:mb-6 text-[12px] md:text-[16px] lg:text-lg leading-relaxed">
                    Our mission is simple: to give you freedom, comfort, and convenience
                    on every ride. With easy booking, transparent pricing, and top-notch
                    customer service, your next trip starts here.
                </p>
                <Link to='/about'>
                    <button className="btn bg-linear-to-br from-[#024c58] to-[#07b6d5] border-none lg:text-[16px] text-white my-4 text-[12px] md:text-[16px]">
                        Learn More
                    </button>
                </Link>

            </div>
        </section>
    );
};

export default About;