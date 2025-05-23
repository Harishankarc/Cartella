import '../styles/trending.css'
import '../styles/products.css'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function BestSeller(){
    const [bestSeller,setBestSeller] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/bestseller')
        .then(response => {
            setBestSeller(response.data)
        })
        .catch(error => console.log(error))
    },[])
    return(
        <>  
            <div className="mt-10">
                <div className="">
                    <h1 className='py-2 font-bold text-center md:text-3xl'><span>BEST</span> SELLER</h1>
                    <hr className='md:mx-90 mx-20' />
                </div>
                <p className='text-center my-4 md:mt-10'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ad omnis deserunt accusamus esse incidunt possimus velit optio beatae distinctio ab totam ipsam, debitis dolore voluptatum enim impedit. Fuga, beatae.
                </p>
                <div className='products'>
                    {
                        bestSeller.map((product,index)=>{
                            return (
                                <Link to={`/products/${product.id}`} key={index}>
                                    <div className="card">
                                        <div className="product-image-container">
                                            <img src={`data:image/jpeg;base64,${product.image}`} alt="productimage" className='productimage fixedSize'/>
                                        </div>
                                        <p className="text-title">{(product.name).length > 20 ? (product.name).slice(0,20) + "..." : product.name}</p>
                                        <p className="text-title price">₹{(Number(product.price)).toFixed(2)}</p>
                                    </div>
                                </Link>
                            );  
                        })
                    }
                </div>
            </div>
        </>
    );
}