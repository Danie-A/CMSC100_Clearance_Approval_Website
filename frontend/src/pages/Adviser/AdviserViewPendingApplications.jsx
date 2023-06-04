import { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { AiFillFolderOpen } from "react-icons/ai";
import SeeProfile from "./SeeProfile.jsx";

function AdviserViewPendingApplications() {
  const handleOpenModal = (index) => {
    setShowModal(index);
  };
  const handleCloseModal = () => {
    setShowModal(-1);
    fetch("http://localhost:3001/get-students-with-pending-application", { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        setStudents(body.students);
      });
  };

  ReactModal.setAppElement("#root"); // Set the app element
  const [showModal, setShowModal] = useState(-1);
  const [students, setStudents] = useState([]);
  const [studentNumber, setStudentNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStep, setFilterStep] = useState("None");
  const [sortBy, setSortBy] = useState("None");

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:3001/get-students-with-pending-application", { method: "GET", credentials: "include" })
        .then((response) => response.json())
        .then((body) => {
          console.log(body);
          setStudents(body.students);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    switch (sortBy) {
      case "name_asc":
        setStudents((prevList) => [...prevList].sort((a, b) => a.first_name.localeCompare(b.first_name)));
        break;
      case "name_desc":
        setStudents((prevList) => [...prevList].sort((a, b) => b.first_name.localeCompare(a.first_name)));
        break;
      case "date_asc":
        setStudents((prevList) =>
          [...prevList].sort((a, b) =>
            a.open_application.student_submissions[a.open_application.student_submissions.length - 1].date.localeCompare(
              b.open_application.student_submissions[b.open_application.student_submissions.length - 1].date
            )
          )
        );
        break;
      case "date_desc":
        setStudents((prevList) =>
          [...prevList].sort((a, b) =>
            b.open_application.student_submissions[b.open_application.student_submissions.length - 1].date.localeCompare(
              a.open_application.student_submissions[a.open_application.student_submissions.length - 1].date
            )
          )
        );
        break;
      default:
        break;
    }
  }, [sortBy]);

  function showStudents() {
    if (students.length > 0) {
      return (
        <div className="container">
          <div className="d-flex flex-row align-items-center gap-2">
            <div>{"Search: "}</div>
            <input type="text" placeholder="Student Number" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
            <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
            <input type="date" placeholder="Date" className="glass-effect-5" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
            <label>{"Step: "}</label>
            <select className="glass-effect-3" value={filterStep} onChange={(e) => setFilterStep(e.target.value)}>
              <option value="None">{"None"}</option>
              <option value="1">{"1"}</option>
              <option value="2">{"2"}</option>
            </select>
          </div>
          <div className="d-flex flex-row align-items-center">
            <div>{"Sort by:"}</div>
            <span className="ms-4 me-1">{"Name"}</span>
            <button onClick={() => setSortBy("name_asc")}>↑</button>
            <button onClick={() => setSortBy("name_desc")}>↓</button>
            <span className="ms-4 me-1">{"Date"}</span>
            <button onClick={() => setSortBy("date_asc")}>↑</button>
            <button onClick={() => setSortBy("date_desc")}>↓</button>
          </div>
          <br />
          <div className="d-flex flex-row">
            <div className="flex-fill text-center">{"Name"}</div>
            <div className="flex-fill text-center">{"Student Number"}</div>
            <div className="flex-fill text-center">{"Adviser"}</div>
            <div className="flex-fill text-center">{"Step"}</div>
            <div className="flex-fill" />
            <div className="flex-fill" />
          </div>
          {students
            .filter((e) => e.student_number.includes(studentNumber))
            .filter((e) => (e.first_name + " " + e.middle_name + " " + e.last_name).toLocaleLowerCase().includes(studentName.toLocaleLowerCase()))
            .filter((e) => filterDate === "" || e.open_application.student_submissions[e.open_application.student_submissions.length - 1].date.slice(0, 10) === filterDate)
            .filter((e) => filterStep === "None" || e.open_application.student_submissions[e.open_application.student_submissions.length - 1].step.toString() === filterStep)
            .map((student, index) => (
              <div key={index} className="glass-effect-1 d-flex flex-row align-items-center px-5 py-3 my-2">
                {/* Student Name */}
                <div className="flex-fill">
                  {student.first_name} {student.last_name}
                </div>
                <div className="flex-fill">{student.student_number}</div>
                <div className="flex-fill">{localStorage.getItem("username")}</div>
                <div className="flex-fill">{student.open_application.student_submissions[student.open_application.student_submissions.length - 1].step}</div>

                {/* View Application Button */}
                <div>
                  <button className="glass-effect-3" onClick={() => handleOpenModal(index)}>
                    <AiFillFolderOpen className="mr-2" style={{ marginRight: "8px" }} />
                    View Application
                  </button>
                </div>

                {/* Will Pop Up If View Application is Clicked */}
                <ReactModal
                  isOpen={showModal === index}
                  contentLabel="Remarks"
                  onRequestClose={handleCloseModal}
                  shouldCloseOnOverlayClick={false}
                  appElement={document.getElementById("root")} // Set the app element
                >
                  <SeeProfile handleCloseModal={handleCloseModal} student={student} />
                </ReactModal>
              </div>
            ))}
        </div>
      );
    } else {
      return <div>You have no advisees with a pending application.</div>;
    }
  }

  return (
    <div className="whole-container">
      <h3>{"View Students with Pending Application"}</h3>
      {showStudents()}
    </div>
  );
}

export default AdviserViewPendingApplications;
