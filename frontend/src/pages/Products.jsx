import PropTypes  from 'prop-types'
import '../styles/products.css'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import Filteration from '../components/filteration';
import Navbar from '../components/navbar';
export default function Products({products}){
    return(
        <>
            
            <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} className='products-page mb-20'>
                <div className='md:px-20 px-5'>
                    <Navbar/>
                </div>
                <div className="md:mt-10 mt-5 md:mb-10">
                    <h1 className='py-2 font-medium text-center text-3xl'>PRODUCTS</h1>
                    <hr className='md:mx-[40rem] mx-20'/>
                </div>
                <br /> 
                <div className='products'>
                {
                    products.map((product,index)=>{
                        return (
                                <Link to={`/products/${product.id}`} key={index}>
                                    <div className="productcard" style={{backgroundColor: "transparent"}}>
                                        <div className="product-image-container">
                                            <img src={`data:image/jpeg;base64,${product.image}`} alt="productimage" className='productimage fixedSize'/>
                                        </div>
                                        <p className="text-title">{(product.name).length > 20 ? (product.name).slice(0,20) + "..." : product.name}</p>
                                        <p className="text-title price">₹{(Number(product.price) * 10).toFixed(2)}</p>
                                    </div>
                                </Link>
                        );
                    })
                }
                {/* <Filteration products={products}/> */}
                </div>
            </motion.div>
        </>
    );
}
Products.propTypes={
    products:PropTypes.array.isRequired
}