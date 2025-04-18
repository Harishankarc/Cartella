import '../styles/Contact.css'
import contactUs from '../assets/contact_us.jpg'
import Navbar from '../components/navbar';
import { motion } from 'framer-motion'

export default function Contact() {
    return (
        <>
            <div className="md:mx-20 mx-5 min-h-screen" >
                <div className=''>
                    <Navbar />
                </div>
                <div className="md:mt-10 mt-5 md:mb-10">
                    <h1 className='py-2 font-medium text-center md:text-3xl text-xl'><span>CONTACT </span>US</h1>
                    <hr className='md:mx-[40rem] mx-20'/>
                </div>
                <div className=" flex md:flex-row flex-col justify-between items-center px-10 border rounded-sm mt-10 md:mt-0">
                    <img src={contactUs} alt="contactUs" className="md:w-1/2 my-4 rounded-xl" />
                    <div className="flex flex-col border p-5 rounded-xl shadow-xl mb-10 md:mb-0">
                        <h1 className='font-bold text-3xl leading-loose'>Cartella</h1>
                        <p className='text-xl font-medium'>Padikkal House</p>
                        <p className='text-xl font-medium'>(po) Thiruvangad, Thalassery</p>
                        <br />
                        <p className='text-xl font-medium'>Phone: +91 8129348052</p>
                        <p className='text-xl font-medium'>Email: charishankar30@gmail.com</p>
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
}