import './App.css'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import AddProducts from './pages/addProduct'
import Login from './pages/login';
import Orders from './pages/orders';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/addproducts' element={<AddProducts />}/>
        </Routes>
      </Router>
      
      
    </>
  )
}

export default App
