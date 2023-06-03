import React from 'react';

export default function SeeProfile({ handleCloseModal, student }) {

    // var latestIndex = (student.open_application.student_submissions.length - 1)
    // var latestSubmission = student.open_application.student_submissions[latestIndex]
    const applicationString = JSON.stringify(student.open_application, null, 2);

    return (<>

        <div>{student.first_name} {student.last_name}</div>
        <div>{student.student_number}</div>
        <div>{student.email}</div>

        <div>{applicationString}</div>

    </>);



}