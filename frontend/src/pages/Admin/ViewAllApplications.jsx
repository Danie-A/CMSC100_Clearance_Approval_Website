import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

const options = { year: "numeric", month: "long", day: "2-digit", hour: "numeric", minute: "numeric", second: "numeric" };

function ViewAllApplications() {
  ReactModal.setAppElement("#root");
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const modalStyle = {
    content: {
      position: "absolute",
      height: "400px",
      maxWidth: "850px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      borderRadius: "15px",
      backgroundColor: "#ffffff95",
    },
  };

  useEffect(() => {
    fetch("http://localhost:3001/get-all-applications", { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((body) => setStudents(body.request));
  }, []);

  const handleOpenApplication = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  function showStudentRemark(submission) {
    if (submission.step === 2 || submission.step === 3) { // won't show student remark when submission is at step 1 -- only github link is shown
      return (<div>{`Student Remark: ${submission.student_remark}`}</div>);
    }
  }

  function showGitHubLink(submission) {
    if (submission.step === 2 || submission.step === 1) { // only github link is shown
      return (<div>
        {"Github Link: "}
        <a href={submission.github_link} target="_blank" rel="noreferrer">
          {submission.github_link}
        </a>
      </div>);
    }
  }

  return (
    <div className="container">
      <h3 className="my-5">{"View Application Details"}</h3>
      {students.map((student, index) => (
        <div className="card glass-effect-4 my-3 p-3 d-flex flex-row justify-content-between align-items-center" key={index}>
          <div className="fw-semibold ms-0 ms-sm-4">{student.first_name + " " + student.middle_name + " " + student.last_name}</div>
          <button className="btn glass-effect-4 px-1 px-sm-4" onClick={() => handleOpenApplication(student)}>
            {"View Application"}
          </button>
        </div>
      ))}
      <ReactModal isOpen={showModal} style={modalStyle}>
        <div className="d-flex flex-column gap-3 p-0 py-sm-3 px-sm-4 w-100 h-100 justify-content-start">
          <button type="button" className="btn-close btn-right" onClick={() => setShowModal(false)} />
          <h4 className="fw-semibold mb-4">{currentStudent?.first_name + "'s Application"}</h4>

          <div className="d-flex flex-row gap-3 w-100 justify-content-center">
            <div className="d-flex flex-column" style={{ width: "400px" }}>
              <h6 className="mx-auto fw-semibold">{"Submissions"}</h6>
              {currentStudent?.open_application.student_submissions.map((submission, index) => (
                <div className="card glass-effect-4 m-1 p-2 px-sm-4 py-sm-3" key={index}>
                  <div>{`Step: ${submission.step}`}</div>
                  {showGitHubLink(submission)}
                  {showStudentRemark(submission)}
                  <div>{`Date: ${new Date(submission.date).toLocaleString("en-US", options)}`}</div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column" style={{ width: "400px" }}>
              <h6 className="mx-auto fw-semibold">Remarks</h6>
              {currentStudent?.open_application.remarks.map((remark, index) => (
                <div className="card glass-effect-4 my-2 p-2 px-sm-4 py-sm-3" key={index}>
                  <div>{`Step: ${remark.step}`}</div>
                  <div>{`Remarks: ${remark.remarks}`}</div>
                  <div>{`Commenter: ${remark.commenter}`}</div>
                  <div>{`Date: ${new Date(remark.date).toLocaleString("en-US", options)}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default ViewAllApplications;
