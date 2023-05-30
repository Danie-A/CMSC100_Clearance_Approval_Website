import React from 'react';
import Remark from './Remark.jsx';
import { AiFillCloseCircle } from 'react-icons/ai';

function ViewRemarks({ handleCloseModal }) {
    return (
        <div className='whole-container'>

            <button className="btn btn-danger btn-right" onClick={handleCloseModal}>
                <AiFillCloseCircle color="white" />
            </button>


            <h5>Returned Remarks</h5>
            <div className="remark-container">
                <Remark remark={'Wrong Link lakjflkadsjfaklsdfjalksdfjalksdfjalksdfjlkasfjdalkfjakl'} step={'2'} date={'05-29-2023'} commenter={'Loren Ipsum'} />
                <Remark remark={'Unpaid Tuition'} step={'3'} date={'05-30-2023'} commenter={'Ipsum Loren'} />
                <Remark remark={'Wrong Link lakjflkadsjfaklsdfjalksdfjalksdfjalksdfjlkasfjdalkfjakl'} step={'2'} date={'05-29-2023'} commenter={'Loren Ipsum'} />
            </div>

        </div>

    );
}

export default ViewRemarks;