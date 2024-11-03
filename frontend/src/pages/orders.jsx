import Navbar from '../components/navbar'
import '../styles/orders.css'
import axios from 'axios'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
function Orders() {
    const [cartItems,setCartItems] = useState([])
    const currentUser = window.localStorage.getItem('currentUser')
    useState(()=>{
        async function fetchData(){
            const sendData = {user : currentUser}
            await axios.post('http://localhost:3000/orderedproducts', sendData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(result => {
                setCartItems(result.data)
                console.log(result.data)
            })
            .catch(error => console.log(error))
        }
        fetchData();
    },[])
  return (
    <>
        <motion.div className="orders" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="cart-heading">
                <hr />
                <h1><span>YOUR </span>ORDERS</h1>
                <hr />
            </div>
            <div className="cart-items order-items">
                {
                    cartItems.map((product,index)=>{
                        return(
                            <>
                            <div className="cartElement orderItemElement" key={index}>
                                    <div className="mycart">
                                        <div className="cart-section-1">
                                            <img src={`data:image/jpeg;base64,${product.image}`} alt="image" />
                                            <div className="section-1-details">
                                                <p>{product.name}</p>
                                                <div className="section-1-price">
                                                    <p>₹{product.price}</p>
                                                    <div className="item-sixe-background">
                                                        <p className='item-size'>{(product.size).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                            </div>
                            </>
                        );
                    })
                }
                </div>
        </motion.div>
    </>
  )
}

export default Orders