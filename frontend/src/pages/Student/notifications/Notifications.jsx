import SingleNotif from "./SingleNotif";
import React, { useEffect, useState } from "react";

export default function Notifications() {

    const [hasOpenApplication, setHasOpenApplication] = useState(null);
    const [application, setApplication] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3001/view-student-info", {
                    method: "POST",
                    credentials: "include",
                });

                const body = await response.json();
                const applicationId = body.open_application;
                setHasOpenApplication(applicationId);
                console.log("APPLICATION ID IS " + applicationId);

                if (hasOpenApplication) {
                    const applicationResponse = await fetch('http://localhost:3001/view-open-application-info', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ applicationId: applicationId })
                    });

                    const payload = await applicationResponse.json();
                    console.log("DATA IS ", payload);

                    if (payload && payload.data) {
                        setApplication(payload.data);
                        //alert("Successfully found application info!");
                    } else {
                        setApplication(null);
                        alert("Failed to find application info.");
                    }
                }

            } catch (error) {
                alert(`Error: ${error}`);
            }
        }

        fetchData();
    }, [hasOpenApplication]);


    function showNotif() {
        if (hasOpenApplication && application) {
            return (
                <SingleNotif id={application._id} status={application.status} step={application.current_step} />
            );
        } else {
            // you have no notifications alert using bootstrap
            return (
                <div className="alert alert-dark" role="alert">
                    You have no notifications.
                </div>
            );
        }
    }

    return (
        <div className='whole-container'>
            <h5>Notifications</h5>
            <div className="notif-container">
                {showNotif()}
            </div>

        </div>
    );
}