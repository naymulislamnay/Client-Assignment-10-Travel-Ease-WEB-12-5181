import React from "react";
import { FaCar, FaHandHoldingHeart, FaGift } from "react-icons/fa";

const WebBenefits = () => {
    const benefits = [
        {
            icon: <FaCar className="text-3xl text-gray-700" />,
            title: "Exclusive web benefits",
            desc: "Fast Track priority, Premium Cover, Pets Friendly Pack and much more!"
        },
        {
            icon: <FaHandHoldingHeart className="text-3xl text-gray-700" />,
            title: "Free cancellation",
            desc: "Modify or cancel your booking free of charge with Premium or Standard rate"
        },
        {
            icon: <FaGift className="text-3xl text-gray-700" />,
            title: "Upgraded fleet every year",
            desc: "Take a break from routine with the latest vehicle models on the market"
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-[#f5f6fc] py-5 md:py-10 flex justify-center gap-2 md:gap-5 lg:gap-10 flex-wrap px-2">
            {benefits.map((item, i) => (
                <div
                    key={i}
                    onClick={scrollToTop}
                    className="bg-white max-w-[360px] text-center px-6 py-6 rounded-xl shadow-sm hover:shadow-md transition hover:scale-105 hover:cursor-pointer"
                >
                    <div className="mb-3 flex justify-center">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-tight">{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default WebBenefits;