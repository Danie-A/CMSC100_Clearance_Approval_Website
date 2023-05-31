import React from "react";
import { AiFillFolderOpen, AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../pdf/PDFDocument';

export default function SingleApp(props) {
    const { application } = props;
    if (!application) {
        return <tr><td><div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div></td></tr>;
    }

    const renderButtons = (status) => {
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
            return (
                <>
                    <td><button className="btn btn-success" style={{ pointerEvents: 'none' }}>
                        Cleared
                    </button></td>
                    <td>                    <div>
                        <PDFDownloadLink document={<PDFDocument applicationId={123456789} dateGenerated={date} studentName={"Danielle Araez"} studentNumber={"2021-12345"} adviser={"Ipsum Lorem"} clearanceOfficer={"Lorem Ipsum"} />} fileName="approved_clearance.pdf">
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
            {renderButtons(application.status)}
        </tr>
    );
}