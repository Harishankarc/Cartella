import '../styles/payment.css'
import React from 'react'
import Navbar from '../components/navbar'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiHdfcbank } from "react-icons/si";
import { CgPaypal } from "react-icons/cg";
import { FaGooglePay } from "react-icons/fa";
import { motion } from 'framer-motion';
function Payment() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [orderPlaced, setOrderPlaced] = useState(false)
    const currentUser = window.localStorage.getItem("currentUser")
    useEffect(() => {
        async function fetchData() {
            const sendData = { user: currentUser }
            await axios.post('http://localhost:3000/cartitems', sendData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(result => {
                    // console.log(result.data)
                    setCartItems(result.data)
                })
                .catch(error => console.log(error))
        };
        fetchData();


    }, [currentUser]);
    useEffect(() => {
        const total = cartItems.reduce((amount, item) => {
            return amount + parseFloat(item.price)
        }, 0)
        setTotalAmount(total)
    }, [cartItems])

    async function HandleOrderOnClick() {
        const statusData = { status: 'placed', user: currentUser }
        await axios.post('http://localhost:3000/orderstatus', statusData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                setOrderPlaced(true)
                setTimeout(() => {
                    setOrderPlaced(false)
                }, 2000);
                setTimeout(() => {
                    navigate('/')
                }, 2500)
                console.log(result.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="mb-20 md:mx-20 mx-5 ">
                <div className=''>
                    <Navbar />
                </div>
                <div className="md:mt-10 mt-5 md:mb-10">
                    <h1 className='py-2 font-medium text-center md:text-3xl text-xl'>PAYMENT </h1>
                    <hr className='md:mx-[40rem] mx-20'/>
                </div>
                <div className="flex justify-center items-center">
    <div className="ordersummary bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        {
            cartItems.length ? (
                <>
                    <div className="md:mt-10 mt-5 md:mb-10">
                        <h1 className='py-2 font-medium text-center md:text-3xl text-xl'><span>ORDER </span>SUMMARY</h1>
                        <hr className='' />
                    </div>
                    <div className="subtotal flex justify-between">
                        <p>Total</p>
                        <p>₹{totalAmount}</p>
                    </div>
                    <div className="shippingFee flex justify-between">
                        <p>Shipping Fee</p>
                        {
                            totalAmount < 500 ? <p>₹40</p> : <p>FREE</p>
                        }
                    </div>
                    <div className="subtotal flex justify-between">
                        <p>Sub Total</p>
                        <p>₹{totalAmount < 500 ? totalAmount + 40 : totalAmount}</p>
                    </div>
                    <div className="subtotal flex justify-between">
                        <p>Payment Method</p>
                        <p>{selectedPaymentMethod}</p>
                    </div>
                    <button className="cart-total-button w-full mt-4" onClick={HandleOrderOnClick}>
                        PLACE ORDER
                    </button>
                </>
            ) : (
                <h1 className="text-center font-medium text-gray-700">See Products and add to cart!</h1>
            )
        }
    </div>
</div>

            </div>
            {
                orderPlaced && <div className="modal" >
                    <p>ORDER PLACED</p>
                </div>
            }
        </>
    )
}

export default Payment