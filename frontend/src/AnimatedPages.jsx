import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, useLocation, Routes, useNavigate,Navigate } from 'react-router-dom'; 
import axios from 'axios';

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
import Footer from './components/footer';

import supabase from './supabaseClient';

function AnimatedPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch products
  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user?.email);
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home products={products} />} />
        <Route path='/login' element={session ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={session ? <Navigate to='/' /> : <Signup />} />
        <Route path='/products' element={<Products products={products} />} />
        <Route path='/products/:id' element={<SingleProduct products={products} />} />
        <Route path='/cart' element={<Cart user={user}/>} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/payment' element={<Payment user={user}/>} />
        <Route path='/orders' element={<Orders />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </AnimatePresence>
  );
}

export default AnimatedPages;
