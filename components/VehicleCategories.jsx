import React from "react";
import Logo from "./Logo";

const VehicleCategories = () => {
    const categories = [
        {
            img: "https://i.ibb.co.com/qLkBCJHd/Car.jpg",
            title: "Cars",
            desc: "Speed things up, and screech off towards your dream destination! Endless possibilities to discover.",
            btn: "Rent a Car",
        },
        {
            img: "https://i.ibb.co.com/qMMh87Tn/Scooter.png",
            title: "Scooters",
            desc: "Have fun discovering your city with a modern scooter! Fast, convenient, and eco-friendly.",
            btn: "Find Your Scooter",
        },
        {
            img: "https://i.ibb.co.com/21XrJ8gq/CargoVan.jpg",
            title: "Cargo Vans",
            desc: "Versatile, safe. More space than ever! Perfect for moving or transporting goods.",
            btn: "Book Now",
        },
        {
            img: "https://i.ibb.co.com/nMnjZ7Pw/Campervans.jpg",
            title: "Campervans",
            desc: "Choose the best views to wake up to each day. Enjoy the #VANLIFE experience!",
            btn: "Discover Campervans",
        },
    ];



    return (
        <div className="py-12 bg-[#f5f6fc]">
            <h2 className="text-center text-3xl font-bold text-[#0b1a51] mb-10">
                Hire vehicle with
                <div className="bg-black w-fit px-3 mx-auto"><Logo></Logo></div>
            </h2>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                {categories.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
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
                        <h3 className="text-xl font-semibold text-[#0b1a51] text-center mb-3">
                            {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-center text-gray-600 text-sm leading-relaxed mb-6">
                            {item.desc}
                        </p>

                        {/* Button */}
                        <div className="flex justify-center">
                            <button className="bg-[#0017C5] hover:bg-[#0013a0] text-white font-semibold text-sm px-6 py-2 rounded-md transition">
                                {item.btn}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleCategories;