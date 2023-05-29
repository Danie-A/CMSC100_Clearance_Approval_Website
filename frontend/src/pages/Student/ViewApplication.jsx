import React, { useEffect, useState } from "react";
// import { AiFillCloseCircle } from "react-icons/ai";

export default function ViewApplication() {

    const [student, setStudent] = useState(null);
    const [application, setApplication] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3001/view-student-info", {
                    method: "POST",
                    credentials: "include",
                });

                const body = await response.json();
                setStudent(body);

                const applicationId = body.open_application;
                console.log("APPLICATION ID IS " + applicationId);

                const applicationResponse = await fetch('http://localhost:3001/view-open-application-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ applicationId: applicationId })
                });

                const payload = await applicationResponse.json();
                console.log("DATA IS ", payload.data);

                if (payload && payload.data) {
                    setApplication(payload.data);
                    //alert("Successfully found application info!");
                } else {
                    setApplication(null);
                    alert("Failed to find application info.");
                }
            } catch (error) {
                alert(`Error: ${error}`);
            }
        }

        fetchData();
    }, []);

    // RESUBMIT TO CLEARANCE OFFICER
    const handleResubmitClearanceOfficer = async (e) => {
        e.preventDefault();

        var studentRemark = document.getElementById("student-remark").value; // get values from the form

        var applicationDocu = { // create subject object to be passed to body
            studentId: student._id,
            current_step: 3,
            student_remark: studentRemark,
        }

        await fetch('http://localhost:3001/add-student-submission-clearance-officer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDocu)
        })
            .then((response) => response.json()) // get the response
            .then((data) => {
                console.log(data);
                if (data.success) { // if success is true
                    alert("Successfully submitted returned application to clearance officer!");
                    // redirect to homepage
                    window.location.href = "/student";
                } else { // success: false
                    alert("Failed to submit returned application to clearance officer.");
                }
            })
            .catch((error) => { // show error
                alert(`Error: ${error}`);
            })

        // set form to blank again
        document.getElementById("student-remark").value = ''; // get values from the form
    }


    // RESUBMIT TO ADVISER
    const handleResubmitAdviser = async (e) => {
        e.preventDefault();

        var github_link = document.getElementById("link").value; // get values from the form
        var student_remark = document.getElementById("remark").value; // get values from the form

        var applicationDocu = { // create subject object to be passed to body
            studentId: student._id,
            current_step: 2,
            github_link: github_link,
            student_remark: student_remark
        }

        await fetch('http://localhost:3001/add-student-submission-adviser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDocu)
        })
            .then((response) => response.json()) // get the response
            .then((data) => {
                console.log(data);
                if (data.success) { // if success is true
                    alert("Successfully submitted returned application to adviser!");
                    // redirect to homepage
                    window.location.href = "/student";
                } else { // success: false
                    alert("Failed to submit returned application to adviser.");
                }
            })
            .catch((error) => { // show error
                alert(`Error: ${error}`);
            })

        // set form to blank again
        document.getElementById("link").value = ''; // get values from the form
        document.getElementById("remark").value = ''; // get values from the form
    }

    function showContent() {
        if (application.current_step === 1) {
            // pending to be reviewed by adviser - still at step 1
            return <div className="form-container">
                <p>Status: Pending</p>
                <p>Step 2: Adviser</p>
                <p>Your clearance application is pending to be reviewed by your adviser.</p>
            </div>

        } else if (application.current_step === 2 && application.status === "returned") {
            // returned by adviser
            return <div className="form-container">
                <p>Status: Returned</p>
                <p>Step 2: Adviser</p>
                <form>
                    <label htmlFor="link">GitHub Link:</label><br />
                    <input type="text" id="link" name="link" required /><br />
                    <label htmlFor="link">Student Remark:</label><br />
                    <input type="text" id="remark" name="remark" required /><br />
                    <input type="submit" onClick={handleResubmitAdviser} className="btn btn-primary" value="Submit" />
                </form>
            </div>

        } else if (application.current_step === 3 && application.status === "returned") {

            // returned by clearance officer
            return <div className="form-container">
                <p>Status: Returned</p>
                <p>Step 3: Clearance Officer</p>
                <form>
                    <label htmlFor="student-remark">Student Remark:</label><br />
                    <input type="text" id="student-remark" name="student-remark" required /><br /><br />
                    <input type="submit" onClick={handleResubmitClearanceOfficer} className="btn btn-primary" value="Submit" />
                </form>
            </div>
        } else {
            // pending to be reviewed by adviser - still at step 1
            return <div className="form-container">
                <p>Status: Pending</p>
                <p>Step 3: Clearance Officer</p>
                <p>Your clearance application is pending to be reviewed by a clearance officer.</p>
            </div>

        }
    }
    return (
        <div className="whole-container">
            {/* <button className="btn btn-danger" onClick={handleCloseModal}>
                <AiFillCloseCircle color="white" />
            </button> */}

            <h5>View Clearance Application</h5>
            {application && showContent()}
        </div>
    );

}