import { Link } from "react-router-dom"

export default function Navbar(){


    return(<>
        <nav className="flex justify-around items-center p-3 shadow">
            <Link to="/" className="text-2xl text-center">🔐 Members Only</Link>
            <div className="flex gap-2">
                <Link to="/log-in" className="border rounded p-2">Log In</Link>
                <Link to="/register" className="bg-blue-500 text-white rounded p-2">Register</Link>
            </div>
        </nav>
        
    </>)
}