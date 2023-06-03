import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

function Submission(props) {

    return (
        <div className="submission-item">
            <br />
            <AiOutlineComment size="40px" color={'#b3cde0'} style={{ marginRight: '8px' }} />
            <br />
            <table className="invisible-table">
                <tbody>
                    <tr>
                        <td><strong>GitHub Link:</strong></td>
                        <td>{props.github_link}</td>
                    </tr>
                    <tr>
                        <td><strong>Student Remark:</strong></td>
                        <td>{props.student_remark}</td>
                    </tr>
                    <tr>
                        <td><strong>Step:</strong></td>
                        <td>{props.step}</td>
                    </tr>
                    <tr>
                        <td><strong>Date:</strong></td>
                        <td>{props.date}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}

export default Submission;