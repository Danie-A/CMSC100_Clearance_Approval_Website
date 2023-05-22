import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

  const renderHomeContent = (status) => {
    if (status === 'Pending') {
      return (
        <>
          <p>You have a pending clearance application.</p>
          <button type="button" class="btn btn-primary">Open Clearance Application</button>
        </>
      );
    } else {
      return (
        <>
          <p>You have no pending clearance application.</p>
          <button type="button" class="btn btn-primary"><Link to="/create-application" className="nav-link">Create Clearance Application</Link></button>
        </>
      );
    }
  };

  return (
    <>
      <div className="whole-container">
        {renderHomeContent('None')}
      </div>
    </>
  );
}