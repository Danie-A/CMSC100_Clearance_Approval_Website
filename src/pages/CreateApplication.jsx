import React from "react";

export default function CreateApplication() {
    return (
        <div className="whole-container">
            <h5>Create Clearance Application</h5>
            <div className="form-container">
                <p>Step 1: Pre-Adviser</p>
                <form>
                    <label htmlFor="link">GitHub Link:</label><br />
                    <input type="text" id="link" name="link" required /><br />

                    <label htmlFor="student-remark">Student Remark:</label><br />
                    <input type="text" id="student-remark" name="student-remark" /><br /><br />

                    <input type="submit" className="btn btn-primary" value="Submit" />
                    <br />

                </form>
            </div>
        </div>

    );


}