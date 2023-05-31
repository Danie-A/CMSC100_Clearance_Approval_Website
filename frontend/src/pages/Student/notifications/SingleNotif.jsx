import React from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { RiReplyFill } from "react-icons/ri";
import ReactModal from 'react-modal';
import ViewRemarks from "../viewApplication/remarks/ViewRemarks.jsx";
import { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../pdf/PDFDocument';

export default function StudentNotif(props) {

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    ReactModal.setAppElement('#root'); // Set the app element

    const renderNotif = (props) => {
        if (props.status === 'cleared') {
            const date = new Date().toLocaleDateString();
            return (
                <>
                    <div>
                        <FaCheckSquare className="mr-2" color={'#14A44D'} style={{ marginRight: '8px' }} />
                        Your clearance application {props.id} has been cleared.
                    </div>

                    <div>

                        <PDFDownloadLink document={<PDFDocument applicationId={123456789} dateGenerated={date} studentName={"Danielle Araez"} studentNumber={"2021-12345"} adviser={"Ipsum Lorem"} clearanceOfficer={"Lorem Ipsum"} />} fileName="approved_clearance.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <button className="btn btn-danger notifBtn">
                                <AiFillFilePdf className="mr-2" style={{ marginRight: '8px' }} />
                                Print PDF
                            </button>)}
                        </PDFDownloadLink>


                        {/* <ShowPDF /> */}

                    </div>
                </>
            );


        } else if (props.status === 'returned') {
            const whoReturned = (props.step === 2) ? 'your adviser' : 'the clearance officer';
            return (
                <>
                    <div>
                        <RiReplyFill className="mr-2" color={'#DC4C64'} style={{ marginRight: '8px' }} />
                        Your application "{props.id}" has been returned by {whoReturned}.

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

                    </div>

                </>
            );
        } else { return null; }
    };

    return (
        <div className="notif-item">
            {renderNotif(props)}
        </div>
    );
}