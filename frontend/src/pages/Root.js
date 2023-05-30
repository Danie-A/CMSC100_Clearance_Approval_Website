import { Outlet, Link, useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { FaUserCircle, FaCheckSquare } from "react-icons/fa";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";


export default function Root() {
    const location = useLocation();


    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("userType");

    // get openApplication from Dashboard
    const [openApplication, setOpenApplication] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();

    useEffect(() => {
        if (userType === "student") {
            fetch("http://localhost:3001/view-student-info", {
                method: "POST",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((body) => {
                    setOpenApplication(body.open_application);
                });
        }

    }, [location.pathname, userType]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    function logout() {
        const cookies = new Cookies();
        cookies.remove("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userType");
        setIsLoggedIn(false);
        navigate("/");
    }
    // root is clearme logo and the navbar:
    // if user different navbar
    function renderNavBar() {
        if (userType === "student") {
            function showApplicationButton() {
                if (openApplication) {
                    return (
                        <li className={`${location.pathname === "/student/view-application" ? "active" : ""}`}>
                            <Link to="/student/view-application" className="nav-link">
                                View Application
                            </Link>
                        </li>
                    );
                } else {
                    return (
                        <li className={`${location.pathname === "/student/create-application" ? "active" : ""}`}>
                            <Link to="/student/create-application" className="nav-link">
                                Create Application
                            </Link>
                        </li>
                    );
                }
            }
            return (
                <nav>
                    <ul>
                        <li className={`${location.pathname === "/student" ? "active" : ""}`}>
                            <Link to="/student" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className={`${location.pathname === "/student/applications" ? "active" : ""}`}>
                            <Link to="/student/applications" className="nav-link">
                                Applications
                            </Link>
                        </li>
                        <li className={`${location.pathname === "/student/notifications" ? "active" : ""}`}>
                            <Link to="/student/notifications" className="nav-link">
                                Notifications
                            </Link>
                        </li>
                        {showApplicationButton()}
                    </ul>
                </nav>
            );
        } else if (userType === "admin") {
            return (
                <nav>
                    <ul>
                        <li className={`${location.pathname === "/admin/view-pending-applications" ? "active" : ""}`}>
                            <Link to="/admin/view-pending-applications" className="nav-link">
                                View Pending Accounts
                            </Link>
                        </li>
                        <li className={`${location.pathname === "/admin/manage-approvers" ? "active" : ""}`}>
                            <Link to="/admin/manage-approvers" className="nav-link">
                                Manage Approvers
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        } else if (userType === "adviser") {
            return (
                <nav>
                    <ul>
                        <li className={`${location.pathname === "/adviser/view-pending-applications" ? "active" : ""}`}>
                            <Link to="/adviser/view-pending-applications" className="nav-link">
                                View Pending Applications
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        }
    }

    // if approver clearance officer different navbar

    // if approver adviser different navbar

    return (
        <>
            <div className="header-container d-flex justify-content-between align-items-center">
                <div className="header-text">
                    <p>
                        <FaCheckSquare size={24} color={"#5bc0de"} style={{ marginRight: "8px" }} />
                        ClearMe
                    </p>
                </div>
                <div className="d-flex align-items-center">
                    <FaUserCircle size={24} color={"#5bc0de"} />
                    <p className="mr-3 text-white account-name">{username}</p>
                    <button type="button" onClick={logout} className="btn btn-info logout">
                        Log Out
                    </button>
                </div>
            </div>
            {renderNavBar()}
            <Outlet />
        </>
    );
}
