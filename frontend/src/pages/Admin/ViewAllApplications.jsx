import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

function ViewAllApplications() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const modalStyle = { content: { position: "absolute", height: "400px", maxWidth: "850px", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto" } };
  const options = { year: "numeric", month: "long", day: "2-digit", hour: "numeric", minute: "numeric", second: "numeric" };
  ReactModal.setAppElement("#root");

  useEffect(() => {
    fetch("http://localhost:3001/get-all-applications", { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((body) => setStudents(body.request));
  }, []);

  const handleOpenApplication = (student) => {
    setCurrentStudent(student);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h3 className="my-5">View All Applications</h3>
      {students.map((student, index) => (
        <div className="card my-3 p-3 d-flex flex-row justify-content-between align-items-center" key={index}>
          <div className="fw-semibold ms-0 ms-sm-4">{student.first_name + " " + student.middle_name + " " + student.last_name}</div>
          <div className="btn btn-secondary px-0 px-sm-3" onClick={() => handleOpenApplication(student)}>
            View Application
          </div>
        </div>
      ))}
      <ReactModal isOpen={showModal} style={modalStyle} onAfterClose={() => {}}>
        <div className="d-flex flex-column gap-3 w-100 h-100 justify-content-start">
          <button type="button" className="btn-close btn-right" onClick={() => setShowModal(false)} />
          <h4>{currentStudent?.first_name + "'s Application"}</h4>

          <div className="d-flex flex-row gap-3 w-100 justify-content-center">
            <div className="d-flex flex-column" style={{ width: "400px" }}>
              <h6 className="mx-auto">Submissions</h6>
              {currentStudent?.open_application.student_submissions.map((submission, index) => (
                <div className="card p-2 px-sm-4 py-sm-3" key={index}>
                  <div>{`Step: ${submission.step}`}</div>
                  <div>
                    {`Github Link: `}
                    <a href={submission.github_link} target="_blank">
                      {submission.github_link}
                    </a>
                  </div>
                  <div>{`Date: ${new Date(submission.date).toLocaleString("en-US", options)}`}</div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column" style={{ width: "400px" }}>
              <h6 className="mx-auto">Remarks</h6>
              {currentStudent?.open_application.remarks.map((remark, index) => (
                <div className="card p-2 px-sm-4 py-sm-3" key={index}>
                  <div>{`Step ${remark.step}`}</div>
                  <div>{`Remarks: ${remark.remarks}`}</div>
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
