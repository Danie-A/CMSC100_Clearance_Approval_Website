import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

function Remark(props) {
    return (
        <div className="remark-item">
            <br />
            <AiOutlineComment color={'orange'} style={{ marginRight: '8px' }} />
            <br></br>
            <p>Remark: {props.remark}</p>
            <p>Step: {props.step}</p>
            <p>Date: {props.date}</p>
            <p>  Commenter: {props.commenter}</p>
        </div>
    );
}

export default Remark;