import { MdCurrencyExchange } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import '../styles/policy.css'
export default function Policy(){
    return(
        <>
            <div className="policy">
                <div className="policy1">
                    <MdCurrencyExchange size={40}/>
                    <p className="policy1-text1">Easy Exchange Policy</p>
                    <p className="policy1-text2">We offer hassle free exchange policy</p>
                </div>
                <div className="policy2">
                    <BsPatchCheckFill size={40}/>
                    <p className="policy1-text1">7 Days Return Policy</p>
                    <p className="policy1-text2">We provide 7 days free return policy</p>
                </div>
                <div className="policy3">
                    <BiSupport size={40}/>
                    <p className="policy1-text1">Best customer support</p>
                    <p className="policy1-text2">we provide 24/7 customer support</p>
                </div>
            </div>
        </>
    );
}