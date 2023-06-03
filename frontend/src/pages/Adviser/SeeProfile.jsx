import React from 'react';

export default function SeeProfile({ handleCloseModal, student }) {

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

    function returnApp() {
        // if step is 1
        // set application status to "returned" 
        // set application step to 2

        // if step is 2
        // set application status to "returned" 

        // add remark 

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

        <button>View History</button>
        <br /><br />

        <button onClick={approveApp}>Approve</button>
        <button onClick={returnApp}>Return</button>

    </>);



}