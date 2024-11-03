import React from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Error from './pages/Error';
import Cart from './pages/cart';
import SingleProduct from './pages/singleproduct';
import Contact from './pages/Contact';
import Payment from './pages/payment';
import Orders from './pages/orders';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion'
import { Route,useLocation,Routes } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Footer from './components/footer';
function AnimatedPages() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(()=>{
      return window.localStorage.getItem("userIsLoggedIn") === "true";
    });
    const [currentUser,setCurrentUser] = useState('');
    useEffect(() => {
      axios.get('http://localhost:3000/products')
          .then(response => {
              setProducts(response.data);
              console.log(response.data)
          })
          .catch(error => {
              console.error("There was an error fetching the products!", error);
          });
    }, []);
    
  return (
    <AnimatePresence>
      <Navbar isLoggedIn={isLoggedIn}/>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} products={products}/>} />
            <Route path='/login' element={isLoggedIn? <Home isLoggedIn={isLoggedIn}/> : <Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser}/>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/products' element={<Products products={products}/>} />
            <Route path='*' element={<Error/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/contactus' element={<Contact/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/products/:id' element={<SingleProduct products={products} currentUser={currentUser}/>} />
        </Routes>
        <Footer/>
    </AnimatePresence>
  )
}

export default AnimatedPages