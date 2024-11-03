import '../styles/payment.css'
import React from 'react'
import Navbar from '../components/navbar'
import { useState,useEffect } from 'react';
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
    const [totalAmount,setTotalAmount] = useState()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [orderPlaced,setOrderPlaced] = useState(false)
    const currentUser = window.localStorage.getItem("currentUser")
    useEffect(() => {
        async function fetchData (){
            const sendData = { user : currentUser }
            await axios.post('http://localhost:3000/cartitems',sendData,{
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
    useEffect(()=>{
        const total = cartItems.reduce((amount,item)=>{
            return amount + parseFloat(item.price)
        },0)
        setTotalAmount(total)
    },[cartItems])

    async function HandleOrderOnClick(){
        const statusData = {status : 'placed', user : currentUser}
        await axios.post('http://localhost:3000/orderstatus',statusData,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            setOrderPlaced(true)
            setTimeout(() => {
                setOrderPlaced(false)
            }, 2000);
            setTimeout(()=>{
                navigate('/')
            },2500)
            console.log(result.data)
        })
        .catch(error => console.log(error))
    }

  return (
    <>
        <motion.div className="payment" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="cart-heading payment-heading">
                <hr />
                <h1><span>PAYMENT </span>METHOD</h1>
                <hr />
            </div>
            <div className="payment-box">
                <div className="payment-optionbox">
                    <ul className='payment-options'>
                        <li>
                            <div className="creditordebit">
                                <h2>Credit Card or Debit Card</h2>
                                <div className="paymentcards">
                                    <FaCcMastercard size={25}/>
                                    <FaCcVisa size={25}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="creditordebit">
                                <h2>Net Banking</h2>
                                <div className="paymentcards">
                                    <SiHdfcbank size={25}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="creditordebit">
                                <h2>Other UPI Apps</h2>
                                <div className="paymentcards">
                                    <CgPaypal size={25}/>
                                    <FaGooglePay size={35}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="creditordebit">
                                <h2 >EMI</h2>
                                <div className="paymentcards">
                                    
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="creditordebit">
                                <h2 onClick={(e)=>{
                                    const presentColor = window.getComputedStyle(e.target).color
                                    if(presentColor === 'rgb(0, 128, 0)'){
                                        e.target.style.color = 'rgb(55, 65 ,81)'
                                        setSelectedPaymentMethod(null)
                                    }else{
                                        e.target.style.color = 'rgb(0, 128, 0)'
                                        setSelectedPaymentMethod((e.target.innerText).slice(0,(e.target.innerText).indexOf('/')))
                                    }
                                    
                                }}>Cash on Delivery/Pay on Delivery</h2>
                                <div className="paymentcards">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="ordersummary">
                {
                    cartItems.length ? <div className="cart-total">
                    <div className="cart-heading cart-total-heading">
                        <hr />
                        <h1><span>ORDER </span>SUMMARY</h1>
                        <hr />
                    </div>
                    <div className="subtotal">
                        <p>Total</p>
                        <p>₹{totalAmount}</p>
                    </div>
                    <div className="shippingFee">
                        <p>Shipping Fee</p>
                        {
                            totalAmount < 500 ? <p>₹40</p> : <p>FREE</p>
                        }
                    </div>
                    <div className="subtotal">
                        <p>Sub Total</p>
                        <p>₹{totalAmount < 500 ? totalAmount+40 : totalAmount}</p>
                    </div>
                    <div className="subtotal">
                        <p>Payment Method</p>
                        <p>{selectedPaymentMethod}</p>
                    </div>
                    <button className="cart-total-button" onClick={HandleOrderOnClick}>
                        PLACE ORDER
                    </button>
                    
                    </div> 
                    : <h1 style={{textAlign:'center',fontWeight:500,color:'rgb(55, 65 ,81)'}}>See Products and add to cart!</h1>
                    }
                    
                </div>
            </div>
        </motion.div>
        {
            orderPlaced && <div className="modal" >
                                <p>ORDER PLACED</p>
                           </div>
        }
    </>
  )
}

export default Payment