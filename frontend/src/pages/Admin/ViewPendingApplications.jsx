import { useEffect, useState } from "react";
import ReactModal from "react-modal";

function ViewPendingApplications() {
  ReactModal.setAppElement("#root");
  const [sortBy, setSortBy] = useState("none");
  const [studentsList, setStudentsList] = useState([]);
  const [approversList, setApproversList] = useState([]);
  const [approving, setApproving] = useState(null);
  const [adviser, setAdviser] = useState();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const modalStyle = {
    content: {
      position: "absolute",
      height: "250px",
      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      borderRadius: "15px",
      backgroundColor: "#ffffff75",
    },
  };

  useEffect(() => {
    fetch("http://localhost:3001/get-pending-applications", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => {
        setStudentsList(body.request);
      });
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name)));
        break;
      case "name_desc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name)));
        break;
      case "studNum_asc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => b.student_number.localeCompare(a.student_number)));
        break;
      case "studNum_desc":
        setStudentsList((prevList) => [...prevList].sort((a, b) => a.student_number.localeCompare(b.student_number)));
        break;
      default:
        break;
    }
  }, [sortBy]);

  const handleReject = async (studentId) => {
    await fetch("http://localhost:3001/reject-student-account", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: studentId }),
    });
    await fetch("http://localhost:3001/get-pending-applications", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => setStudentsList(body.request));
  };

  const preApprove = async (student) => {
    setApproving(student);
    setShowApproveModal(true);
    await fetch("http://localhost:3001/get-all-advisers", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => {
        setApproversList(body.result);
        setAdviser(body.result[0]?._id);
      });
  };

  const handleApprove = async () => {
    await fetch("http://localhost:3001/approve-student-account", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: approving._id, approverId: adviser }),
    });
    setShowApproveModal(false);
    setApproving(null);
    await fetch("http://localhost:3001/get-pending-applications", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => setStudentsList(body.request));
  };

  return (
    <>
      <div className="container d-flex flex-column">
        <h3 className="my-4">{"View Pending Accounts"}</h3>
        <div className="d-flex flex-row gap-2 my-2">
          <span className="glass-effect px-3">{"Sort by:"}</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">{"None"}</option>
            <option value="name_asc">{"Name (Ascending)"}</option>
            <option value="name_desc">{"Name (Descending)"}</option>
            <option value="studNum_asc">{"Student Number (Ascending)"}</option>
            <option value="studNum_desc">{"Student Number (Descending)"}</option>
          </select>
        </div>
        <div className="container my-2">
          {studentsList?.map((student, index) => (
            <div className="card glass-effect-4 p-2 py-sm-3 px-sm-5 m-2 d-flex flex-row justify-content-between align-items-center" key={index}>
              <div className="fw-semibold col-3">{student.first_name + " " + student.middle_name + " " + student.last_name}</div>
              <div className="col-3">{student.student_number}</div>
              <div className="d-flex flex-row gap-2">
                <button onClick={() => preApprove(student)}>{"Approve"}</button>
                <button onClick={() => handleReject(student._id)}>{"Reject"}</button>
              </div>
            </div>
          ))}
        </div>

        <div id="image-container">
          <img id="image5" src="https://i.pinimg.com/originals/70/2c/88/702c88766c91b0d333b220326dfb14ad.png" alt="view-pending-applications"></img>
        </div>
      </div>
      <ReactModal isOpen={showApproveModal} style={modalStyle}>
        <div className="d-flex flex-column gap-1 p-0 py-sm-3 px-sm-4 w-100 h-100 justify-content-between">
          <button type="button" className="btn-close btn-right" onClick={() => setShowApproveModal(false)} />
          <h4 className="fw-semibold mb-4">{"Approving " + approving?.first_name}</h4>
          <div className="d-flex flex-row justify-content-center align-items-center gap-3">
            <span>{"Select an Adviser: "}</span>
            <select className="flex-fill" value={adviser} onChange={(e) => setAdviser(e.target.value)}>
              {approversList?.map((approver, index) => (
                <option value={approver._id} key={index}>
                  {approver.first_name + " " + approver.middle_name + " " + approver.last_name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleApprove}>{"Approve"}</button>
        </div>
      </ReactModal>
    </>
  );
}

export default ViewPendingApplications;
