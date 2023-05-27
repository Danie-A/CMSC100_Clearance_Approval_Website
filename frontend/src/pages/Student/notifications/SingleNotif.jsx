import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { RiReplyFill } from "react-icons/ri";

export default function StudentNotif(props) {

    const renderNotif = (decision) => {
        if (decision === 'approved') {
            return (
                <>
                    <div>
                        <FaCheckSquare className="mr-2" color={'#14A44D'} style={{ marginRight: '8px' }} />
                        Your clearance application {props.id} has been cleared.
                    </div>

                    <div>
                        <button className="btn btn-danger notifBtn">
                            <AiFillFilePdf className="mr-2" style={{ marginRight: '8px' }} />
                            Print PDF
                        </button>
                        {props.date}
                    </div>
                </>
            );


        } else if (decision === 'returnedAdviser' || decision === 'returnedOfficer') {
            const whoReturned = (decision === 'returnedAdviser') ? 'your adviser' : 'the clearance officer';
            return (
                <>
                    <div>
                        <RiReplyFill className="mr-2" color={'#DC4C64'} style={{ marginRight: '8px' }} />
                        Your clearance application {props.id} has been returned by {whoReturned}.

                    </div>
                    <div>
                        <button className="btn btn-warning notifBtn">
                            <BiCommentDetail className="mr-2" style={{ marginRight: '8px' }} />
                            View Remarks
                        </button>
                        {props.date}
                    </div>

                </>
            );
        } else { return null; }
    };

    return (
        <div className="notif-item">
            {renderNotif(props.decision)}
        </div>
    );
}