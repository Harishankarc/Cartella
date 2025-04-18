import Advertisment from "../components/Advertisement";
import Trending from "../components/trending";
import BestSeller from "../components/bestSeller";
import Policy from "../components/policy";
import { motion } from 'framer-motion';
import Navbar from "../components/navbar";

export default function Home({isLoggedIn}){
    
    return(
        <>
            
            <div className="w-screen pl-5 md:pl-20 pr-5 md:pr-20">
                    <Navbar isLoggedIn={isLoggedIn}/>   
                    <Advertisment />
                    <Trending/>
                    <BestSeller/>
                    <Policy/>
            </div>
        </>
    );
}

