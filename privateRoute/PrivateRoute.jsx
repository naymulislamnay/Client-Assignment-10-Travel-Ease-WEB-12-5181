import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    if (loading) {
        return <span className='loading loading-spinner text-success'></span>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to='/log-in'></Navigate>;
};

export default PrivateRoute;