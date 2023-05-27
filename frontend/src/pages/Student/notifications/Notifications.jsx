import React from "react";
import SingleNotif from "./SingleNotif";


export default function Notifications() {

    return (
        <div className='whole-container'>
            <h5>Notifications</h5>
            <div className="notif-container">
                <SingleNotif id={`000001`} decision={`approved`} date={`2023-05-22`} />
                <SingleNotif id={`000002`} decision={`returnedAdviser`} date={`2023-05-21`} />
                <SingleNotif id={`000003`} decision={`returnedOfficer`} date={`2023-05-20`} />
            </div>

        </div>
    );
}