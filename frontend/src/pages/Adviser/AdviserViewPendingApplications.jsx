import { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { AiFillFolderOpen } from "react-icons/ai";
import SeeProfile from "./SeeProfile.jsx";

function AdviserViewPendingApplications() {
  // for react modal to view application of student
  const handleOpenModal = index => {
    setShowModal(index);
  };
  const handleCloseModal = async () => {
    setShowModal(-1);
    await fetch("http://localhost:3001/get-students-with-pending-application", {
      method: "GET",
      credentials: "include",
    })
      .then(response => response.json())
      .then(body => {
        setStudents(body.students);
      });
  };

  ReactModal.setAppElement("#root"); // Set the app element
  const [showModal, setShowModal] = useState(-1);
  const [students, setStudents] = useState([]);

  // get advisees with pending applications

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:3001/get-students-with-pending-application", {
        method: "GET",
        credentials: "include",
      })
        .then(response => response.json())
        .then(body => {
          setStudents(body.students);
        });
    }
    fetchData();
  }, []);

  function showStudents() {
    if (students.length > 0) {
      // have students with pending applications

      return (
        <div className="students-container">
          {students.map((student, index) => (
            <div key={index} className="student-item">
              {/* Student Name */}
              <div>
                <p>
                  {student.first_name} {student.last_name}
                </p>
              </div>

              {/* View Application Button */}
              <div>
                <button className="btn btn-primary notifBtn" onClick={() => handleOpenModal(index)}>
                  <AiFillFolderOpen className="mr-2" style={{ marginRight: "8px" }} />
                  View Application
                </button>
              </div>

              {/* Will Pop Up If View Application is Clicked */}
              <ReactModal
                isOpen={showModal === index}
                contentLabel="Remarks"
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={false}
                appElement={document.getElementById("root")} // Set the app element
              >
                <SeeProfile handleCloseModal={handleCloseModal} student={student} />
              </ReactModal>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>You have no advisees with a pending application.</div>;
    }
  }

  return (
    <div className="whole-container">
      <h3>{"View Students with Pending Application"}</h3>
      {showStudents()}
    </div>
  );
}

export default AdviserViewPendingApplications;
