import { useState, useEffect } from "react";
import Popup from "./SeeProfile";
import SeeProfile from "./SeeProfile";

export default function AdviserSearch() {

    const [sortBy, setSortBy] = useState("none");
    const [nameFilter, setNameFilter] = useState("");
    const [studNoFilter, setStudNoFilter] = useState("");
    const [studentsList, setStudentsList] = useState([]);
    const [studNoclicked, setStudNoClicked] = useState(false);
    const [nameclicked, setNameClicked] = useState(false);


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = studentsList.filter((item) =>
    (item.first_name + " " + item.middle_name + " " + item.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student_number.toString().includes(searchTerm)
  );

  
    // const [buttonPopup, setButtonPopup] = useState(false);
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

    useEffect(() => {
        switch (sortBy) {
          case "name_asc":
            setStudentsList((prevList) => [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name)));
            break;
          case "name_desc":
            setStudentsList((prevList) => [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name)));
            break;
          default:
            break;
        }
      }, [sortBy]);

    return (
        <>
            <p>Delete Later {sortBy}</p>
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
            <div>
      <input
        type="text"
        placeholder="Search by name or number"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {filteredItems.map((student, index) => (
          <div key={index}>Student: {student.first_name + " " + student.middle_name + " " + student.last_name}
          <div>Student Number: {student.student_number}
          </div>
          <br/>
          </div>
        ))}
      </div>
    </div>
            {/* <SeeProfile trigger={buttonPopup}>
                    <h3>POPUP!</h3>
                </SeeProfile> */}
            <br />
            <br />
        </>
    )
}