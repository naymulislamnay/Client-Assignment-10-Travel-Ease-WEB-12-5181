import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { user, signOutUser } = useAuth();

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use((config => {

            const token = user?.accessToken;
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }

            return config;
        }));

        instance.interceptors.response.use(
            res => res,
            error => {
                const status = error.response?.status;
                if (status === 401 || status === 400) {
                    signOutUser().then(() => navigate('/sign-up'));
                }
                return Promise.reject(error);
            }
        );


        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject();
        }

    }, [user, signOutUser, navigate]);

    return instance;
};

export default useAxiosSecure;