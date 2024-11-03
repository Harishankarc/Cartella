import { useState } from "react";
import axios from 'axios';
import Navbar from "../components/navbar";
import Dashboard from "../components/dashboard";


export default function AddProducts() {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null)
    const [upload,setUpload] = useState(false)
    const [category, setCategory] = useState(null);
    const [size,setSize] = useState(null)
    const [rating,setRating] = useState(null)

    async function handleOnClick() {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('size',size);
        formData.append('rating',rating);

        await axios.post('http://localhost:3000/newItem', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log('product added' , result.data)
        })
        .catch(error => {
            console.log(error)
        });
        console.log(size)
        console.log(rating)
    }
    
    return (
        <>
            <Navbar />
            <div className="addProducts">
                <Dashboard/>
                    <div className="appProduct">
                        <div className="input-details">
                            {
                                upload ? image && <>
                                                    <div className="imagediv">
                                                        <img src={URL.createObjectURL(image)} alt="Selected" className="Selected_image" />
                                                    </div>
                                                  </> 
                                        : 
                                        <>
                                        <input type="file" accept="image/*" style={{display: 'none'}} id="file-input"
                                            onChange={e => {
                                                if (e.target.files[0]) {
                                                    setImage(e.target.files[0]);
                                                    setUpload(true)
                                                }
                                        }} />
                                        <label htmlFor="file-input" className="custom-file-upload"></label>
                                        </>
                            }
                            <div className="productNamePrice">
                                <p>Product name</p>
                                <input type="text" onChange={e => setName(e.target.value)} placeholder="Product name"/>
                                <p>Product description</p>
                                <input type="text" onChange={e => setDescription(e.target.value)} placeholder="Product Details"/>
                                <div className="priceAdd title-heading">
                                    <p>Price</p>
                                    <p>Category</p>
                                    <p>Size</p>
                                </div>
                                <div className="priceAdd">
                                    <input type="number" onChange={e => setPrice(e.target.value)} placeholder="Price" />
                                    <select name="dropdown" id="dropdown" onChange={(e) => setCategory(e.target.value)} defaultValue={"Select"}>
                                        <option value="" disabled selected>Select catagory</option>
                                        <option value="trending">Trending</option>
                                        <option value="normal">Normal</option>
                                        <option value="bestseller">Best Seller</option>
                                    </select>
                                    <select name="dropdown" id="dropdown" onChange={(e) => setSize(e.target.value)} defaultValue={"Select"}>
                                        <option value="" disabled selected>Select size</option>
                                        <option value="s">S</option>
                                        <option value="m">M</option>
                                        <option value="l">L</option>
                                        <option value="xl">XL</option>
                                        <option value="xxl">XXL</option>
                                    </select>
                                </div>
                                <div className="priceAdd">
                                    <p>Rating</p>
                                </div>
                                <div className="priceAdd">
                                    <select name="dropdown" id="dropdown" onChange={(e) => setRating(e.target.value)} defaultValue={"Select"}>
                                        <option value="" disabled selected>Select Rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <button onClick={handleOnClick} className="addButton">Add Item</button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
            </div>
        </>
    );
}
