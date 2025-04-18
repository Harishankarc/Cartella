import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/userpass')
            .then(result => {
                setAdminEmail(result.data.email);
                setAdminPassword(result.data.password);
                setError(false);
                setIsLoggedIn(true)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleOnClick(e) {
        e.preventDefault();
        if (email === adminEmail && password === adminPassword) {
            navigate('/addproducts');
        } else {
            setError(true);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
            <div className="w-90 rounded-lg bg-purple-900 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h2 className="text-2xl font-medium text-white mt-10">Admin Login</h2>
                </div>
                <form className="mt-4 mx-5 flex flex-col gap-5" onSubmit={handleOnClick}>
                    <div className="">
                        <input
                            className="outline-none rounded-md px-2 py-1 text-slate-500 w-full"
                            placeholder="Username"
                            id="username"
                            name="username"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="outline-none rounded-md px-2 py-1 text-slate-500 w-full"
                            placeholder="Password"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">Invalid email or password</p>}
                    <button
                        className="mb-10 w-full justify-center py-1 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 rounded-md text-white ring-1 cursor-pointer"
                        id="login"
                        name="login"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
