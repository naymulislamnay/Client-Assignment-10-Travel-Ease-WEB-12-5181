import React from "react";

const ConfirmationModal = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center z-50 p-4">
            <div className="w-[450px] bg-black/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8">

                <h2 className="text-2xl font-bold text-center mb-4 text-white">
                    {title}
                </h2>

                <p className="text-white/80 text-center mb-6">
                    {message}
                </p>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ConfirmationModal;
