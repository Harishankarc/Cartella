import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from 'axios'
import PropTypes from 'prop-types'
import { MdDeleteOutline } from "react-icons/md";
import '../styles/cart.css'
import { useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
export default function Cart(){
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const currentUser = window.localStorage.getItem("currentUser")
    const [totalAmount,setTotalAmount] = useState(0)
    const [itemCounts, setItemCounts] = useState({});
    useEffect(() => {
        async function fetchData (){
            try {
                const senddata = { user: currentUser };
                const postResponse = await axios.post('http://localhost:3000/cartitems', senddata, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(postResponse.data);
                setCartItems(postResponse.data)
                const initialCounts = postResponse.data.reduce((acc, product) => {
                    acc[product.id] = 1; 
                    return acc;
                }, {});
                setItemCounts(initialCounts);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        
    }, [currentUser]);

    useEffect(() => {
        const total = cartItems.reduce((acc, product) => {
            const count = itemCounts[product.id] || 1;
            return acc + (Number(product.price) * count);
        }, 0);
        setTotalAmount(total);
    }, [cartItems, itemCounts]);

    const handleCountChange = (e, productId) => {
        const newCount = Number(e.target.value);
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [productId]: newCount
        }));
    };
    const HandleDeleteOnClick = async (id) =>{
        const productData = {"id" : id}
        await axios.post('http://localhost:3000/deleteproduct',productData,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data)
            window.location.reload()
        })
        .catch(error => console.log(error))
    }

    async function ProceedOnClick(){
        navigate('/payment')
    }

   console.log(currentUser)
   console.log(cartItems)
    return (
        <>  
            <motion.div className="cart" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <div className="cart-heading">
                    <hr />
                    <h1><span>YOUR </span>CART</h1>
                    <hr />
                </div>
                <div className="cart-items">
                {
                    cartItems.map((product,index)=>{
                        return(
                            <>
                            <div className="cartElement" key={index}>
                                <hr className='mycart-hr'/>
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
                                        <div className="cart-section-2">
                                            <input type="number" className='numberOfItems' min={0} value={itemCounts[product.id]} onChange={(e)=> handleCountChange(e,product.id)}/>
                                        </div>
                                        <div className="cart-section-3">
                                            <MdDeleteOutline size={25} style={{cursor : 'pointer'}} onClick={()=>HandleDeleteOnClick(product.id)}/>
                                        </div>
                                    </div>
                                <hr className='mycart-hr'/>
                            </div>
                            </>
                        );
                    })
                }
                </div>
            </motion.div>
            {
                cartItems.length ? <div className="cart-total">
                <div className="cart-heading cart-total-heading">
                    <hr />
                    <h1><span>CART </span>TOTAL</h1>
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
                <button className="cart-total-button" onClick={ProceedOnClick}>
                    Proceed
                </button>
            </div> : <h1 style={{textAlign:'center',fontWeight:500,color:'rgb(55, 65 ,81)'}}>See Products and add to cart!</h1>
            }
        </>
    );
}
