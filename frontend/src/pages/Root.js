import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaCheckSquare } from 'react-icons/fa';

export default function Root() {
    const location = useLocation();

    // root is just clearme logo

    // subroot is the navbar:
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
                    <p className="mr-3 text-white account-name">Firstname Lastname</p>
                    <button type="button" className="btn btn-info logout">Log Out</button>
                </div>
            </div >
            <nav>
                <ul>
                    <li className={`${location.pathname === "/" ? "active" : ""}`}>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className={`${location.pathname === "/applications" ? "active" : ""}`}>
                        <Link to="/applications" className="nav-link">Applications</Link>
                    </li>
                    <li className={`${location.pathname === "/notifications" ? "active" : ""}`}>
                        <Link to="/notifications" className="nav-link">Notifications</Link>
                    </li>
                    <li className={`${location.pathname === "/create-application" ? "active" : ""}`}>
                        <Link to="/create-application" className="nav-link">Create Application</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}