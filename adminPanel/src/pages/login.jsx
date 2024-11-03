import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/login.css'
export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [adminEmail,setAdminEmail] = useState("");
    const [adminPassword,setAdminPassword] = useState("");

    const [Error,setError] = useState(false)

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3000/userpass')
        .then(result => {
            setAdminEmail(result.data.email)
            setAdminPassword(result.data.password)
            setError(false)
        })
        .catch(error=> {
            console.log(error)
            
        });
    },[])

    function HandleOnClick(e){
        e.preventDefault();
        if(email === adminEmail && password === adminPassword){
            navigate('/addproducts')
        }else{
            console.log("password and username doesnt match!")
            setError(true)
        }
    }
    return (
        <>  
        <div className="admin-login">
            <div className="SignUp">
                <div className="form-container">
                    <div className="login-heading">
                        <hr />
                        <h1><span>ADMIN PANNEL </span></h1>
                        <hr />
                    </div>
                    <form className="form">
                        <div className="input-group">
                            <input type="email" name="email" id="email" placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <input type="password" name="password" id="password" placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="sign" onClick={HandleOnClick}>Login</button>
                    </form>
                    
                </div>
                {
                        Error? <p className='Error_text'>Incorrect Username or Password</p> : null
                    }
            </div>
        </div>
        </>
    );
}