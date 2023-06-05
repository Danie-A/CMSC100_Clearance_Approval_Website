import React from "react";
import ReactModal from "react-modal";
import ReturnPopUp from "./ReturnPopUp";
import { useState } from "react";
import Remark from "../Student/viewApplication/remarks/Remark";
import { BiCommentDetail } from "react-icons/bi";
import Submission from "./Submission";
import { RiMailSendFill } from "react-icons/ri";

export default function SeeProfile({ handleCloseModal, student }) {
  const username = localStorage.getItem("username"); // username of adviser
  // pending application id
  const applicationId = student.open_application._id;

  // for open adviser remarks modal
  const handleOpenRemark = () => {
    setShowRemark(true);
  };

  const handleCloseRemark = () => {
    setShowRemark(false);
  };

  const [showRemark, setShowRemark] = useState(false);

  // for open student submissions modal
  const handleOpenSubmission = () => {
    setShowSubmission(true);
  };

  const handleCloseSubmission = () => {
    setShowSubmission(false);
  };

  const [showSubmission, setShowSubmission] = useState(false);

  // for react modal to view application of student
  const handleOpenModal2 = () => {
    setShowModal2(true);
  };
  const handleCloseModal2 = (isReturned) => {
    if (isReturned) {
      setShowModal2(false);
      handleCloseModal(); // also close the see profile modal
    } else {
      setShowModal2(false); // just close the return pop up modal
    }
  };
  ReactModal.setAppElement("#root"); // Set the app element
  const [showModal2, setShowModal2] = useState(false);

  const modalStyle = {
    content: {
      position: "absolute",
      height: "400px",
      maxWidth: "600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      justifyContent: "center",
    },
  };

  // get last submission of student
  const lastIndex = student.open_application.student_submissions.length - 1;
  const latestSubmission =
    student.open_application.student_submissions[lastIndex];

  // get github link and student remark
  const github_link = latestSubmission["github_link"];
  const date = latestSubmission["date"];
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  var student_remark;

  const step = student.open_application.current_step;
  const status = student.open_application.status;

  function showLink() {
    if (step === 1 && status === "Pending") {
      // show github link
      return (
        <div>
          <p>
            <strong>GitHub Link:</strong>{" "}
            <a href={github_link} target="_blank" rel="noopener noreferrer">
              {github_link}
            </a>
          </p>
        </div>
      );
    } else {
      // show github link and remark
      student_remark = latestSubmission["student_remark"]; // since student_remark is not in step 1

      return (
        <div>
          <p>
            <strong>GitHub Link:</strong>{" "}
            <a href={github_link} target="_blank" rel="noopener noreferrer">
              {github_link}
            </a>
          </p>
          <p>
            <strong>Student Remark:</strong> {student_remark}
          </p>
        </div>
      );
    }
  }

  function viewRemarksIfElse(remarks) {
    const sortedRemarks = remarks.sort((a, b) => {
      if (a._id > b._id) {
        return -1; // Sort in descending order
      } else if (a._id < b._id) {
        return 1;
      }
      return 0;
    });
    if (remarks.length === 0) {
      return (
        <div>
          <p>You have not returned any remarks yet.</p>
        </div>
      );
    } else {
      return (<div>
        {sortedRemarks.map((remark, index) => (
          <Remark
            key={index}
            remark={remark.remarks}
            step={remark.step}
            date={remark.date.slice(0, 10)}
            commenter={username}
          />
        ))}
      </div>);
    }
  }
  // remarks of adviser to student
  function viewRemarks(remarks) {
    return (
      <div className="whole-container">
        <button
          type="button"
          className="btn-close btn-right"
          aria-label="Close"
          onClick={handleCloseRemark}
        ></button>

        <h5>Returned Remarks</h5>

        <div className="remark-container">
          {viewRemarksIfElse(remarks)}
        </div>
      </div>
    );
  }

  // list of submissions of student regarding the application
  function viewSubmissions(submissions) {
    const sortedSubmissions = submissions.sort((a, b) => {
      if (a._id > b._id) {
        return -1; // Sort in descending order
      } else if (a._id < b._id) {
        return 1;
      }
      return 0;
    });

    return (
      <div className="whole-container">
        <button
          type="button"
          className="btn-close btn-right"
          aria-label="Close"
          onClick={handleCloseSubmission}
        ></button>

        <h5>Student Submissions</h5>

        <div className="remark-container">
          <div>
            {sortedSubmissions.map((sub, index) => {
              const date = new Date(sub.date).toLocaleString("en-US", options);
              return (
                <Submission
                  key={index}
                  github_link={sub.github_link}
                  student_remark={sub.student_remark}
                  step={sub.step}
                  date={date}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const handleApprove = async (e) => {
    e.preventDefault();
    // If Approve, set application step to 3
    await fetch("http://localhost:3001/approve-application-adviser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ applicationId: applicationId }),
    })
      .then((res) => res.json())
      .then((body) => console.log(body));

    handleCloseModal();
  };

  // code to convert Mongoose date and time to UTC+8 Philippine time
  const timestamp = new Date(date);

  const chinaTimeOptions = {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDateTime = timestamp.toLocaleString("en-US", chinaTimeOptions);

  return (
    <>
      <button
        type="button"
        className="btn-close btn-right"
        aria-label="Close"
        onClick={handleCloseModal}
      ></button>

      <div className="whole-container">
        <br></br>
        <h4 className="mx-0">Student Information</h4>
        <div>
          <strong>Name:</strong> {student.first_name} {student.last_name}
        </div>
        <div>
          <strong>Student Number:</strong> {student.student_number}
        </div>
        <div>
          <strong>Email:</strong> {student.email}
        </div>
        <br />
        <h4 className="mx-0">Student Clearance Application</h4>
        <div>
          <strong>Date Submitted:</strong> {formattedDateTime}
        </div>
        {showLink()}
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button onClick={handleOpenRemark} style={{ marginRight: 12 }}>
            <BiCommentDetail className="mr-2" style={{ marginRight: "8px" }} />
            View Adviser Remarks
          </button>
          {/* showRemarks(student.open_application.remarks) */}
          <ReactModal
            isOpen={showRemark}
            contentLabel="Remarks"
            onRequestClose={handleCloseRemark}
            appElement={document.getElementById("root")} // Set the app element
          >
            {viewRemarks(student.open_application.remarks)}
          </ReactModal>

          <button onClick={handleOpenSubmission} style={{ marginRight: 12 }}>
            <RiMailSendFill className="mr-2" style={{ marginRight: "8px" }} />
            View Student Submissions
          </button>
          <ReactModal
            isOpen={showSubmission}
            contentLabel="Submissions"
            onRequestClose={handleCloseSubmission}
            appElement={document.getElementById("root")} // Set the app element
          >
            {viewSubmissions(student.open_application.student_submissions)}
          </ReactModal>
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button onClick={handleApprove} style={{ marginRight: 12 }}>
            Approve
          </button>
          <button onClick={handleOpenModal2}>Return</button>
        </div>
      </div>
      {/* Pop Up Another Modal to Add Remark */}
      <ReactModal
        style={modalStyle}
        isOpen={showModal2}
        contentLabel="Return to Student with Remark"
        onRequestClose={handleCloseModal2}
        shouldCloseOnOverlayClick={false}
        appElement={document.getElementById("root")} // Set the app element
      >
        <ReturnPopUp
          handleCloseModal2={handleCloseModal2}
          applicationId={applicationId}
        />
      </ReactModal>
    </>
  );
}
