import '../styles/login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { motion } from 'framer-motion';


export default function Login({setIsLoggedIn,setCurrentUser}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleOnClick = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        })
        .then(result => {
            console.log(result);
            if (result.data === "success") {
                navigate('/');
                setIsLoggedIn(true);
                setCurrentUser(email)
                window.localStorage.setItem("userIsLoggedIn",true)
                window.localStorage.setItem("currentUser",email)
            }
        })
        .catch(error => {console.error(error);});
    }

    return (
        <>
            <motion.div className="SignUp" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <div className="form-container">
                    <div className="login-heading">
                        <hr />
                        <h1><span>LOGIN</span></h1>
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
                            <div className="forgot">
                                <a href="#">Forgot Password?</a>
                                <Link to="/signup"><a href="#">Create Account</a></Link>

                            </div>
                        </div>
                        <button className="sign" onClick={handleOnClick}>Login</button>
                    </form>
                    
                </div>
            </motion.div>
        </>
    );
}
Login.propTypes ={
    setIsLoggedIn : PropTypes.func.isRequired,
    setCurrentUser : PropTypes.func.isRequired
}