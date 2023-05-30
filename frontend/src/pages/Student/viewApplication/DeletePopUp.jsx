import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

function DeletePopUp({ handleCloseModal }) {

    const handleClick = (studentId, applicationId) => {
        handleCloseModal();
        handleDeleteApplication(studentId, applicationId);
        // go to home using window
        window.location.href = "/student";
    };

    const [studentId, setStudentId] = useState('');
    const [applicationId, setApplicationId] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/view-student-info", {
            method: "POST",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((body) => {
                setStudentId(body._id);
                setApplicationId(body.open_application);
            });
    }, []);

    const handleDeleteApplication = async (studentId, applicationId) => {
        await fetch("http://localhost:3001/delete-application", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId: studentId, applicationId: applicationId }),
        });
    };

    return (
        <div className='whole-container'>

            <button className="btn btn-light btn-right" onClick={handleCloseModal}>
                <AiFillCloseCircle size="30" color="red" />
            </button>

            <h5>Close Current Application</h5>
            <div>
                <p>Are you sure you want to close the current application?</p>
            </div>
            <br></br>

            <button className="btn btn-danger" onClick={() => { handleClick(studentId, applicationId) }}>
                <MdDelete color="white" /> Close Application
            </button>

        </div>

    );
}

export default DeletePopUp;