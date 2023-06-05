import React from "react";

export default function CreateApplication() {

    const handleSubmit = async (e) => {
        e.preventDefault();
        var link = document.getElementById("link").value; // get values from the form

        var applicationDocu = { // create subject object to be passed to body
            github_link: link,
        }

        await fetch('http://localhost:3001/create-application', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDocu)
        })
            .then((response) => response.json()) // get the response
            .then((data) => {
                console.log(data);
                if (data.success) { // if success is true
                    console.log("Successfully created application!");
                    // redirect to home page
                    window.location.href = "/student";
                } else { // success: false
                    console.log("Failed to create application.");
                }
            })
            .catch((error) => { // show error
                alert(`Error: ${error}`);
            })

        // set form to blank again
        document.getElementById("link").value = ''; // get values from the form
    }

    return (

        <div className="whole-container">
            <div className="view-app-container">
                <h12 id="create-application">Create Clearance Application</h12>

                <p>Status: Open</p>
                <p>Step 1: Pre-Adviser</p>
                <form>
                    <label htmlFor="link">GitHub Link:</label><br />
                    <input type="text" id="link" name="link" className="github-input" required /><br />
                    <br />

                    <input type="submit" onClick={handleSubmit} className="btn btn-primary" value="Submit" />
                    <br />

                </form>
            </div>
        </div>

    );
}
