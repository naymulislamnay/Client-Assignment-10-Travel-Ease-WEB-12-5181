import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../src/pages/ErrorPage";
import Home from "../src/pages/Home";
import LogIn from "../src/pages/LogIn";
import SignUP from "../src/pages/SignUP";
import Profile from "../src/pages/Profile";
import AllVehicles from "../src/pages/AllVehicles";
import VehicleDetails from "../src/pages/VehicleDetails";
import MyBookings from "../src/pages/MyBookings";
import MyVehicles from "../src/pages/MyVehicles";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout></MainLayout>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                {
                    index: true,
                    element: <Home></Home>
                },
                {
                    path: '/home',
                    element: <Home></Home>
                },
                {
                    path: '/log-in',
                    element: <LogIn></LogIn>
                },
                {
                    path: '/sign-up',
                    element: <SignUP></SignUP>
                },
                {
                    path: '/profile',
                    element: <Profile></Profile>
                },
                {
                    path: '/vehicles',
                    element: <AllVehicles></AllVehicles>
                },
                {
                    path: '/vehicles/:id',
                    element: <VehicleDetails></VehicleDetails>
                },
                {
                    path: '/my-bookings',
                    element: <MyBookings></MyBookings>
                },
                {
                    path: '/my-vehicles',
                    element: <MyVehicles></MyVehicles>
                },
            ]
        }
    ]
)

export default router;