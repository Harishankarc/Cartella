import { MdCurrencyExchange } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import '../styles/policy.css'
export default function Policy(){
    return(
        <>
            <div className="mt-40 mb-40 flex flex-col md:flex-row justify-center gap-5 md:gap-40">
                <div className="flex md:flex-col items-center gap-5">
                    <MdCurrencyExchange size={40}/>
                    <div className="md:text-center">
                    <p className="policy1-text1">Easy Exchange Policy</p>
                    <p className="policy1-text2">We offer hassle free exchange policy</p>
                    </div>
                </div>
                <div className="flex md:flex-col items-center gap-5">
                    <BsPatchCheckFill size={40}/>
                    <div className="md:text-center">
                    <p className="policy1-text1">7 Days Return Policy</p>
                    <p className="policy1-text2">We provide 7 days free return policy</p>
                    </div>
                </div>
                <div className="flex md:flex-col items-center gap-5">
                    <BiSupport size={40}/>
                    <div className="md:text-center">
                    <p className="policy1-text1">Best customer support</p>
                    <p className="policy1-text2">we provide 24/7 customer support</p>
                    </div>
                </div>
            </div>
        </>
    );
}