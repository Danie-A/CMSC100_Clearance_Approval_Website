import React, { useState, useEffect } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { RiReplyFill } from "react-icons/ri";
import ReactModal from 'react-modal';
import ViewRemarks from "../viewApplication/remarks/ViewRemarks.jsx";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../pdf/PDFDocument';

export default function SingleNotif(props) {

    const [showModal, setShowModal] = useState(false);
    // fetch adviser and student info and place in react hooks
    const [adviser, setAdviser] = useState([]); // adviser info
    const [student, setStudent] = useState([]); // adviser info

    useEffect(() => {
        const e = async () => {
            // fetch adviser info
            await fetch("http://localhost:3001/get-adviser-details", { method: "GET", credentials: "include" })
                .then((response) => response.json())
                .then((body) => {
                    setAdviser(body.adviser);
                    setStudent(body.student);
                }
                );
        };
        e();
    }, []);


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
            var student_name = student.first_name + " " + student.middle_name + " " + student.last_name;
            var adviser_name = adviser.first_name + " " + adviser.middle_name + " " + adviser.last_name;
            return (
                <>
                    <div>
                        <FaCheckSquare className="mr-2" color={'#14A44D'} style={{ marginRight: '8px' }} />
                        Your clearance application {props.id} has been cleared.
                    </div>

                    <div>
                        <PDFDownloadLink document={<PDFDocument applicationId={props.id} dateGenerated={date} studentName={student_name} studentNumber={student.student_number} adviser={adviser_name} clearanceOfficer={"Admin"} />} fileName="approved_clearance.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <button className="btn btn-danger notifBtn">
                                <AiFillFilePdf className="mr-2" style={{ marginRight: '8px' }} />
                                Print PDF
                            </button>)}
                        </PDFDownloadLink>
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