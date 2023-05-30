import React from "react";
import SingleApp from "./SingleApp";
import { useState, useEffect } from "react";

export default function Applications() {

    const [applicationList, setApplicationList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3001/view-student-info", {
                    method: "POST",
                    credentials: "include",
                });

                const student = await response.json();

                const applicationListResponse = await fetch('http://localhost:3001/get-applications-of-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ studentId: student._id })
                });

                const payload = await applicationListResponse.json();
                console.log("DATA IS ", payload.data);

                if (payload && payload.data) {
                    setApplicationList(payload.data);
                    //alert("Successfully found application info!");
                } else {
                    setApplicationList([]);
                    alert("Failed to find application info.");
                }
            } catch (error) {
                alert(`Error: ${error}`);
            }
        }

        fetchData();
    }, []);

    const sortedApplicationList = applicationList.sort((a, b) => {
        if (a._id > b._id) {
            return -1; // Sort in descending order
        } else if (a._id < b._id) {
            return 1;
        }
        return 0;
    });

    return (
        <div className='whole-container'>

            <h5>Clearance Applications</h5>

            <table className="table table-hover table-colored">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedApplicationList.map((application) => (
                        <SingleApp key={application._id} application={application} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}