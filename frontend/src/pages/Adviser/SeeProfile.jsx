// import React from 'react';

// export default function SeeProfile(props){
//     return (props.trigger)?(
//         <div>
//             <div>
//                 <button>CLOSE</button>
//                 {props.children}
//             </div>
//         </div>
//     ) : "";
// }
// import { useState } from "react";
// import ReactModal from "react-modal";
// import { BiCommentDetail } from "react-icons/bi";

// export default function SeeProfile(props){
//     const [showModal, setShowModal] = useState(false);

//     const handleOpenModal = () => {
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <>
//         <button className="btn btn-warning notifBtn" onClick={handleOpenModal}>
//             <BiCommentDetail className="mr-2" style={{ marginRight: '8px' }} />
//             View Remarks
//         </button>
//         <ReactModal
//             isOpen={showModal}
//             contentLabel="Remarks"
//             onRequestClose={handleCloseModal}
//         >
//             <div handleCloseModal={handleCloseModal} />
//         </ReactModal>
//         </>
//     )
// }