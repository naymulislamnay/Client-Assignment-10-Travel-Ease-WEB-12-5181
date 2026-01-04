import React from "react";
import Logo from "./Logo";

const VehicleCategories = () => {
    const categories = [
        {
            img: "https://i.ibb.co.com/qLkBCJHd/Car.jpg",
            title: "Cars",
            desc: "Speed things up, and screech off towards your dream destination! Endless possibilities to discover.",
        },
        {
            img: "https://i.ibb.co.com/qMMh87Tn/Scooter.png",
            title: "Scooters",
            desc: "Have fun discovering your city with a modern scooter! Fast, convenient, and eco-friendly.",
        },
        {
            img: "https://i.ibb.co.com/21XrJ8gq/CargoVan.jpg",
            title: "Cargo Vans",
            desc: "Versatile, safe. More space than ever! Perfect for moving or transporting goods.",
        },
        {
            img: "https://i.ibb.co.com/nMnjZ7Pw/Campervans.jpg",
            title: "Campervans",
            desc: "Choose the best views to wake up to each day. Enjoy the #VANLIFE experience!",
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };




    return (
        <div className="py-12 bg-[#f5f6fc]">
            <h2 className="text-center text-3xl font-bold text-[#0b1a51] mb-5 md:mb-10">
                Hire vehicle with
                <div className="bg-black w-fit px-3 mx-auto"><Logo></Logo></div>
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2 md:px-6">
                {categories.map((item, i) => (
                    <div
                        key={i}
                        onClick={scrollToTop}
                        className="bg-white rounded-xl p-3 md:p-6 border border-gray-200 shadow-sm hover:shadow-md hover:scale-105 transition hover:cursor-pointer"
                    >
                        {/* Image */}
                        <div className="flex justify-center mb-6">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-32 object-contain"
                            />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-[#0b1a51] text-center mb-2 md:mb-3">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-center text-gray-600 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleCategories;