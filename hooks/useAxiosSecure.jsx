import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const instance = axios.create({
    baseURL: 'http://localhost:3000',

});

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();

    return (
        <div>

        </div>
    );
};

export default useAxiosSecure;