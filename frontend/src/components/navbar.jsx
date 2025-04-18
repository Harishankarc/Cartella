import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
// import { LuUserRound } from "react-icons/lu";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

export default function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [session, setSession] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        async function getCurrentUser() {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                // console.log(error);
            } else {
                setSession(data.user);
                setEmail(data.user.email);
                setName(data.user.user_metadata?.name || "User");
                setUserImage(data.user.user_metadata?.avatar_url || "");
            }
        }
        getCurrentUser();
    }, []);

    async function HandleLogOut() {
        await supabase.auth.signOut();
        setSession(null);
        navigate("/");
    }

    function HandleDrawerOnClick() {
        if (isDrawerOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsDrawerOpen(false);
                setIsClosing(false);
            }, 400);
        } else {
            setIsDrawerOpen(true);
        }
    }

    return (
        <>
            <div className="navbar border-b-1 pt-5 pb-1 px-5 md:px-20 relative">
                <div className="flex justify-between items-center">
                    <div className="logo text-xl font-bold">CARTELLA</div>

                    <div className="nav-items hidden md:block">
                        <ul className="flex gap-8 font-medium">
                            <Link to="/"><li>HOME</li></Link>
                            <Link to='/products'><li>COLLECTION</li></Link>
                            <Link to="/orders"><li>ORDERS</li></Link>
                            <Link to="/contactus"> <li>CONTACT</li></Link>
                        </ul>
                    </div>

                    <div className="profile-cart-options flex items-center gap-5 relative">
                        <ul className="flex items-center gap-4">
                            <li className="relative">
                                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                                    {userImage ? (
                                        <img src={userImage} className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <CgProfile size={20} />
                                    )}
                                </div>

                                {isOpen && (
                                    <div className="absolute top-10 right-0 bg-white p-4 rounded-lg w-auto z-50 shadow-xl border">
                                        <div className="flex flex-row gap-4 items-center mb-4">
                                            {userImage ? (
                                                <img src={userImage} className="w-8 h-8 rounded-full" />
                                            ) : (
                                                <CgProfile size={30} className="text-black" />
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-black text-sm tracking-wider font-medium">{name}</p>
                                                <p className="text-black text-sm tracking-wider">{email}</p>
                                            </div>
                                        </div>
                                        <hr className="border-[#afafaf] border-t-[0.1px] mb-4" />
                                        {session ? (
                                            <button
                                                className="text-center text-sm w-full rounded-md border border-red-900 bg-red-700 px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-red-800"
                                                onClick={HandleLogOut}
                                            >
                                                Sign Out
                                            </button>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-white hover:underline">Login</Link>
                                                <Link to="/signup" onClick={() => setIsOpen(false)} className="text-white hover:underline">Signup</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                            <li>
                                <Link to="/cart">
                                    <PiShoppingCartSimpleBold className="cursor-pointer" size={20} />
                                </Link>
                            </li>
                            <li className="md:hidden">
                                <GiHamburgerMenu size={20} className="cursor-pointer" onClick={HandleDrawerOnClick} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {isDrawerOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={HandleDrawerOnClick}></div>

                    <div className={`fixed bottom-0 right-0 w-screen h-auto rounded-t-xl bg-white z-50 border shadow-3xl ${isClosing ? "navbar-ham-animation-out" : "navbar-ham-animation-in"}`}>
                        <ul className="flex flex-col gap-5 p-5 text-gray-700 font-medium">
                            <Link to="/" onClick={HandleDrawerOnClick}><li className="hover:text-black">HOME</li></Link>
                            <Link to="/products" onClick={HandleDrawerOnClick}><li className="hover:text-black">COLLECTION</li></Link>
                            <Link to="/orders" onClick={HandleDrawerOnClick}><li className="hover:text-black">ORDERS</li></Link>
                            <Link to="/contactus" onClick={HandleDrawerOnClick}><li className="hover:text-black">CONTACT</li></Link>
                            {session ? (
                                <li onClick={HandleLogOut} className="cursor-pointer text-red-500">LOGOUT</li>
                            ) : (
                                <>
                                    <Link to="/login" onClick={HandleDrawerOnClick}><li className="hover:text-black text-lime-950">LOGIN</li></Link>
                                    <Link to="/signup" onClick={HandleDrawerOnClick}><li className="hover:text-black text-lime-950">SIGNUP</li></Link>
                                </>
                            )}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
}
