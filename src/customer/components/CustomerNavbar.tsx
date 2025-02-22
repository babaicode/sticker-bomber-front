import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/CustomerNavbar.css';

const CustomerNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            const userId = localStorage.getItem('userId');
            if (userId && userId !== 'undefined') {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        checkLogin();
    }, []);

    return (
        <nav className="navbar">
            {!isLoggedIn && <Link to="/login" className="nav-link">Login</Link>}
            {isLoggedIn && <Link to="/streamer-list" className="nav-link">StreamerList</Link>}
        </nav>
    );
}

export default CustomerNavbar;