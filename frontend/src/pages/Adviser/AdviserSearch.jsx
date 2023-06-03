import { useState, useEffect } from "react";
import Popup from "./ViewApplication";
import ViewApplication from "./ViewApplication";

export default function AdviserSearch() {

    const [sortBy, setSortBy] = useState("none");
    const [nameFilter, setNameFilter] = useState("");
    const [studentsList, setStudentsList] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    // const [addStudentInfo, setAddStudentInfo] = useState(initialApproverState);
    // const [editStudentInfo, setEditStudentInfo] = useState(initialApproverState);
    // const handlePreEdit = (student) => {
    //     setEditStudentId(student._id);
    //     setEditStudentInfo({
    //       first_name: student.first_name,
    //       middle_name: student.middle_name,
    //       last_name: student.last_name,
    //       up_email: student.email,
    //       password: student.password,
    //       status: student.status,
    //       open_application: student.open,
    //       closed_applications: student.closed,
    //       adviser: student.adviser
    //     });
    // }

    useEffect(() => {
        const e = async () => {
            await fetch("http://localhost:3001/search-students", { method: "GET", credentials: "include" })
                .then((response) => response.json())
                .then((body) => {
                    console.log(body.result);
                    setStudentsList(body.result);
                });
        };
        e();
    }, []);

    return (
        <>
            {/* <input placeholder="SEARCH" />
        <button>SORT</button>
        <button>FILTER</button>
        <ul>
            
        </ul> */}

            {/* Displaying students */}
            <h3>Advisees</h3>
            <span>Name </span>
            <button onClick={() => setSortBy("name_asc")}>↑</button>
            <button onClick={() => setSortBy("name_desc")}>↓</button> <br />
            <input placeholder="Student Name" onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
            <button>Search</button>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                    </tr>
                    {studentsList
                        .filter((e) => (e.first_name + " " + e.middle_name + " " + e.last_name).toLowerCase().includes(nameFilter.toLowerCase()))
                        .map((student, index) => (
                            <tr key={index}>
                                <td>{student.first_name + " " + student.middle_name + " " + student.last_name}</td>
                                <button onClick={()=>setButtonPopup(true)}>View Application</button>
                                <ViewApplication trigger={buttonPopup}>
                                    <h3>POPUP!</h3>
                                </ViewApplication>
                                {/* <td>
                    <button onClick={() => handlePreEdit(approver)}>Edit</button>
                    </td>
                    <td>
                    <button onClick={() => handleDeleteApprover(approver._id)}>Delete</button>
                    </td> */}
                            </tr>
                        ))}
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}