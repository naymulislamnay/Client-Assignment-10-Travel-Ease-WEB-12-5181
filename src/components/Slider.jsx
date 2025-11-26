import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router';

const Slider = ({ sliderVehicles }) => {
    const loopEnabled = sliderVehicles.length > 1;

    return (
        <div className="my-8">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={loopEnabled}
                spaceBetween={30}
                slidesPerView={1}
                className="rounded-2xl"
            >
                {sliderVehicles.map((vehicle) => (
                    <SwiperSlide key={vehicle._id}>
                        <div className="relative">
                            <img
                                src={vehicle.coverImage}
                                alt={vehicle.vehicleName}
                                className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#000000] via-[#00000090] to-[#00000001] bg-opacity-40 flex items-center justify-center w-[75%]  lg:w-1/2 flex-col">
                                <h2 className="text-white text-[16px] md:text-[20px] lg:text-2xl md:text-3xl font-bold ml-2.5">
                                    {vehicle.vehicleName}
                                </h2>
                                <p className="text-white text-[10px] md:text-[12px] lg:text-[16px] w-3/4">
                                    {vehicle.description}
                                </p>
                                <Link to={`/vehicles/${vehicle._id}`}>
                                    <button className="btn bg-linear-to-br from-[#024c58] to-[#07b6d5] border-none text-[10px] md:text-[13px] lg:text-[16px] text-white mt-2.5">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;