import React, { useContext, useState } from 'react';
import travelBg from "../assets/travel-bg.jpg";
import { Link, useNavigate } from "react-router";
import Logo from '../components/Logo';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUP = () => {
    const { googleSignIn, createUserWithEmailAndPasswordFunction, } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const passwordValidation = {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
    };

    const isPasswordValid = Object.values(passwordValidation).every(Boolean);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUP = (e) => {
        e.preventDefault();
        const { name, email, photoURL, password } = formData;
        if (!name || !email || !password) {
            alert("Name, Email & Password are required");
            return;
        }

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            alert("Password must be at least 6 characters and include uppercase, lowercase, and number");
            return;
        }

        createUserWithEmailAndPasswordFunction(email, password)
            .then(() => {
                const newUser = {
                    name: name,
                    email: email,
                    image: photoURL || '/default-Profile.png'
                }

                fetch('https://travel-ease-server-delta.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(() => navigate('/'))
            })
            .catch(error => {
                console.log(error);
            });
    }



    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }

                // create user in the database
                fetch('https://travel-ease-server-delta.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data)
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }

    const signUpForm = (
        <>
            <div className="max-w-sm bg-black/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-2 md:p-4 text-white h-fit flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-center mb-3">
                    Register Now
                </h1>


                {/* Name */}
                <div className="flex flex-col mb-3">
                    <label className="mb-1 text-[12px] md:text-sm">Name</label>
                    <input
                        required
                        type="text"
                        name='name'
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        className="text-[12px] md:text-[14px] lg:text-[16px] px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col mb-3">
                    <label className="mb-1 text-[12px] md:text-sm">Email</label>
                    <input
                        type="email"
                        name='email'
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        className="text-[12px] md:text-[14px] lg:text-[16px] px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none"
                    />
                </div>

                {/* Photo Link */}
                <div className="flex flex-col mb-3">
                    <label className="mb-1 text-[12px] md:text-sm">Photo URL</label>
                    <input
                        type="text"
                        name='photoURL'
                        onChange={handleChange}
                        placeholder="Enter your Photo URL"
                        className="text-[12px] md:text-[14px] lg:text-[16px] px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white placeholder:text-blue-200 focus:outline-none"
                    />
                </div>


                {/* Password */}
                <div className="flex flex-col mb-3">
                    <label className="mb-1 text-[12px] md:text-sm">Password</label>
                    <div className="relative">
                        <input
                            type={show ? "text" : "password"}
                            name="password"
                            onChange={(e) => {
                                handleChange(e);
                                setPassword(e.target.value);
                            }}

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

                <div className="mt-1 text-[10px] sm:[12px] md:text-[16px]">
                    <p className={isPasswordValid ? 'text-green-600' : 'text-white'}>
                        Password must be at least
                        <span className={passwordValidation.length ? 'text-green-600' : 'text-red-500'}> 6 Characters</span> long and have
                        <span className={passwordValidation.uppercase ? 'text-green-600' : 'text-red-500'}> one Uppercase,</span>
                        <span className={passwordValidation.lowercase ? 'text-green-600' : 'text-red-500'}> one Lowercase</span> and
                        <span className={passwordValidation.number ? 'text-green-600' : 'text-red-500'}> one Number</span>
                    </p>
                </div>


                {/* Button */}
                <button
                    onClick={handleSignUP}
                    className="w-full py-3 rounded-xl font-semibold bg-blue-700 hover:bg-blue-800 transition-all">
                    Sign Up
                </button>


                {/* Sign in with Google Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn bg-white text-black border-[#e5e5e5] w-full mt-4">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign-Up with Google
                </button>

                <p className="text-center mt-6 text-sm text-blue-100">
                    Already have an account?{' '}
                    <span className="text-white font-semibold cursor-pointer hover:underline"><Link to='/log-in'>Log In Here</Link></span>
                </p>
            </div>
        </>
    )

    return (
        <div>
            <div className="relative hidden lg:inline-block mx-auto mt-1 md:mt-2">
                {/* Background image */}
                <img
                    src={travelBg}
                    alt="Travel Background"
                    className="block w-auto h-auto rounded-xl"
                />

                <div className="absolute inset-0 bg-black/60 flex justify-center items-center p-2 md:p-4 lg:p-8 rounded-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-6 w-full max-w-6xl">
                        {/* Left side div or theme Context */}
                        <div className="bg-opacity-50 p-2 md:p-4 lg:p-8 rounded h-fit flex-1 w-1/2">
                            <div className="text-xl md:text-3xl lg:text-5xl mb-2 md:mb-3 lg:mb-4">
                                <Logo />
                            </div>
                            <p className="text-white text-[12px] md:text-[16px] lg:text-lg">
                                Join TravelEase and unlock easy access to vehicle rentals, personalized trip management, and fast booking options. Sign up to start adding your own vehicles, managing listings, and enjoying a smoother travel experience.
                            </p>
                        </div>


                        {/* Right side div or Register Now form */}

                        <div className='flex justify-end w-1/2'>
                            {signUpForm}
                        </div>

                    </div>
                </div>
            </div>
            <div
                className="lg:hidden rounded-2xl bg-cover bg-center w-full mt-2.5"
                style={{ backgroundImage: `url(${travelBg})` }}
            >
                {signUpForm}
            </div>
        </div>
    );
};

export default SignUP;