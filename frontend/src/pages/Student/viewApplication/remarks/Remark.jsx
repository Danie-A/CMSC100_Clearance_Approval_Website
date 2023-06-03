import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

function Remark(props) {
    return (
        <div className="remark-item">
            <br />
            <AiOutlineComment size="40px" color={'#b3cde0'} style={{ marginRight: '8px' }} />
            <br />
            <table className="invisible-table">
                <tbody>
                    <tr>
                        <td><strong>Remark:</strong></td>
                        <td>{props.remark}</td>
                    </tr>
                    <tr>
                        <td><strong>Step:</strong></td>
                        <td>{props.step}</td>
                    </tr>
                    <tr>
                        <td><strong>Date:</strong></td>
                        <td>{props.date}</td>
                    </tr>
                    <tr>
                        <td><strong>Commenter:</strong></td>
                        <td>{props.commenter}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
}

export default Remark;