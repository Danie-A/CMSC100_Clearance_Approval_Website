import React from 'react';


function ReturnPopUp({ handleCloseModal2, applicationId }) {

    const handleReturn = async (e) => {
        e.preventDefault();
        const remarks = document.getElementById("remark").value;

        // If Return, set application step to 2 status to returned
        // Add adviser remark

        await fetch("http://localhost:3001/return-application-adviser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ applicationId: applicationId, remarks: remarks }),
        })
            .then((res) => res.json())
            .then((body) => console.log(body));

        // set empty field again
        document.getElementById("remark").value = "";
        // close modal - set isReturned to true to close the 2 modals
        handleCloseModal2(true);
    };


    return (<>
        <button type="button" className="btn-close btn-right" aria-label="Close" onClick={() => { handleCloseModal2(false) }}></button>
        <h5>Return Application to Student</h5>
        <form>
            <label htmlFor="remark">Adviser Remark:</label><br />
            <input type="text" placeholder="Input Remark to Student" id="remark" name="remark" size="30" required /><br /><br />
            <input type="submit" onClick={handleReturn} className="btn btn-primary" value="Submit" />
        </form>

    </>);
}

export default ReturnPopUp;