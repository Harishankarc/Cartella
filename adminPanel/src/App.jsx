import './App.css'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import AddProducts from './pages/addProduct'
import Login from './pages/login';
import Orders from './pages/orders';
import Dashboard from './components/dashboard';
import { useState } from 'react';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  return (
    <>
      <Router>
        <div className='absolute top-0'>
          <Dashboard setIsLoggedIn={setIsLoggedIn}/>
        </div>
        <Routes>
          <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
          {isLoggedIn ? <Route path='/orders' element={<Orders />}/> : null}
          {isLoggedIn ? <Route path='/addproducts' element={<AddProducts />}/> : null}
        </Routes>
      </Router>
      
      
    </>
  )
}

export default App
