import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import PropTypes  from 'prop-types'


export default function Navbar(){
    const login = window.localStorage.getItem("userIsLoggedIn") === "true"
    const [isOpen,setIsOpen] = useState(false)
    const [isDrawerOpen,setIsDrawerOpen] = useState(false)
    function HandleSearchOnClick(){
        setIsOpen(!isOpen)
    }
    function HandleLogOut(){
        window.localStorage.setItem("userIsLoggedIn",false)
        window.localStorage.setItem("currentUser",'')
        window.location.reload();
    }
    function HandleDrawerOnClick(){
        setIsDrawerOpen(!isDrawerOpen)
    }
    return(
        <>
            <div className="navbar">
                <div className="logo">CARTELLA</div>
                
                <div className="nav-items">
                    <ul>
                        <Link to="/"><li>HOME</li></Link>
                        <Link to='/products'><li>COLLECTION</li></Link>
                        <Link to="/orders"><li>ORDERS</li></Link>
                        <Link to="/contactus"> <li>CONTACT</li></Link>
                    </ul>
                </div>
                <div className="profile-cart-options">
                    <ul>
                        <li>
                                    {
                                login ?     <Popup 
                                trigger={<div className="loginBox">
                                            <CgProfile size={20}/>
                                            
                                            
                                        </div>} 
                                position="bottom center"
                                closeOnDocumentClick
                                closeOnEscape
                                
                                >
                                    <div>
                                        <Link><p className="popupText" onClick={HandleLogOut}>Log Out</p></Link>
                                    </div>
                                </Popup> 
                                            :
                                            <Popup 
                                            trigger={<div className="loginBox">
                                                        <CgProfile size={20}/>
                                                        
                                                    </div>} 
                                            position="bottom center"
                                            closeOnDocumentClick
                                            closeOnEscape
                                            
                                            >
                                                <div>
                                                    <Link to='/login'><p className="popupText">Login</p></Link>
                                                    <Link to='/signup'><p className="popupText">Signup</p></Link>
                                                    
                                                </div>
                                            </Popup>
                            }
                        </li>
                        <li>
                            <div className="cartBox">
                                <Link to="/cart">
                                    <PiShoppingCartSimpleBold className="search-icon" size={20}/>
                                </Link>
                            </div>
                            
                        </li>
                        <li>
                            {
                                !isDrawerOpen ? <div className="hamburger-icon">
                                <Link to="" onClick={HandleDrawerOnClick}>
                                    <RxHamburgerMenu className="search-icon" size={20}/>
                                </Link>
                                </div>
                                :
                                <div className="hamburger-icon">

                                    <Link to="" onClick={HandleDrawerOnClick}>
                                        <div className="hambuger-options">
                                            <div className="close-icon-div">
                                                <IoClose className="search-icon" size={25}/>
                                            </div>
                                            <ul>
                                                <Link to="/"><li>HOME</li></Link>
                                                <Link to='/products'><li>COLLECTION</li></Link>
                                                <Link to="/orders"><li>ORDERS</li></Link>
                                                <Link to="/contactus"> <li>CONTACT</li></Link>
                                                {
                                                    login ? <Link><p className="popupText" onClick={HandleLogOut}>LOG OUT</p></Link> : 
                                                    <>
                                                        <Link to='/login'><p className="popupText">LOGIN</p></Link>
                                                        <Link to='/signup'><p className="popupText">SIGNUP</p></Link>
                                                    </>                     
                                                }

                                                <Link to="/cart"><li>CART</li></Link>

                                            </ul>
                                        </div>
                                    </Link>
                                </div>
                            }
                        </li>
                    </ul>
                </div>
            </div>
            
        </>
    );
}
