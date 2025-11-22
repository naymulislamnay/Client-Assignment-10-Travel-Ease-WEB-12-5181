import React from 'react';
import { formatDateTime } from '../functionsForGlobalUse/GlobalFunction';

const VehicleCardForAllVehiclePage = ({ vehicle }) => {
    // Dynamic badge color
    const availabilityColor =
        vehicle.availability === "Available"
            ? "bg-green-600"
            : "bg-red-600";

    return (
        <div className="group">
            <div
                className="
                relative flex flex-col bg-white rounded-2xl shadow-md border border-slate-100 
                overflow-hidden transform transition-all duration-300 
                hover:shadow-xl hover:-translate-y-1
            "
            >

                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={vehicle.coverImage}
                        alt="vehicle"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Availability Badge */}
                    <span
                        className={`
                            absolute top-3 left-3 text-white text-xs py-1 px-3 
                            rounded-full shadow-md ${availabilityColor}
                        `}
                    >
                        {vehicle.availability}
                    </span>
                </div>

                {/* Content */}
                <div className="p-2.5">
                    <h2 className="text-slate-900 font-semibold text-xl mb-1 group-hover:text-cyan-600 transition-colors">
                        {vehicle.vehicleName}
                    </h2>
                    <div className='flex items-center gap-1.5'>
                        <div className="badge badge-outline text-[10px]">{vehicle.category}</div>
                        <div className="badge badge-outline text-[10px]">{vehicle.location}</div>
                    </div>
                    <div className='flex items-center gap-1.5 my-2'>
                        <p className="text-lg font-bold text-cyan-700">
                            {vehicle.pricePerDay}$/day
                        </p>
                        <div className="badge badge-outline text-[10px]">Posted by: {vehicle.owner}</div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="badge badge-outline text-[10px]">{formatDateTime(vehicle.createdAt)}</div>
                        <button
                            className="
                            py-2 px-4 rounded-xl bg-cyan-600 text-white text-sm font-medium
                            shadow-md hover:bg-cyan-700 transition-all duration-200
                        "
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCardForAllVehiclePage;
