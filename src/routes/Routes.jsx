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
                    element: (
                        <PrivateRoute>
                            <Profile></Profile>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/vehicles',
                    element: (
                        <PrivateRoute>
                            <AllVehicles></AllVehicles>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/vehicles/:id',
                    element: (
                        <PrivateRoute>
                            <VehicleDetails></VehicleDetails>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/my-bookings',
                    element: (
                        <PrivateRoute>
                            <MyBookings></MyBookings>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/my-vehicles',
                    element: (
                        <PrivateRoute>
                            <MyVehicles></MyVehicles>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/add-vehicle',
                    element: (
                        <PrivateRoute>
                            <MyVehicles></MyVehicles>
                        </PrivateRoute>
                    )
                }
            ]
        }
    ]
)

export default router;