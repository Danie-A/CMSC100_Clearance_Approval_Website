import React from "react";
import SingleApp from "./SingleApp";
import { useState, useEffect } from "react";

export default function Applications() {

    const [applicationList, setApplicationList] = useState([]);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {

                setSpinner(true);
                const applicationListResponse = await fetch('http://localhost:3001/get-applications-of-student', { method: "GET", credentials: "include" });

                const payload = await applicationListResponse.json();
                console.log("DATA IS ", payload.data);

                if (payload && payload.data) {
                    setApplicationList(payload.data);
                    setSpinner(false);
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

    function showList() {
        if (spinner) {
            return <tbody>
                <tr><td><div className="spinner-border text-dark" role="status">
                </div></td></tr>
            </tbody>
        } else if (applicationList.length === 0) {
            return <tbody>
                <tr><td>No applications yet.</td></tr>
            </tbody>
        }
        else
            return (<tbody>{sortedApplicationList.map((application) => (
                <SingleApp key={application._id} application={application} />
            ))}</tbody>);
    }

    return (
        <div className='whole-container'>

        <h2 id="clearance-applications-heading">Clearance Applications</h2>

            <table className="table table-hover table-colored">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                </thead>
                {showList()}
            </table>
        </div>
    );
}