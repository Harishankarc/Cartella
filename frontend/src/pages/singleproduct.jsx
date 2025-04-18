import Navbar from "../components/navbar";
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { useState } from "react";

export default function SingleProduct({ products, currentUser }) {
    const navigate = useNavigate();
    const [size, setSize] = useState(null);
    const currentClient = window.localStorage.getItem("currentUser");

    const { id } = useParams();
    const product = products.find((product) => product.id == id);
    const [previewImage, setPreviewImage] = useState(product?.image);

    if (!product) return <div className="text-center mt-10 text-xl font-semibold">No product found!</div>;

    const handleSizeClick = (s) => setSize(s);

    async function handleCartOnClick() {
        const formData = new FormData();
        const blob = await fetch(`data:image/jpeg;base64,${previewImage}`).then(res => res.blob());
        formData.append('image', blob, 'image.jpg');
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('size', size);
        formData.append('rating', product.rating);
        formData.append('user', currentClient);

        axios.post('http://localhost:3000/cartdb', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(() => navigate('/cart'))
          .catch(error => console.log(error));
    }

    return (
        <div className="px-5 md:px-20 h-screen mb-60">
            <Navbar />
            <div className="flex flex-col md:flex-row mt-10 gap-10">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                        <img
                            src={`data:image/jpeg;base64,${product.image}`}
                            alt="Thumbnail"
                            onClick={() => setPreviewImage(product.image)}
                            className="w-20 h-20 object-cover border border-gray-300 rounded cursor-pointer hover:border-black"
                        />
                    </div>
                    <div className="w-full md:w-96 flex justify-center items-start">
                        <img
                            src={`data:image/jpeg;base64,${previewImage}`}
                            alt={product.name}
                            className="w-full max-w-md object-contain border border-gray-200 p-2"
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between ">
                        <h1 className="text-3xl font-semibold">{product.name}</h1>
                        
                    </div>
                    <p className="text-gray-600 text-sm mb-1"><span className="font-semibold text-black">{product.rating}</span> star rating</p>
                    <p className="text-xl font-bold text-gray-700">₹{(product.price) * 20}</p>
                    <p className="text-gray-700">{product.description}</p>
                    <div>
                        <p className="font-medium mb-2">Select Size:</p>
                        <div className="flex gap-2 flex-wrap">
                            {['s', 'm', 'l', 'xl', 'xxl'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleSizeClick(s)}
                                    className={`px-4 py-1 border rounded-full cursor-pointer text-sm font-medium ${size === s
                                            ? ' border-red-500 text-red-500'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {s.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleCartOnClick}
                        className="px-6 py-2 mt-4 rounded-md hover:bg-gray-800 transition cursor-pointer bg-gray-700 border text-white"
                    >
                        Add to Cart
                    </button>
                    <hr className="my-4 border-gray-300" />
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li>✅ 100% Original product</li>
                        <li>💰 Cash on delivery available</li>
                        <li>🔁 Easy returns within 7 days</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

SingleProduct.propTypes = {
    products: PropTypes.array.isRequired,
    currentUser: PropTypes.string.isRequired
};
