import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../styles/dashboard.css'

export default function Dashboard(){
    return (
        <>
            <div className="dashboard">
                <Link to="/addproducts">
                    <div className="addItem">
                        <MdOutlineAddCircleOutline size={20}/>
                        <p>Add Items</p>
                    </div>
                </Link>
                <Link to="/addproducts">
                    <div className="listItem">
                        <FaListUl size={20}/>
                        <p>List Items</p>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="orders">
                        <FaListUl size={20}/>
                        <p>Orders</p>
                    </div>
                </Link>
            </div>
        </>
    );
}