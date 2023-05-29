import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';

function Remark(props) {
    return (
        <div className="remark-item">
            <AiOutlineComment className="mr-2" color={'green'} style={{ marginRight: '8px' }} />
            <p>Remark: {props.remark}</p>
            <p>Step: {props.step}</p>
            <p>Date: {props.date}</p>
            <p>  Commenter: {props.commenter}</p>
        </div>
    );
}

export default Remark;