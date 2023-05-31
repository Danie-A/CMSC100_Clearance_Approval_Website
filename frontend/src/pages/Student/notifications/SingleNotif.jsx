import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { RiReplyFill } from "react-icons/ri";
import ReactModal from 'react-modal';
import ViewRemarks from "../viewApplication/remarks/ViewRemarks.jsx";
import { useState } from "react";
// import ShowPDF from "../pdf/ShowPDF.jsx";

export default function StudentNotif(props) {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    ReactModal.setAppElement('#root'); // Set the app element

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
                        {/* <ShowPDF /> */}
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
                        <button className="btn btn-warning notifBtn" onClick={handleOpenModal}>
                            <BiCommentDetail className="mr-2" style={{ marginRight: '8px' }} />
                            View Remarks
                        </button>
                        <ReactModal
                            isOpen={showModal}
                            contentLabel="Remarks"
                            onRequestClose={handleCloseModal}
                            appElement={document.getElementById('root')} // Set the app element
                        >
                            <ViewRemarks handleCloseModal={handleCloseModal} />
                        </ReactModal>
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