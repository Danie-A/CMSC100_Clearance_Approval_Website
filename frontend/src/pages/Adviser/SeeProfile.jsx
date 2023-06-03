import React from 'react';
import ReactModal from 'react-modal';
import ReturnPopUp from './ReturnPopUp';
import { useState } from 'react';


export default function SeeProfile({ handleCloseModal, student }) {

    // for react modal to view application of student
    const handleOpenModal2 = () => {
        setShowModal2(true);
    };
    const handleCloseModal2 = () => {
        setShowModal2(false);
    };
    ReactModal.setAppElement('#root'); // Set the app element
    const [showModal2, setShowModal2] = useState(false);

    // get last submission of student
    var lastIndex = (student.open_application.student_submissions.length) - 1;
    var latestSubmission = student.open_application.student_submissions[lastIndex];

    // get github link and student remark
    var github_link = latestSubmission['github_link'];
    var date = latestSubmission['date'];

    var student_remark;

    var step = student.open_application.current_step;
    var status = student.open_application.status;


    function showLink() {

        if (step === 1 && status === 'Pending') {
            // show github link
            return (<div>
                <p>GitHub Link: <a href={github_link} target="_blank" rel="noopener noreferrer">{github_link}</a></p>
            </div>);

        } else {
            // show github link and remark
            student_remark = latestSubmission['student_remark']; // since student_remark is not in step 1

            return (<div>
                <p>GitHub Link: <a href={github_link} target="_blank" rel="noopener noreferrer">{github_link}</a></p>
                <p>{student_remark}</p>
            </div>);

        }

    }

    function approveApp() {
        // If Approve, set application step to 3


    }

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
    console.log(formattedDateTime);

    return (<>
        <button type="button" className="btn-close btn-right" aria-label="Close" onClick={handleCloseModal}></button>
        <div>Name: {student.first_name} {student.last_name}</div>
        <div>Student Number: {student.student_number}</div>
        <div>Email: {student.email}</div>

        <div>Date Submitted: {formattedDateTime}</div>
        {showLink()}


        <button>View Adviser Remarks</button>
        <button>View Student Submissions</button>

        <br /><br />

        <button onClick={approveApp}>Approve</button>


        <button onClick={handleOpenModal2}>Return</button>
        {/* Pop Up Another Modal to Add Remark */}
        <ReactModal
            isOpen={showModal2}
            contentLabel="Return to Student with Remark"
            onRequestClose={handleCloseModal2}
            shouldCloseOnOverlayClick={false}
            appElement={document.getElementById('root')} // Set the app element
        >
            <ReturnPopUp handleCloseModal2={handleCloseModal2} />

        </ReactModal>

    </>);



}