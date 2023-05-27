import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaCheckSquare } from 'react-icons/fa';
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

export default function Root() {
    const location = useLocation();

    const username = localStorage.getItem("username");
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");

        localStorage.removeItem("username");

        setIsLoggedIn(false);
    }
    // root is clearme logo and the navbar:
    // if user different navbar

    // if admin different navbar

    // if approver clearance officer different navbar

    // if approver adviser different navbar

    // show 'dashboard' from auth_lec

    return (
        <>
            <div className="header-container d-flex justify-content-between align-items-center">
                <div className="header-text">
                    <p><FaCheckSquare size={24} color={'#5bc0de'} style={{ marginRight: '8px' }} />ClearMe</p>
                </div>
                <div className="d-flex align-items-center">
                    <FaUserCircle size={24} color={'#5bc0de'} />
                    <p className="mr-3 text-white account-name">{username}</p>
                    <button type="button" onClick={logout} className="btn btn-info logout">Log Out</button>
                </div>
            </div >
            <nav>
                <ul>
                    <li className={`${location.pathname === "/" ? "active" : ""}`}>
                        <Link to="/student" className="nav-link">Home</Link>
                    </li>
                    <li className={`${location.pathname === "/applications" ? "active" : ""}`}>
                        <Link to="/student/applications" className="nav-link">Applications</Link>
                    </li>
                    <li className={`${location.pathname === "/notifications" ? "active" : ""}`}>
                        <Link to="/student/notifications" className="nav-link">Notifications</Link>
                    </li>
                    <li className={`${location.pathname === "/create-application" ? "active" : ""}`}>
                        <Link to="/student/create-application" className="nav-link">Create Application</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}