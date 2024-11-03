import '../styles/navbar.css'
export default function Navbar(){
    return(
        <>
            <div className="navbar">
                <div className="login-heading">
                    <h1><span>CARTELLA</span></h1>
                </div>
                <button className='logout-button'>
                    <span>Log Out</span>
                </button>
            </div>
        </>
    );
}