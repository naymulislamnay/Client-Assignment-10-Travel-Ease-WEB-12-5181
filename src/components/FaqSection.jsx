import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "What types of vehicles do you offer for rent?",
        a: "We provide a wide range of vehicles, including sedans, SUVs, microbuses, luxury cars, and minibuses, to meet your personal or business travel needs.",
    },
    {
        q: "How can I book a car?",
        a: "You can book a car online through our website, via phone, or by visiting our office. For urgent bookings, we recommend calling us directly or WhatsApp.",
    },
    {
        q: "Can I rent a car with a driver?",
        a: "Absolutely! We offer chauffeur-driven car rental services for both short and long trips. All our drivers are professional and experienced.",
    },
    {
        q: "How are rental charges calculated?",
        a: "Charges are based on the type of vehicle, rental duration, and travel distance. Additional charges may apply for extra mileage, tolls, or fuel.",
    },
    {
        q: "Do you offer airport pickup and drop-off services?",
        a: "Yes, we provide reliable airport transfer services to and from all major airports in Bangladesh.",
    },
    {
        q: "What happens if the car breaks down during my trip?",
        a: "We provide 24/7 roadside assistance and a replacement vehicle if needed, so your journey is not interrupted.",
    },
    {
        q: "Can I modify or cancel my booking?",
        a: "Yes, you can modify or cancel your booking. However, cancellation fees may apply depending on the notice period.",
    },
];

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-2 sm:py-5 lg:py-7 bg-[#f5f6fc]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Heading */}
                <div className="text-center mb-5 sm:mb-7 lg:mb-9">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#07b6d5]">
                        General FAQ
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Find quick answers to common questions about Maliha Rent a Car services.
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-4 sm:space-y-5">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`relative rounded-xl border transition-all duration-500
                ${isOpen
                                        ? "border-[#07b6d5] shadow-lg"
                                        : "border-gray-200 hover:border-sky-400 hover:shadow-md"
                                    }`}
                            >
                                {/* Accent Bar */}
                                <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-sky-500 to-[#07b6d5]" />

                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full flex items-start sm:items-center gap-3 px-4 sm:px-6 py-4 sm:py-5 text-left"
                                >
                                    <span
                                        className={`font-semibold text-sm sm:text-base transition-colors duration-300
                    ${isOpen ? "text-[#07b6d5]" : "text-gray-800"}`}
                                    >
                                        {faq.q}
                                    </span>

                                    <ChevronDown
                                        className={`w-4 h-4 sm:w-5 sm:h-5 text-[#07b6d5] flex-shrink-0 transition-transform duration-500
                    ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {/* Animated Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                                >
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;