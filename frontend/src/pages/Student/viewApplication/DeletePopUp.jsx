import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

function DeletePopUp({ handleCloseModal }) {

    const handleClick = (applicationId) => {
        handleCloseModal();
        handleDeleteApplication(applicationId);
        // go back to home page
        window.location.href = "/student";
    };

    const [applicationId, setApplicationId] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/view-student-info", {
            method: "POST",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((body) => {
                setApplicationId(body.open_application);
            });
    }, []);

    const handleDeleteApplication = async (applicationId) => {
        await fetch("http://localhost:3001/delete-application", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ applicationId: applicationId }),
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

            <button className="btn btn-danger" onClick={() => { handleClick(applicationId) }}>
                <Link to="/student" className="nav-link"><MdDelete color="white" /> Close Application</Link>
            </button>

        </div>

    );
}

export default DeletePopUp;