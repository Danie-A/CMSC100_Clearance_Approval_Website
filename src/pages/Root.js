import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Root() {
  const location = useLocation();
  return (
    <>
      <div className="header-container d-flex justify-content-between align-items-center">
        <p className="header-text">📝 ClearMe</p>
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle"></i>
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
        </ul>
      </nav>
      <Outlet />
    </>
  );
}