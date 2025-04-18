import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'
import Navbar from '../components/navbar'
function Orders() {
    const navigate = useNavigate()
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
        <div className="min-h-screen">
        <div className='md:mx-20 mx-5'>
                    <Navbar />
                </div>
            <div className="md:mt-10 mt-5 md:mb-10">
                <h1 className='py-2 font-medium text-center md:text-3xl text-xl'><span>YOUR </span>ORDERS</h1>
                <hr className='md:mx-[40rem] mx-20'/>
            </div>
            <div className="md:mx-20 mx-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-20 mt-10">
                {
                    cartItems.map((product,index)=>{
                        return(
                            <>
                            <div className="cartElement border px-5 rounded-lg cursor-pointer" key={index} onClick={() => navigate(`/products/${product.id}`)}>
                                        <div className="mycart" >
                                            <div className="flex gap-5">
                                                <img src={`data:image/jpeg;base64,${product.image}`} alt="image" className="w-20 rounded-lg" />
                                                <div className="flex flex-col font-semibold justify-between my-2">
                                                    <p>{product.name}</p>
                                                    <div className="section-1-price">
                                                        <p>₹{product.price}</p>
                                                        <div className="flex gap-5">
                                                            <p className='border text-center w-6 rounded-sm'>{(product.size).toUpperCase()}</p>
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
    </>
  )
}

export default Orders