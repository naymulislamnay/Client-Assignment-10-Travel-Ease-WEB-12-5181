import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/log-in" || location.pathname === "/sign-up";

    return (
        <div className="bg-[#e5d0ff] min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className={`max-w-[1200px] mx-auto w-full grow ${isAuthPage ? "flex-1 flex justify-center items-center" : ""}`}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;