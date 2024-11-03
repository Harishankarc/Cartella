import Advertisment from "../components/Advertisement";
import Trending from "../components/trending";
import BestSeller from "../components/bestSeller";
import Policy from "../components/policy";
import { motion } from 'framer-motion';

export default function Home(){
    
    return(
        <>
           <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <Advertisment />
                <Trending/>
                <BestSeller/>
                <Policy/>
           </motion.div>
        </>
    );
}

