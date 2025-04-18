import { Link,useNavigate } from "react-router-dom";
import '../styles/dashboard.css'

export default function Dashboard({setIsLoggedIn}){
    const navigate = useNavigate()
    function HandleLogOut(){
        setIsLoggedIn(false)
        navigate('/')
    }
    return (
        <>
            <div className="flex justify-center items-center w-screen gap-10 mt-10 ">
                <Link to="/addproducts">
                    <div className="addItem">
                        <p className="text-white uppercase hover:underline-offset-5 hover:underline">Add Items</p>
                    </div>
                </Link>
                <Link to="/addproducts">
                    <div className="listItem">
                        <p className="text-white uppercase hover:underline-offset-5 hover:underline">List Items</p>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="orders">
                        <p className="text-white uppercase hover:underline-offset-5  hover:underline">Orders</p>
                    </div>
                </Link>
                <div className="orders" onClick={HandleLogOut}>
                        <p className="text-red-600 uppercase hover:underline-offset-5  hover:underline">LogOut</p>
                    </div>
            </div>
        </>
    );
}