import React, { useContext, useState } from "react";
import travelBg from "../assets/travel-bg.jpg";
import { Link, useNavigate } from "react-router";
import Logo from "../components/Logo";
import { AuthContext } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LogIn = () => {

    const { signInWithEmailAndPasswordFunction, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogIn = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            alert("Email & Password is Required")
            return;
        }

        signInWithEmailAndPasswordFunction(email, password)
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
                alert('Login Failed! Wrong Email or Password.')
            })
    }

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const logInForm = (
        <>
            <div className="max-w-sm bg-black/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-2 md:p-4 lg:p-8 text-white h-fit flex-1">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-3 md:mb-6">Log In</h1>
                {/* Email */}
                <div className="flex flex-col mb-3 md:mb-4 lg:mb-6">
                    <label className="mb-1 text-[12px] md:text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="text-[12px] md:text-[14px] lg:text-[16px] px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none"
                    />
                </div>


                {/* Password */}
                <div className="flex flex-col mb-3 md:mb-4 lg:mb-6">
                    <label className="mb-1 text-[12px] md:text-sm">Password</label>
                    <div className="relative">
                        <input
                            type={show ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="text-[12px] md:text-[14px] lg:text-[16px] px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none w-full"
                        />
                        <span
                            onClick={() => setShow(!show)}
                            className="absolute top-4.5 right-4 cursor-pointer z-50"
                        >
                            {show ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                </div>


                {/* Button */}
                <button
                    onClick={handleLogIn}
                    className="w-full py-3 rounded-xl font-semibold bg-blue-700 hover:bg-blue-800 transition-all text-[12px] md:text-[14px] lg:text-[16px]">
                    Login
                </button>


                {/* Log in with Google Button */}
                <button
                    onClick={handleGoogleLogIn}
                    className="btn bg-white text-black border-[#e5e5e5] w-full mt-2 md:mt-4 text-[12px] md:text-[14px] lg:text-[16px]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>

                <p className="text-center mt-3 md:mt-4 lg:mt-6 text-sm text-blue-100 text-[12px] md:text-[14px] lg:text-[16px]">
                    Don't have an account?{' '}
                    <span className="text-white font-semibold cursor-pointer hover:underline"><Link to='/sign-up'>Register Now</Link></span>
                </p>
            </div>
        </>
    )

    return (
        <div>
            <div className="relative hidden sm:inline-block mx-auto mt-1 md:mt-2">
                {/* Background image */}
                <img
                    src={travelBg}
                    alt="Travel Background"
                    className="block w-auto h-auto rounded-xl"
                />

                <div className="absolute inset-0 bg-black/60 flex justify-center items-center p-2 md:p-4 lg:p-8 rounded-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-6 w-full max-w-6xl">

                        {/* Left side */}
                        <div className="bg-opacity-50 p-2 md:p-4 lg:p-8 rounded h-fit flex-1 w-1/2">
                            <div className="text-xl md:text-3xl lg:text-5xl mb-2 md:mb-3 lg:mb-4">
                                <Logo />
                            </div>
                            <p className="text-white text-[12px] md:text-[16px] lg:text-lg">
                                Log in to access your personalized dashboard, manage your vehicles, track bookings, and continue your travel planning. Your next journey starts right here.
                            </p>
                        </div>

                        {/* Right side */}
                        <div className="flex justify-end w-1/2">
                            {logInForm}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="sm:hidden rounded-2xl bg-cover bg-center w-full mt-2.5"
                style={{ backgroundImage: `url(${travelBg})` }}
            >
                {logInForm}
            </div>
        </div>
    );
};

export default LogIn;