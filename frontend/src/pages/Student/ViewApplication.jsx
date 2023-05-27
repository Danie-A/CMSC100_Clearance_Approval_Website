import React, { useEffect, useState } from "react";

export default function ViewApplication() {

    const [student, setStudent] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/view-student-info", {
            method: "POST",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((body) => {
                setStudent = (body);
            });
    }, []);

    const handleResubmitClearanceOfficer = async (e) => {
        e.preventDefault();

        var studentRemark = document.getElementById("student-remark").value; // get values from the form

    }


    const handleResubmitAdviser = async (e) => {
        e.preventDefault();

        var link = document.getElementById("link").value; // get values from the form

        var applicationDocu = { // create subject object to be passed to body
            studentId: student._id,
            current_step: 2,
            github_link: link,
        }

        await fetch('http://localhost:3001/create-application', {
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
                    alert("Successfully created application!");
                } else { // success: false
                    alert("Failed to create application.");
                }
            })
            .catch((error) => { // show error
                alert(`Error: ${error}`);
            })

        // set form to blank again
        document.getElementById("link").value = ''; // get values from the form
    }

    if (!student.remarks) {
        // pending to be reviewed by adviser - still at step 1
        return <div className="form-container">
            <p>Status: Pending</p>
            <p>Step 2: Adviser</p>
            <p>Your clearance application is pending to be reviewed by your adviser.</p>
        </div>

    } else {
        if (student.current_step === 2 && student.status === "returned") {
            // returned by adviser

            return <div className="form-container">
                <p>Status: Returned</p>
                <p>Step 2: Adviser</p>
                <form>
                    <label htmlFor="link">GitHub Link:</label><br />
                    <input type="text" id="link" name="link" required /><br />
                    <input type="submit" onClick={handleResubmitAdviser} className="btn btn-primary" value="Submit" />

                </form>

            </div>

        } else if (student.current_step === 3) {
            if (student.status === "returned") {
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
                // pending to be reviewed by clearance officer
                return <div className="form-container">
                    <p>Status: Pending</p>
                    <p>Step 3: Clearance Officer</p>
                    <p>Your clearance application is pending to be reviewed by a clearance officer.</p>
                </div>
            }

        }
    }


    return (
        <div className="whole-container">
            <h5>View Clearance Application</h5>

        </div>
    );


    // return (
    //     <div className="whole-container">
    //         <h5>View Clearance Application</h5>
    //         <div className="form-container">
    //             <p>Status: Open</p>
    //             <p>Step 1: Pre-Adviser</p>
    //             <form>
    //                 <label htmlFor="link">GitHub Link:</label><br />
    //                 <input type="text" id="link" name="link" required /><br />

    //                 {/* <label htmlFor="student-remark">Student Remark:</label><br />
    //                 <input type="text" id="student-remark" name="student-remark" /><br /><br /> */}

    //                 <input type="submit" onClick={handleSubmit} className="btn btn-primary" value="Submit" />
    //                 <br />

    //             </form>
    //         </div>
    //     </div>

    // );


}