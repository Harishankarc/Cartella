import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from 'axios'
import PropTypes from 'prop-types'
import { MdDeleteOutline } from "react-icons/md";
import '../styles/cart.css'
import { useNavigate } from 'react-router-dom'
export default function Cart({user}) {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const [itemCounts, setItemCounts] = useState({});
    useEffect(() => {
        async function fetchData() {
            try {
                const senddata = { user: user };
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

    }, [user]);

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
    const HandleDeleteOnClick = async (id) => {
        const productData = { "id": id }
        await axios.post('http://localhost:3000/deleteproduct', productData, {
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

    async function ProceedOnClick() {
        navigate('/payment')
    }

    console.log(cartItems)
    return (
        <>
            <div className='md:px-20 px-5'>
                <Navbar />
            </div>
            <div className="min-h-screen">
                <div className="md:mt-10 mt-5 mb-10">
                    <h1 className="py-2 font-medium text-center text-3xl"><span>YOUR </span>CART</h1>
                    <hr className="md:mx-[40rem] mx-20" />
                </div>
                {cartItems.length === 0 && <h1 className="text-2xl font-semibold text-center mt-10">Your Cart is Empty</h1>}
                <div className="md:mx-20 mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20 ">
                    {
                        cartItems.map((product, index) => {
                            return (
                                <>
                                    <div className="cartElement border px-5 rounded-lg" key={index}>
                                        <div className="mycart" >
                                            <div className="flex gap-5">
                                                <img src={`data:image/jpeg;base64,${product.image}`} alt="image" className="w-20 rounded-lg" />
                                                <div className="flex flex-col font-semibold justify-between my-2">
                                                    <p>{product.name}</p>
                                                    <div className="section-1-price">
                                                        <p>₹{product.price}</p>
                                                        <div className="flex gap-5">
                                                            <p className='border text-center w-6 rounded-sm'>{(product.size).toUpperCase()}</p>
                                                            <input type="number" className='border focus:outline-none text-center w-6 rounded-sm no-spinner' min={0} value={itemCounts[product.id]} onChange={(e) => handleCountChange(e, product.id)} />
                                                            <MdDeleteOutline size={25} style={{ cursor: 'pointer' }} onClick={() => HandleDeleteOnClick(product.id)} color="red"/>
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
            </div>
            {
                cartItems.length && <div className="md:mx-[40rem] mx-20 mb-40">
                    <div className="md:mt-10 mt-5 md:mb-10">
                        <h1 className="py-2 font-medium text-center md:text-3xl text-xl"><span>CART </span>TOTAL</h1>
                        <hr className="mb-5"/>
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
                        <p>₹{totalAmount < 500 ? totalAmount + 40 : totalAmount}</p>
                    </div>
                    <button className="cart-total-button" onClick={ProceedOnClick}>
                        Proceed
                    </button>
                </div> 
            }
        </>
    );
}
