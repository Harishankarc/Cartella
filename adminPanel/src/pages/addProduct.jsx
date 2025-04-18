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
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black max-h-screen min-h-screen flex text-white">
                    <div className="flex justify-center items-center w-screen">
                        <div className="input-details border-1 border-white p-10 rounded-xl flex gap-10">
                            {
                                upload ? image && <>
                                                    <div className="w-100 h-90 overflow-hidden">
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
                                        <label htmlFor="file-input" className="cursor-pointer bg-white text-black py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none w-100 h-90">Select Image</label>
                                        </>
                            }
                            <div className="flex flex-col gap-5">
                                <input type="text" onChange={e => setName(e.target.value)} placeholder="Product name" className="outline-1 outline-white rounded-md px-2 py-1 text-slate-500 w-full placeholder:text-white h-10"/>
                                <input type="text" onChange={e => setDescription(e.target.value)} placeholder="Product Details" className="outline-1 outline-white rounded-md px-2 py-1 text-slate-500 w-full placeholder:text-white h-10"/>
                                <div className="flex flex-col gap-5">
                                    <input type="number" onChange={e => setPrice(e.target.value)} placeholder="Price" className="outline-1 outline-white rounded-md px-2 py-1 text-slate-500 w-full placeholder:text-white no-spinner h-10"/>
                                    <select name="dropdown" id="dropdown" onChange={(e) => setCategory(e.target.value)} defaultValue={"Select"} className="outline-1 outline-white rounded-md px-2 py-1 text-slate-500 w-full placeholder:text-white h-10">
                                        <option value="" disabled selected>Select catagory</option>
                                        <option value="trending">Trending</option>
                                        <option value="normal">Normal</option>
                                        <option value="bestseller">Best Seller</option>
                                    </select>
                                    <select name="dropdown" id="dropdown" onChange={(e) => setSize(e.target.value)} defaultValue={"Select"} className="outline-1 outline-white rounded-md px-2 py-1 text-slate-500 w-full placeholder:text-white h-10">
                                        <option value="" disabled selected>Select size</option>
                                        <option value="s">S</option>
                                        <option value="m">M</option>
                                        <option value="l">L</option>
                                        <option value="xl">XL</option>
                                        <option value="xxl">XXL</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center gap-5">
                                    <select name="dropdown" id="dropdown" onChange={(e) => setRating(e.target.value)} defaultValue={"Select"} className="outline-1 outline-white rounded-md px-2 py-1 text-slate-500 w-full placeholder:text-white">
                                        <option value="" disabled selected>Select Rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    <button onClick={handleOnClick} className="w-40 justify-center py-1 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 rounded-md text-white ring-1 cursor-pointer">Add Item</button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
            </div>
        </>
    );
}
