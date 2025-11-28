import React from 'react';

const SearchBox = ({ search, setSearch }) => {
    return (
        <div>
            <label className='input bg-white text-[10px] md:text-[12px] lg:text-[16px] w-[98px] h-fit py-2 px-1'>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type='search'
                    placeholder='Search Vehicles'
                />
            </label>
        </div>
    );
};

export default SearchBox;