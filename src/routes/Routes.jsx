import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUP from "../pages/SignUP";
import Profile from "../pages/Profile";
import AllVehicles from "../pages/AllVehicles";
import VehicleDetails from "../pages/VehicleDetails";
import MyBookings from "../pages/MyBookings";
import MyVehicles from "../pages/MyVehicles";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AboutDetails from "../components/AboutDetails";
import DashboardLayout from "../layouts/DashboardLayout";

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
                    path: '/vehicles',
                    element: (
                        <AllVehicles></AllVehicles>
                    )
                },
                {
                    path: '/vehicles/:id',
                    element: (
                        <VehicleDetails></VehicleDetails>
                    )
                },
                {
                    path: '/about',
                    element: (
                        <AboutDetails></AboutDetails>
                    )
                }
            ]
        },
        {
            path: 'dashboard',
            element: (
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
            ),
            children: [
                {
                    index: true,  // <-- this will render by default for /dashboard
                    element: <Profile />
                },
                { path: 'profile', element: <Profile /> },
                { path: 'my-bookings', element: <MyBookings></MyBookings> },
                { path: 'my-vehicles', element: <MyVehicles></MyVehicles> },
                { path: 'add-vehicle', element: <MyVehicles></MyVehicles> },
            ],
        },
    ]
)

export default router;