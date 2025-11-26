import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="bg-[#e5d0ff] min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="max-w-[1200px] mx-auto w-full grow">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;