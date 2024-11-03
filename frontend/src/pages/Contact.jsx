import '../styles/Contact.css'
import contactUs from '../assets/contact_us.jpg'
import Navbar from '../components/navbar';
import {motion} from 'framer-motion'

export default function Contact(){
    return(
        <>
            <motion.div className="contact" initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <div className="cart-heading contact-heading">
                    <hr />
                    <h1><span>CONTACT </span>US</h1>
                    <hr />
                </div>
                <div className="content">
                    <img src={contactUs} alt="Contact Us" />
                    <div className="details">
                        <h1>Our Store</h1>
                        <br />
                        <p>Padikkal House</p>
                        <p>(po) Thiruvangad, Thalassery</p>
                        <br />
                        <p>Phone: +91 8129348052</p>
                        <p>Email: charishankar30@gmail.com</p>
                        <br />
                    </div>
                </div>
            </motion.div>
        </>
    );
}