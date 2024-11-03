import Navbar from "../components/navbar"
import '../styles/login.css'
import '../styles/singleproduct.css'
import {Link,useParams,useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import { useState } from "react"
import { motion } from "framer-motion"

export default function SingleProduct({products, currentUser}){
    const navigate = useNavigate();
    const [size,setSize] = useState(null)
    const [hoverSize,setHoverSize] = useState(null)
    const currentClient = window.localStorage.getItem("currentUser")
    function HandleSizeOnCLick(e,s){
        setSize(s)
        document.querySelectorAll('.size-label').forEach((label)=>{
            label.style.backgroundColor = 'rgba(107, 114, 128, 0.222)'
        })
        e.target.style.backgroundColor  = 'rgba(107, 114, 128, 0.788)'; 


    }
    
    async function handleCartOnClick(){
        const formData = new FormData;
        const blob = await fetch(`data:image/jpeg;base64,${product.image}`).then(res => res.blob());
        formData.append('image', blob, 'image.jpg');
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('size',product.size);
        formData.append('rating',product.rating);
        formData.append('user',currentClient);
        await axios.post('http://localhost:3000/cartdb', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log('product added to cart data' , result.data)
            navigate('/cart')
        })
        .catch(error => {
            console.log(error)
        });
    }
    const { id } = useParams();
    const product = products.find((product) => product.id == id);
    if(!product){
        return <div>No products found!..</div>
    }
    console.log(product.image)
    return (
        <>  
            <motion.div className="singleproduct" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <div className="sp-section1">
                    <img src={`data:image/jpeg;base64,${product.image}`} alt="product image" />
                </div>
                <div className="sp-section2">
                    <img src={`data:image/jpeg;base64,${product.image}`} alt="product image" />
                </div>
                <div className="sp-section3">
                    <h1 className="sp-product-name">{product.name}</h1>
                    <Rating  size={22} fillColor="red" readonly initialValue={product.rating} emptyColor="pink" className="ratingbox"/>
                    <p className="sp-price">₹{product.price}</p>
                    <p className="sp-description">{product.description}</p>
                    <p>Select Size</p>
                    <div className="size">
                        <input type="checkbox" name="size-s" />
                        <label htmlFor="size-s" className="size-label" onClick={(e)=>HandleSizeOnCLick(e,"s") } style={{ cursor : hoverSize != product.size ? 'not-allowed' : 'pointer' }} onMouseEnter={()=>setHoverSize('s')}>S</label>
                        <input type="checkbox" name="size-m" />
                        <label htmlFor="size-m" className="size-label" onClick={(e)=>HandleSizeOnCLick(e,"m")} style={{ cursor : hoverSize != product.size ? 'not-allowed' : 'pointer' }} onMouseEnter={()=>setHoverSize('m')}>M</label>
                        <input type="checkbox" name="size-l" />
                        <label htmlFor="size-l" className="size-label" onClick={(e)=>HandleSizeOnCLick(e,"l")} style={{ cursor : hoverSize != product.size ? 'not-allowed' : 'pointer' }} onMouseEnter={()=>setHoverSize('l')}>L</label>
                        <input type="checkbox" name="size-xl" />
                        <label htmlFor="size-xl" className="size-label" onClick={(e)=>HandleSizeOnCLick(e,"xl")} style={{ cursor : hoverSize != product.size ? 'not-allowed' : 'pointer' }} onMouseEnter={()=>setHoverSize('xl')}>XL</label>
                        <input type="checkbox" name="size-xxl" />
                        <label htmlFor="size-xxl" className="size-label" onClick={(e)=>HandleSizeOnCLick(e,"xxl")} style={{ cursor : hoverSize != product.size ? 'not-allowed' : 'pointer' }} onMouseEnter={()=>setHoverSize('xxl')}>XXL</label>
                    </div>
                    <button className="sign sp-button" onClick={handleCartOnClick}>Add to cart</button>
                    <hr className="sp-hr"/>
                    <p className="sp-guarantee">100% Original product.</p>
                    <p className="sp-guarantee">Cash on delivery is available on this product.</p>
                    <p className="sp-guarantee">Easy return and exchange policy within 7 days.</p>
                </div>
            </motion.div>
        </>
    );
}
SingleProduct.propTypes={
    products:PropTypes.array.isRequired,
    currentUser:PropTypes.string.isRequired
}