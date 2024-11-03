import '../styles/footer.css'
export default function Footer(){
    return (
        <>
            <div className="footer">
                <div className="section-1">
                    <div className="logo-footer">CARTELLA</div>
                    <p className='footer-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt dicta voluptatibus illum quia similique ullam repellendus quos eum, maiores temporibus possimus itaque tenetur facere eligendi voluptatum ratione beatae ducimus ex.</p>
                </div>
                <div className="section-2">
                    <div className="logo2">COMPANY</div>
                    <ul className='footer-nav'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="section-3">
                    <div className="logo2">GET IN TOUCH</div>
                    <p>+91 8129348052</p>
                    <p>charishankar30@gmail.com</p>
                </div>
            </div>
            <hr className='footer-hr'/>
            <div className="all-right">
                <p>Copyright 2024@ Carella - All Right Reserved.</p>
            </div>
        </>
    );
}