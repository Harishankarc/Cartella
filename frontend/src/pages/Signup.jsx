import '../styles/login.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Signup(){
    const navigate = useNavigate();
    const [email,setEmail]  = useState("");
    const [password,setPassword]  = useState("");
    function HandleOnClick(e){
        e.preventDefault();
        axios.post('http://localhost:3000/register',{
            email,password
        })
        .then(result => {
            console.log(result)
            navigate('/login')
        })
        .catch(error => console.log(error))
    }
    return(
        <>
            <motion.div className="SignUp" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <div className="form-container">
                    <div className="login-heading">
                        <hr />
                        <h1><span>SIGN UP</span></h1>
                        <hr />
                    </div>
                    <form className="form">
                        <div className="input-group">
                            <input type="email" name="username" id="username" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
                            
                        </div>
                        <div className="input-group">
                            <input type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></input>
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                                <Link to="/login"><a href="#">Have an Account?</a></Link>
                            </div>
                        </div>
                        <button className="sign" onClick={HandleOnClick}>Sign in</button>
                    </form>
                </div>
            </motion.div>
        </>
    );
}