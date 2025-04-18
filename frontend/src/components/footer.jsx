import '../styles/footer.css'
export default function Footer() {
    return (
        <>
            <div className="md:mx-20 mx-5">
                <hr className='mb-4' />
                <div className="text-center md:text-left">
                    <div className="font-bold">CARTELLA</div>
                    <p className='text-left'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt dicta voluptatibus illum quia similique ullam repellendus quos eum, maiores temporibus possimus itaque tenetur facere eligendi voluptatum ratione beatae ducimus ex.</p>
                </div>
                <div className='flex justify-between'>
                    <div className="text-center md:text-left mt-5">
                        <div className="font-bold">COMPANY</div>
                        <ul className='footer-nav'>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left mt-5">
                        <div className="font-bold">GET IN TOUCH</div>
                        <p>+91 8129348052</p>
                        <p>charishankar30@gmail.com</p>
                    </div>
                </div>
            </div>
            <hr className='mx-5 md:mx-20 my-2' />
            <div className="">
                <p className='text-center font-medium text-sm mb-2'>Copyright &copy; 2025 Carella - All Right Reserved.</p>
            </div>
        </>
    );
}