// import { useEffect, useState } from 'react';
import AdImage from '../assets/image1.jpg'

export default function Advertisment(){
     
    return(
        <>
            <div className="advertisement">
               <div className="adTexts">
                    <p>Where Comfort Meets Style</p>
                    <h1>Timeless</h1>
                    <h1>Fashion</h1>
                    <h1>Everyday</h1>
               </div>
                <img src={AdImage} alt="productImage" className="adImage"/>
            </div>
        </>
    );
}