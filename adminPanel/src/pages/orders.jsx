import Dashboard from '../components/dashboard'
import Navbar from '../components/navbar'
import '../styles/orders.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Orders() {

    const [orderItems,setOrderItems] = useState([])
    const [username,setUsername] = useState([])

    useEffect(() => {
        async function fetchUsernameData() {
            try {
                const result = await axios.get('http://localhost:3000/getuser');
                setUsername(result.data);
                console.log(result.data);
            } catch (error) {
                console.log(error);
            }
        }
    
        async function fetchOrderItems() {
            if (username.length === 0) return;
            try {
                
                const allOrders = await Promise.all(
                    username.map(async (users) => {
                        const sendData = { user: users.email };
                        const result = await axios.post('http://localhost:3000/orderedproducts', sendData, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        return result.data; 
                    })
                );
                const newItems = allOrders.flat();
                setOrderItems((prevItems) => {
                    const uniqueItems = [
                        ...prevItems,
                        ...newItems
                    ].filter((item, index, self) =>
                        index === self.findIndex((t) => t.id === item.id)
                    );
                    return uniqueItems;
                });
                console.log(orderItems)
            } catch (error) {
                console.log(error);
            }
        }
        const fetchData = async () => {
            await fetchUsernameData();
            await fetchOrderItems();
        };
        fetchData();
    }, []); 
  return (
    <>  
        <Navbar/>
        <div className="orders">
            <Dashboard />
            <div className="orders-container">
                {
                    orderItems ? orderItems.map((product,index)=>{
                        return(
                            <div className="product" key={index}>
                                <div className="image-container">
                                    <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className='product-image'/>
                                </div>
                                <div className="product-info">
                                    <h2>NAME: {product.name}</h2>
                                    <h2>SIZE: {product.size}</h2>
                                    <h2>PRICE: {product.price}</h2>
                                    <h2>STATUS: {product.status}</h2>
                                    <h2>USER: {product.user}</h2>
                                    <h2>CATEGORY: {product.category}</h2>
                                </div>
                            </div>

                        );
                    }) : <h2>There is no orders yet</h2>
                }
            </div>
        </div>
    </>
  )
}

export default Orders