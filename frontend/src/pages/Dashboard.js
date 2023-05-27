import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const viewMyInfo = async () => {
    await fetch("http://localhost:3001/view-student-info", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
      });
  };

  const [openApplication, setStudentId] = useState('');

  useEffect(() => {
    fetch("http://localhost:3001/view-student-info", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        setStudentId(body.open_application);
      });
  }, []);

  function showContent() {
    if (openApplication) {
      return <div className="whole-container">
        <p>You have a pending clearance application.</p>
        <button type="button" className="btn btn-primary"><Link to="/student/view-application" className="nav-link">View Clearance Application</Link></button>
        <br></br>
        <button type="button" className="btn btn-primary" onClick={viewMyInfo}>View My Info</button>
      </div>

    } else {
      return <div className="whole-container">
        <p>You have no pending clearance application.</p>
        <button type="button" className="btn btn-primary"><Link to="/student/create-application" className="nav-link">Create Clearance Application</Link></button>
        <br></br>
        <button type="button" className="btn btn-primary" onClick={viewMyInfo}>View My Info</button>
      </div>
    }
  }


  return (
    <>
      {showContent()}
    </>
  );
}
