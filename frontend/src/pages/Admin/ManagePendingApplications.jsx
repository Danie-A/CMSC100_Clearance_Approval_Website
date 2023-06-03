import { useState, useEffect } from "react";
import ReactModal from "react-modal";

function ManagePendingApplications() {
  const [students, setStudents] = useState([]);
  const [isRejectingOpen, setIsRejectingOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const e = async () => {
      await fetch("http://localhost:3001/get-student-application-admin", { method: "POST", credentials: "include" })
        .then((res) => res.json())
        .then((body) => {
          console.log(body);
          if (body.success) setStudents(body.request);
        });
    };
    e();
  }, []);

  const modalStyle = { content: { position: "absolute", height: "250px", maxWidth: "450px", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto" } };

  const handlePreReject = async (application) => {
    setIsRejectingOpen(true);
    setCurrentStudent(application);
  };

  const handleReject = async () => {
    await fetch("http://localhost:3001/reject-student-application-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ applicationId: currentStudent.open_application._id, remarks: remarks }),
    })
      .then((res) => res.json())
      .then((body) => console.log(body));
    setIsRejectingOpen(false);
    await fetch("http://localhost:3001/get-student-application-admin", { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        if (body.success) setStudents(body.request);
      });
  };

  const handleApprove = async (applicationId) => {
    await fetch("http://localhost:3001/clear-student-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ applicationId: applicationId }),
    })
      .then((res) => res.json())
      .then((body) => console.log(body));
    await fetch("http://localhost:3001/get-student-application-admin", { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        if (body.success) setStudents(body.request);
      });
  };

  ReactModal.setAppElement("#root");
  return (
    <>
      <h3>Manage Pending Applications</h3>

      <ReactModal isOpen={isRejectingOpen} style={modalStyle} onAfterClose={() => setRemarks("")}>
        <div className="d-flex flex-column gap-3 w-100 h-100 justify-content-between">
          <button type="button" className="btn-close btn-right" onClick={() => setIsRejectingOpen(false)} />
          <h4>{"Rejecting " + currentStudent?.first_name}</h4>
          <textarea type="text" rows="4" placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          <button onClick={handleReject}>Return</button>
        </div>
      </ReactModal>

      <table>
        <tbody>
          <tr>
            <td>Name</td>
          </tr>
          {students?.map((student, index) => (
            <tr key={index}>
              <td>{student.first_name + " " + student.middle_name + " " + student.last_name}</td>
              <td>
                <button onClick={() => handleApprove(student.open_application._id)}>Approve</button>
              </td>
              <td>
                <button onClick={() => handlePreReject(student)}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ManagePendingApplications;
