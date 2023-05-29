import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import ViewApplication from './Student/ViewApplication';
import ReactModal from 'react-modal';

export default function Dashboard() {
  // const [showModal, setShowModal] = useState(false);

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  ReactModal.setAppElement('#root'); // Set the app element

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

  const [openApplication, setOpenApplication] = useState('');

  useEffect(() => {
    fetch("http://localhost:3001/view-student-info", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((body) => {
        setOpenApplication(body.open_application);
      });
  }, []);

  function showContent() {
    if (openApplication) {
      return <div className="whole-container">
        <p>You have a pending clearance application.</p>
        <button type="button" className="btn btn-primary"><Link to="/student/view-application" className="nav-link">View Clearance Application</Link></button>
        {/* <ReactModal
          isOpen={showModal}
          contentLabel="View Clearance Application"
          onRequestClose={handleCloseModal}
          appElement={document.getElementById('root')}
        >
          <ViewApplication handleCloseModal={handleCloseModal} />
        </ReactModal> */}
        <br></br>
        <button type="button" className="btn btn-primary" onClick={viewMyInfo}>View My Info</button>
      </div >

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
