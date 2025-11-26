import React from "react";
import Logo from "./Logo";

const About = () => {
    return (
        <section className="py-5 bg-[#f5f6fc]">
            <div className="max-w-4/5 mx-auto px-6 text-center">

                <div className="text-4xl flex items-center gap-1.5 w-fit mx-auto mb-6">
                    <h2 className="font-bold text-[#0b1a51]">
                        About
                    </h2>
                    <div className="bg-black w-fit px-2"><Logo></Logo></div>
                </div>

                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                    At TravelEase, we make your journeys unforgettable. Whether you’re
                    looking for cars, scooters, cargo vans, or campervans, we provide a
                    wide selection of reliable vehicles to fit every adventure.
                </p>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    Our mission is simple: to give you freedom, comfort, and convenience
                    on every ride. With easy booking, transparent pricing, and top-notch
                    customer service, your next trip starts here.
                </p>
                <button className="bg-[#0017C5] hover:bg-[#0013a0] text-white font-semibold px-6 py-3 rounded-md transition">
                    Learn More
                </button>

            </div>
        </section>
    );
};

export default About;