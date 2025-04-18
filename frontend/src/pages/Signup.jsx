import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import supabase from '../supabaseClient';
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function handleOnClick(e) {
        e.preventDefault();
        const { error, data } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    'name': name
                }
            }
        });
        if (error) {
            console.log(error);
        } else {
            alert("A confirmation email has been sent to your email address");
            navigate('/login');
        }
    }

    async function HandleGoogleSignUp() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.log(error);
        } else {
            alert("You have successfully signed up with Google");
        }
    }

    return (
        <>
            <div className="px-5 md:px-20">
                <Navbar />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10 px-5 md:px-0">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h1>

                    <form onSubmit={handleOnClick} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-sm focus:outline-none"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-sm focus:outline-none"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border rounded-sm focus:outline-none"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <a href="#" className="hover:underline">Forgot Password?</a>
                            <Link to="/login" className="hover:underline">Already have an account?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition duration-300 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </form>

                    <hr className='my-5' />

                    <button
                        onClick={HandleGoogleSignUp}
                        className="w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition duration-300 cursor-pointer"
                    >
                        <div className='flex justify-center items-center gap-5'>
                            <FcGoogle size={30} />
                            <p>Sign up with Google</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
