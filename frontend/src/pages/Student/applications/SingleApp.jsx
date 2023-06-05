import React, { useState, useEffect } from "react";
import { AiFillFolderOpen, AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../pdf/PDFDocument';

export default function SingleApp(props) {
    const { application } = props;

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


    if (!application) {
        return <tr><td><div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div></td></tr>;
    }

    const renderButtons = (status, appId) => {
        if (status === 'pending' || status === 'returned') {
            return (
                <>
                    <td><button className="btn btn-warning" style={{ pointerEvents: 'none' }}>
                        Pending
                    </button></td>
                    <td><button className="btn btn-outline-primary">
                        <Link to="/student/view-application" className="nav-link">
                            <AiFillFolderOpen className="mr-2 pr-3" />
                            Open Application</Link>
                    </button></td></>
            );
        } else if (status === 'cleared') {
            const date = new Date().toLocaleDateString();
            var student_name = student.first_name + " " + student.middle_name + " " + student.last_name;
            var adviser_name = adviser.first_name + " " + adviser.middle_name + " " + adviser.last_name;
            return (
                <>
                    <td><button className="btn btn-success" style={{ pointerEvents: 'none' }}>
                        Cleared
                    </button></td>
                    <td>                    <div>
                        <PDFDownloadLink document={<PDFDocument applicationId={appId} dateGenerated={date} studentName={student_name} studentNumber={student.student_number} adviser={adviser_name} clearanceOfficer={"Admin"} />} fileName="approved_clearance.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <button className="btn btn-danger notifBtn">
                                <AiFillFilePdf className="mr-2" style={{ marginRight: '8px' }} />
                                Print PDF
                            </button>)}
                        </PDFDownloadLink>
                    </div></td>
                </>
            );
        } else {
            return (
                <>
                    <td><button className="btn btn-secondary" style={{ pointerEvents: 'none' }}>
                        Closed
                    </button></td>
                    <td><button type="button" className="btn btn-outline-secondary" style={{ pointerEvents: 'none' }}>N/A</button></td>
                </>
            );
        }
    };

    return (
        <tr>
            <td>{application._id}</td>
            {renderButtons(application.status, application._id)}
        </tr>
    );
}