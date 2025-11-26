import React from 'react';

const NotFound = () => {
    return (
        <div>
            <img src="/Not-Found.png" className='w-fit mx-auto mt-5 md:mt-10 lg:mt-15' alt="" />
            <div className='text-center'>
                <h2 className='text-2xl md:text-[30px] lg:text-[36px] text-[#001931] font-bold'>
                    Oops, Vehicle Not found!
                </h2>
                <p className='text-[10px] md:text-[12px] lg:text-[16px] text-[#627382]'>
                    The Vehicle you are looking for is not available.
                </p>
            </div>
        </div>
    );
};

export default NotFound;