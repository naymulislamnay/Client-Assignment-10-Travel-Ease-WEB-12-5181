import React from 'react';
import Logo from './Logo';

const AboutDetails = () => {
    return (
        <section className="bg-gradient-to-b from-[#f5f6fc] to-white py-14 sm:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="text-xl md:text-[28px] lg:text-4xl flex items-center gap-1.5 w-fit mx-auto mb-3 md:mb-6">
                        <h2 className="font-bold text-[#0b1a51]">
                            About
                        </h2>
                        <div className="bg-black w-fit px-2"><Logo></Logo></div>
                    </div>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
                        Your journey starts with comfort, flexibility, and confidence.
                    </p>
                </div>

                {/* Intro Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 mb-14 border border-gray-100">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center">
                        At <span className="font-semibold text-sky-600">TravelEase</span>, we make your journeys unforgettable.
                        Whether you’re looking for cars, scooters, cargo vans, or campervans,
                        we provide a wide selection of reliable vehicles to fit every adventure.
                        <br /><br />
                        Our mission is simple: to give you <strong>freedom, comfort, and convenience</strong> on every ride.
                        With easy booking, transparent pricing, and top-notch customer service,
                        your next trip starts here.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#024c58] to-[#078da5] text-white shadow-lg">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Mission</h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                            To simplify travel by providing reliable vehicles, transparent pricing,
                            and a seamless rental experience that puts customers first.
                        </p>
                    </div>

                    <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-l from-[#024c58] to-[#078da5] text-white shadow-lg">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3">Our Vision</h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                            To become a trusted travel partner for people everywhere—empowering
                            them to explore freely, travel comfortably, and move with confidence.
                        </p>
                    </div>
                </div>

                {/* What We Offer */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[#0b1a51]">
                        What We Offer
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Cars & Scooters", desc: "Perfect for daily travel and city rides." },
                            { title: "Cargo Vans", desc: "Reliable transport solutions for business needs." },
                            { title: "Campervans", desc: "Freedom-packed vehicles for long road adventures." },
                            { title: "Easy Booking", desc: "Quick, simple, and hassle-free reservations." },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                            >
                                <h4 className="text-lg font-semibold text-[#07b6d5] mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-[#f5f6fc] rounded-2xl p-6 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#0b1a51]">
                        Why Choose TravelEase?
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm sm:text-base">
                        {[
                            "Well-maintained & trusted vehicles",
                            "Transparent pricing with no hidden fees",
                            "Flexible rental options",
                            "Customer-first support team",
                            "Simple & secure booking process",
                            "Commitment to safety & reliability",
                        ].map((point, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-3"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                                <span className="text-gray-700">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0b1a51] mb-4">
                        Start Your Journey With TravelEase
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        Whether it’s business, adventure, or everyday travel — we’ve got you covered.
                    </p>
                    <button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#024c58] to-[#078da5] text-white font-semibold shadow-md hover:shadow-lg transition-all">
                        Explore Vehicles
                    </button>
                </div>

            </div>
        </section>
    );
};


export default AboutDetails;