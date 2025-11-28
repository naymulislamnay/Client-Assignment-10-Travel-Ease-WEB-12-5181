import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
    {
        name: "Anja S.",
        time: "2 days ago",
        avatar: "A",
        color: "#6A4DF4",
        text: "Great experience with TravelEase. Booking was smooth and the car was clean and comfortable."
    },
    {
        name: "Alex T.",
        time: "1 day ago",
        avatar: "A",
        color: "#0284C7",
        text: "Very friendly service. Pick-up was quick and the car performed perfectly during my trip."
    },
    {
        name: "Damian C.",
        time: "1 day ago",
        image: "https://i.pravatar.cc/50?img=11",
        text: "No hidden charges, no hassle. Drop-off process was super fast. Highly recommended!"
    },
    {
        name: "Sara H.",
        time: "5 hours ago",
        avatar: "S",
        color: "#EF4444",
        text: "Booked a sedan for a family trip. Extremely satisfied with the condition and mileage."
    },
    {
        name: "Jonathan K.",
        time: "3 hours ago",
        avatar: "J",
        color: "#10B981",
        text: "TravelEase made my Dhaka to Cox’s Bazar tour stress-free. Very reliable booking platform."
    },
    {
        name: "Mila R.",
        time: "6 hours ago",
        avatar: "M",
        color: "#F59E0B",
        text: "The SUV I booked was in perfect condition. Customer support was very helpful."
    }
];

const ReviewSlider = () => {
    const [index, setIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(1);

    // Handle responsiveness
    const updateCardCount = () => {
        if (window.innerWidth >= 1024) {
            setCardsToShow(3);
        } else if (window.innerWidth >= 768) {
            setCardsToShow(2);
        } else {
            setCardsToShow(1);
        }
    };

    useEffect(() => {
        updateCardCount();
        window.addEventListener("resize", updateCardCount);
        return () => window.removeEventListener("resize", updateCardCount);
    }, []);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, []);

    const getVisibleReviews = () => {
        return Array.from({ length: cardsToShow }, (_, i) => {
            return reviews[(index + i) % reviews.length];
        });
    };

    return (
        <div className="w-full flex items-center justify-center gap-4 p-4">

            {/* Left Button */}
            <button
                onClick={prevSlide}
                className="w-6 md:w-10 h-6 md:h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Cards */}
            <div className="flex gap-4 overflow-hidden">
                {getVisibleReviews().map((review, i) => (
                    <div
                        key={i}
                        className="w-[300px] md:w-[350px] bg-white rounded-xl border p-2 md:p-3 lg:p-5 shadow-sm"
                    >

                        {/* User Avatar */}
                        <div className="flex items-center gap-3">
                            {review.image ? (
                                <img
                                    src={review.image}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                                    style={{ backgroundColor: review.color }}
                                >
                                    {review.avatar}
                                </div>
                            )}

                            <div>
                                <p className="font-semibold text-gray-800">
                                    {review.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {review.time}
                                </p>
                            </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 my-1 md:my-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-500 text-[12px] md:text-[16px]">★</span>
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-[12px] md:text-[14px] text-gray-700">
                            {review.text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Right Button */}
            <button
                onClick={nextSlide}
                className="w-6 md:w-10 h-6 md:h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100"
            >
                <ChevronRight size={20} />
            </button>

        </div>
    );
};

export default ReviewSlider;