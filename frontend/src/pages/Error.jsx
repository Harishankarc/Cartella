import ErrorImage from '../assets/Error.jpg'
import '../styles/error.css'
import { motion } from 'framer-motion';
export default function Error(){
    return (
        <>
            <motion.div className="error" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <h1>Error 404!</h1>
                <img src={ErrorImage} alt="Error" />
            </motion.div>
        </>
    );
}