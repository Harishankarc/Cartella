import PropTypes  from 'prop-types'
import '../styles/products.css'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import Filteration from '../components/filteration';
export default function Products({products}){
    return(
        <>
            <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} className='products-page'>
                <div className="cart-heading product-heading">
                    <hr />
                    <h1>PRODUCTS</h1>
                    <hr />
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
                <Filteration products={products}/>
                </div>
            </motion.div>
        </>
    );
}
Products.propTypes={
    products:PropTypes.array.isRequired
}