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
                    {applicationList.map((application) => (
                        <SingleApp key={application._id} application={application} />
                    ))}

                    <SingleApp id={`000001`} status={`pending`} />
                    <SingleApp id={`000002`} status={`cleared`} />
                    <SingleApp id={`000003`} status={`closed`} />
                </tbody>
            </table>
        </div>
    );
}