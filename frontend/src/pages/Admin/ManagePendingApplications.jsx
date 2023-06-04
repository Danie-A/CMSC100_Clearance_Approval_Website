import { useState, useEffect } from "react";
import ReactModal from "react-modal";

function ManagePendingApplications() {
  ReactModal.setAppElement("#root");
  const [students, setStudents] = useState([]);
  const [isRejectingOpen, setIsRejectingOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [remarks, setRemarks] = useState("");
  const modalStyle = {
    content: {
      position: "absolute",
      height: "300px",
      maxWidth: "450px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      borderRadius: "15px",
      backgroundColor: "#ffffff95",
    },
  };

  useEffect(() => {
    fetch("http://localhost:3001/get-student-application-admin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((body) => body.success && setStudents(body.request));
  }, []);

  const handlePreReject = async (application) => {
    setIsRejectingOpen(true);
    setCurrentStudent(application);
  };

  const handleReject = async () => {
    await fetch("http://localhost:3001/reject-student-application-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        applicationId: currentStudent.open_application._id,
        remarks: remarks,
        commenter: "admin",
      }),
    })
      .then((res) => res.json())
      .then((body) => console.log(body));
    setIsRejectingOpen(false);
    await fetch("http://localhost:3001/get-student-application-admin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((body) => body.success && setStudents(body.request));
  };

  const handleApprove = async (applicationId) => {
    await fetch("http://localhost:3001/clear-student-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ applicationId: applicationId }),
    });
    await fetch("http://localhost:3001/get-student-application-admin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((body) => body.success && setStudents(body.request));
  };

  ReactModal.setAppElement("#root");
  return (
    <>
      <div className="container d-flex flex-column">
        <h3 className="my-4">Manage Pending Applications</h3>
        {students?.map((student, index) => (
          <div
            className="card glass-effect-4 p-2 py-sm-3 px-sm-5 m-1 d-flex flex-row justify-content-between align-items-center"
            key={index}
          >
            <div className="fw-semibold">
              {student.first_name +
                " " +
                student.middle_name +
                " " +
                student.last_name}
            </div>
            <div className="d-flex flex-row gap-2">
              <button
                onClick={() => handleApprove(student.open_application._id)}
              >
                Approve
              </button>
              <button onClick={() => handlePreReject(student)}>Return</button>
            </div>
          </div>
        ))}
      </div>

      <ReactModal
        isOpen={isRejectingOpen}
        style={modalStyle}
        onAfterClose={() => setRemarks("")}
      >
        <div className="d-flex flex-column gap-1 p-0 py-sm-3 px-sm-4 w-100 h-100 justify-content-between">
          <button
            type="button"
            className="btn-close btn-right"
            onClick={() => setIsRejectingOpen(false)}
          />
          <h5 style={{ paddingBottom: 8 }}>
            {"Returning " + currentStudent?.first_name + "'s Application"}
          </h5>
          <textarea
            type="text"
            rows="4"
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <br />
          <button onClick={handleReject}>Return</button>
        </div>
      </ReactModal>
    </>
  );
}

export default ManagePendingApplications;
