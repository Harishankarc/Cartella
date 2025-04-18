import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";

export default function Navbar() {
    const login = window.localStorage.getItem("userIsLoggedIn") === "true";
    const [isOpen, setIsOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    function HandleSearchOnClick() {
        setIsOpen(!isOpen);
    }

    function HandleLogOut() {
        window.localStorage.setItem("userIsLoggedIn", false);
        window.localStorage.setItem("currentUser", '');
        window.location.reload();
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
            <div className="navbar border-b-1 pt-5 pb-1 px-5 md:px-20">
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

                    <div className="profile-cart-options flex items-center gap-5">
                        <ul className="flex items-center gap-4">
                            <li>
                                {
                                    login ? (
                                        <Popup
                                            trigger={<div><CgProfile size={20} /></div>}
                                            position="bottom center"
                                            closeOnDocumentClick
                                            closeOnEscape
                                        >
                                            <div>
                                                <p className="text-lg p-2 text-center cursor-pointer" onClick={HandleLogOut}>Log Out</p>
                                            </div>
                                        </Popup>
                                    ) : (
                                        <Popup
                                            trigger={<div><CgProfile size={20} /></div>}
                                            position="bottom center"
                                            closeOnDocumentClick
                                            closeOnEscape
                                        >
                                            <div>
                                                <Link to='/login'><p className="popupText">Login</p></Link>
                                                <Link to='/signup'><p className="popupText">Signup</p></Link>
                                            </div>
                                        </Popup>
                                    )
                                }
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

                    <div className={`fixed bottom-0 right-0 w-screen h-auto rounded-t-xl bg-white z-50 border shadow-3xl ${
                isClosing ? "navbar-ham-animation-out" : "navbar-ham-animation-in"
                    }`}>
                        <ul className="flex flex-col gap-5 p-5 text-gray-700 font-medium">
                            <Link to="/" onClick={HandleDrawerOnClick}><li className="hover:text-black">HOME</li></Link>
                            <Link to="/products" onClick={HandleDrawerOnClick}><li className="hover:text-black">COLLECTION</li></Link>
                            <Link to="/orders" onClick={HandleDrawerOnClick}><li className="hover:text-black">ORDERS</li></Link>
                            <Link to="/contactus" onClick={HandleDrawerOnClick}><li className="hover:text-black">CONTACT</li></Link>
                            {
                                login ?
                                    <li onClick={HandleLogOut} className="cursor-pointer text-red-500">LOGOUT</li> :
                                    <>
                                        <Link to="/login" onClick={HandleDrawerOnClick}><li className="hover:text-black text-lime-950">LOGIN</li></Link>
                                        <Link to="/signup" onClick={HandleDrawerOnClick}><li className="hover:text-black text-lime-950">SIGNUP</li></Link>
                                    </>
                            }
                        </ul>
                    </div>
                </>
            )}
        </>
    );
}
