import React from "react";
import { AiFillFolderOpen, AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SingleApp(props) {

    const renderButtons = (status) => {
        if (status === 'Pending') {
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
        } else if (status === 'Cleared') {
            return (
                <>
                    <td><button className="btn btn-success" style={{ pointerEvents: 'none' }}>
                        Cleared
                    </button></td>
                    <td><button className="btn btn-outline-danger">
                        <AiFillFilePdf className="mr-2" />
                        Print PDF
                    </button></td>
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
            <td>{props.id}</td>
            {renderButtons(props.status)}
        </tr>
    );
}