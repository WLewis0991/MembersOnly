import { Link } from "react-router-dom"

export default function Navbar(){


    return(<>
        <nav className="flex justify-between p-3 border-b">
            <Link to="/" className="text-2xl">📝</Link>
            <div className="flex gap-2">
                <Link to="/log-in">Log In</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
        
    </>)
}